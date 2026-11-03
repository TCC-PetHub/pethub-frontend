"""Cadastro multipart e documentos privados do PetHub."""

import base64
import hashlib
import hmac
import os
import re
from dataclasses import dataclass
from uuid import uuid4

from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from fastapi import UploadFile

from app.core.config import settings
from app.services import supabase

ALLOWED_DOCUMENT_TYPES = {"application/pdf", "image/jpeg", "image/png"}
MAX_DOCUMENT_SIZE = 10 * 1024 * 1024
MAX_TOTAL_SIZE = 32 * 1024 * 1024
DOCUMENT_FIELDS = {
    "adopter": (("identityDocuments", "identity", 1, 2),),
    "organization": (("cnpjDocument", "cnpj", 1, 1), ("statuteDocument", "statute", 1, 1), ("shelterDocument", "shelter", 0, 1)),
}


class RegistrationError(Exception):
    def __init__(self, message: str, status: int = 400, fields: dict[str, str] | None = None):
        self.message, self.status, self.fields = message, status, fields or {}
        super().__init__(message)


@dataclass
class Document:
    kind: str
    file: UploadFile
    content: bytes


def _key(name: str) -> bytes:
    value = getattr(settings, name)
    try:
        decoded = base64.urlsafe_b64decode(value + "=" * (-len(value) % 4))
    except Exception as exc:
        raise RegistrationError("Cadastro ainda não configurado no servidor.", 503) from exc
    if len(decoded) != 32:
        raise RegistrationError("Cadastro ainda não configurado no servidor.", 503)
    return decoded


def _digits(value: str) -> str:
    return re.sub(r"\D", "", value)


def _valid_cpf(value: str) -> bool:
    cpf = _digits(value)
    if len(cpf) != 11 or len(set(cpf)) == 1:
        return False
    for position in (9, 10):
        total = sum(int(cpf[index]) * (position + 1 - index) for index in range(position))
        if (total * 10) % 11 % 10 != int(cpf[position]):
            return False
    return True


def _protect_cpf(value: str) -> tuple[str, str]:
    cpf = _digits(value)
    nonce = os.urandom(12)
    encrypted = AESGCM(_key("registration_encryption_key")).encrypt(nonce, cpf.encode(), None)
    envelope = bytes([1]) + nonce + encrypted[-16:] + encrypted[:-16]
    digest = hmac.new(_key("registration_hash_key"), cpf.encode(), hashlib.sha256).hexdigest()
    return "\\x" + envelope.hex(), digest


def _required(data: dict[str, str | None], name: str, maximum: int = 255) -> str:
    value = (data.get(name) or "").strip()
    if not value or len(value) > maximum:
        raise RegistrationError("Confira os dados informados.", 400, {name: "Informe um valor válido."})
    return value


def _email(data: dict[str, str | None], name: str) -> str:
    value = _required(data, name, 254).lower()
    if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", value):
        raise RegistrationError("Confira os dados informados.", 400, {name: "Informe um e-mail válido."})
    return value


def _password(value: str) -> str:
    valid = 8 <= len(value) <= 128 and all((any(c.islower() for c in value), any(c.isupper() for c in value), any(c.isdigit() for c in value), any(not c.isalnum() for c in value)))
    if not valid:
        raise RegistrationError("Confira os dados informados.", 400, {"password": "Use de 8 a 128 caracteres, com maiúscula, minúscula, número e símbolo."})
    return value


async def _validate_document(document: UploadFile, field: str) -> bytes:
    if document.content_type not in ALLOWED_DOCUMENT_TYPES:
        raise RegistrationError("Documento inválido. Use PDF, JPG ou PNG.", 400, {field: "Selecione um arquivo válido."})
    content = await document.read(MAX_DOCUMENT_SIZE + 1)
    filename = document.filename or ""
    valid = (document.content_type == "application/pdf" and content.startswith(b"%PDF-") and filename.lower().endswith(".pdf")) or (document.content_type == "image/jpeg" and content.startswith(b"\xff\xd8\xff") and filename.lower().endswith((".jpg", ".jpeg"))) or (document.content_type == "image/png" and content.startswith(b"\x89PNG\r\n\x1a\n") and filename.lower().endswith(".png"))
    if not content or len(content) > MAX_DOCUMENT_SIZE or not valid:
        raise RegistrationError("Documento inválido. Use PDF, JPG ou PNG.", 400, {field: "Selecione um arquivo válido de até 10 MB."})
    return content


