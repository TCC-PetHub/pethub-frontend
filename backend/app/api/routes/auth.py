from fastapi import APIRouter, File, Form, HTTPException, Response, UploadFile

from app.core.session import SESSION_COOKIE, SESSION_DURATION_SECONDS, issue_session
from app.schemas.auth import LoginRequest, PasswordRecoveryRequest
from app.services.supabase import SupabaseError, profile_for_user, request_password_recovery, sign_in
from app.services.registration import RegistrationError, create_registration

router = APIRouter()
ROLE_FROM_PROFILE = {"adotante": "adopter", "ong": "organization"}


@router.post("/login")
async def login(payload: LoginRequest, response: Response) -> dict:
    try:
        auth = await sign_in(str(payload.email), payload.password)
        profile = await profile_for_user(auth["user"]["id"])
    except SupabaseError:
        raise HTTPException(status_code=401, detail="E-mail ou senha inválidos para este perfil.")
    if not profile or profile["status"] != "ativo" or ROLE_FROM_PROFILE.get(profile["perfil"]) != payload.profile:
        raise HTTPException(status_code=401, detail="E-mail ou senha inválidos para este perfil.")
    user = {"id": profile["id"], "name": profile["nome"], "role": payload.profile}
    response.set_cookie(
        SESSION_COOKIE, issue_session(**user), httponly=True, secure=False,
        samesite="lax", path="/", max_age=SESSION_DURATION_SECONDS if payload.remember else None,
    )
    return {"user": user}


@router.post("/logout", status_code=204)
async def logout(response: Response) -> None:
    response.delete_cookie(SESSION_COOKIE, path="/")


@router.post("/forgot-password")
async def forgot_password(payload: PasswordRecoveryRequest) -> dict:
    try:
        await request_password_recovery(str(payload.email))
    except SupabaseError:
        raise HTTPException(status_code=503, detail="Não foi possível enviar o link agora.")
    return {"message": "Se houver uma conta com esse e-mail, você receberá um link para redefinir a senha."}


@router.post("/register", status_code=202)
async def register(
    profile: str = Form(), acceptedTerms: str = Form(), password: str = Form(), phone: str = Form(), city: str = Form(), state: str = Form(),
    name: str | None = Form(None), email: str | None = Form(None), cpf: str | None = Form(None),
    organizationName: str | None = Form(None), cnpj: str | None = Form(None), institutionalEmail: str | None = Form(None), responsibleName: str | None = Form(None), responsibleCpf: str | None = Form(None), responsibleEmail: str | None = Form(None), accessEmail: str | None = Form(None),
    identityDocuments: list[UploadFile] = File(default=[]), cnpjDocument: list[UploadFile] = File(default=[]), statuteDocument: list[UploadFile] = File(default=[]), shelterDocument: list[UploadFile] = File(default=[]),
) -> dict:
    data = {key: value for key, value in locals().items() if isinstance(value, str) or value is None}
    uploads = {"identityDocuments": identityDocuments, "cnpjDocument": cnpjDocument, "statuteDocument": statuteDocument, "shelterDocument": shelterDocument}
    try:
        return await create_registration(data, uploads)
    except RegistrationError as error:
        raise HTTPException(status_code=error.status, detail={"error": error.message, "fields": error.fields})
    except SupabaseError:
        raise HTTPException(status_code=503, detail={"error": "Cadastro aguardando configuração do banco de dados.", "fields": {}})