async def _documents(profile: str, uploads: dict[str, list[UploadFile]]) -> list[Document]:
    documents: list[Document] = []
    total = 0
    for field, kind, minimum, maximum in DOCUMENT_FIELDS[profile]:
        files = uploads.get(field, [])
        if not minimum <= len(files) <= maximum:
            raise RegistrationError("Confira os anexos enviados.", 400, {field: f"Envie de {minimum} a {maximum} arquivo(s)."})
        for index, file in enumerate(files):
            content = await _validate_document(file, field)
            total += len(content)
            if total > MAX_TOTAL_SIZE:
                raise RegistrationError("O envio completo deve ter no máximo 32 MB.", 413)
            final_kind = ("identity_front" if index == 0 else "identity_back") if kind == "identity" and len(files) == 2 else kind
            documents.append(Document(final_kind, file, content))
    return documents


async def create_registration(data: dict[str, str | None], uploads: dict[str, list[UploadFile]]) -> dict[str, object]:
    profile = data.get("profile")
    if profile not in DOCUMENT_FIELDS:
        raise RegistrationError("Selecione um perfil válido.")
    if (data.get("acceptedTerms") or "").lower() != "true":
        raise RegistrationError("Confira os dados informados.", 400, {"acceptedTerms": "É necessário aceitar a política de privacidade."})
    documents = await _documents(profile, uploads)
    if profile == "adopter":
        person, email, cpf = _required(data, "name", 150), _email(data, "email"), _required(data, "cpf", 20)
    else:
        person, email, cpf = _required(data, "responsibleName", 150), _email(data, "accessEmail"), _required(data, "responsibleCpf", 20)
        _required(data, "organizationName", 200); _required(data, "cnpj", 18); _email(data, "institutionalEmail"); _email(data, "responsibleEmail")
    cpf_field = "cpf" if profile == "adopter" else "responsibleCpf"
    if not _valid_cpf(cpf):
        raise RegistrationError("Confira os dados informados.", 400, {cpf_field: "CPF inválido."})
    password, phone, city, state = _password(data.get("password") or ""), _digits(_required(data, "phone", 30)), _required(data, "city", 120), _required(data, "state", 2).upper()
    if not re.fullmatch(r"[A-Z]{2}", state):
        raise RegistrationError("Confira os dados informados.", 400, {"state": "Informe uma UF válida."})
    cpf_encrypted, cpf_hash = _protect_cpf(cpf)
    await supabase.verify_registration_configuration()
    user_id = str(uuid4())
    if await supabase.create_auth_user(user_id, email, password, person, "adotante" if profile == "adopter" else "ong") == "duplicate":
        return {"title": "Confira as orientações de cadastro", "message": "Este envio não criou uma nova solicitação de análise. Se você já cadastrou esse e-mail, use Entrar ou recuperar senha.", "emailSent": False}
    uploaded: list[str] = []
    operation_stage = "upload"
    try:
        records: list[dict[str, object]] = []
        for document in documents:
            ext = "pdf" if document.file.content_type == "application/pdf" else "png" if document.file.content_type == "image/png" else "jpg"
            path = f"{user_id}/{uuid4()}.{ext}"
            uploaded.append(path)
            await supabase.upload_document(path, document.content, document.file.content_type or "application/octet-stream")
            filename = re.sub(r"[\x00-\x1f\\]", "_", document.file.filename or "documento")[:255]
            records.append({"kind": document.kind, "arquivo_chave": path, "nome_original": filename, "mime_type": document.file.content_type, "tamanho_bytes": len(document.content)})
        payload: dict[str, object] = {"usuario_id": user_id, "profile": profile, "nome": person, "email": email, "telefone": phone, "cidade": city, "uf": state, "cpf_cifrado": cpf_encrypted, "cpf_hash": cpf_hash, "versao_politica": settings.privacy_policy_version, "documentos": records}
        if profile == "organization":
            payload.update({"organizacao_nome": (data["organizationName"] or "").strip(), "cnpj": re.sub(r"[^A-Za-z0-9]", "", data["cnpj"] or "").upper(), "organizacao_email": (data["institutionalEmail"] or "").strip().lower(), "responsavel_email": (data["responsibleEmail"] or "").strip().lower()})
        operation_stage = "database"
        await supabase.register_account(payload)
    except Exception as error:
        if not await supabase.registration_outcome(user_id):
            await supabase.remove_documents(uploaded)
            if await supabase.rollback_registration(user_id):
                await supabase.delete_auth_user(user_id)
            error_code = "CAD-UPLOAD" if operation_stage == "upload" else "CAD-BANCO"
            text = "Não foi possível enviar o documento de identificação." if error_code == "CAD-UPLOAD" else "Não foi possível salvar os dados do cadastro no banco."
            raise RegistrationError(f"{text} Tente novamente. ({error_code})", 502) from error
    email_sent = await supabase.resend_confirmation(email)
    message = "Cadastro enviado para análise. Confira seu e-mail para confirmar o endereço. O acesso será liberado após aprovação." if email_sent else "Cadastro enviado para análise. O envio do e-mail de confirmação está indisponível; entre em contato com o suporte para solicitar o reenvio."
    return {"title": "Cadastro enviado para análise", "message": message, "emailSent": email_sent}
