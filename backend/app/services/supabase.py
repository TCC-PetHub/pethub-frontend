from collections.abc import Mapping

import httpx

from app.core.config import settings


class SupabaseError(Exception):
    pass


def _headers(service_role: bool = False) -> Mapping[str, str]:
    key = settings.supabase_service_role_key if service_role else settings.supabase_anon_key
    return {"apikey": key, "Authorization": f"Bearer {key}", "Content-Type": "application/json"}


async def _request(method: str, path: str, *, service_role: bool = True, headers: Mapping[str, str] | None = None, **kwargs) -> httpx.Response:
    async with httpx.AsyncClient(timeout=15) as client:
        return await client.request(method, f"{settings.supabase_url}{path}", headers=headers or _headers(service_role), **kwargs)


async def sign_in(email: str, password: str) -> dict:
    response = await _request("POST", "/auth/v1/token?grant_type=password", service_role=False, json={"email": email, "password": password})
    if response.status_code >= 400:
        raise SupabaseError("invalid_credentials")
    return response.json()


async def profile_for_user(user_id: str) -> dict | None:
    response = await _request("GET", "/rest/v1/usuarios", headers={**_headers(True), "Accept": "application/vnd.pgrst.object+json"}, params={"select": "id,nome,perfil,status", "id": f"eq.{user_id}"})
    return response.json() if response.status_code == 200 else None


async def request_password_recovery(email: str) -> None:
    response = await _request("POST", "/auth/v1/recover", service_role=False, json={"email": email, "redirect_to": f"{settings.auth_app_origin}/reset-password"})
    if response.status_code >= 500:
        raise SupabaseError("unavailable")


async def verify_registration_configuration() -> None:
    config = await _request("POST", "/rest/v1/rpc/registration_configuration", json={})
    bucket = await _request("GET", "/storage/v1/bucket/documentos-cadastro")
    if config.status_code >= 400 or config.json() is not True or bucket.status_code >= 400 or bucket.json().get("public"):
        raise SupabaseError("registration_unavailable")


async def create_auth_user(user_id: str, email: str, password: str, name: str, perfil: str) -> str:
    response = await _request("POST", "/auth/v1/admin/users", json={"id": user_id, "email": email, "password": password, "email_confirm": False, "user_metadata": {"nome": name, "perfil": perfil}, "app_metadata": {"registration_flow": "pethub-v1"}})
    if response.status_code < 400:
        return "created"
    code = response.json().get("code", "") if response.headers.get("content-type", "").startswith("application/json") else ""
    if code in {"email_exists", "user_already_exists"}:
        return "duplicate"
    raise SupabaseError("create_user_failed")


async def upload_document(path: str, content: bytes, content_type: str) -> None:
    response = await _request("POST", f"/storage/v1/object/documentos-cadastro/{path}", content=content, headers={**_headers(True), "Content-Type": content_type, "x-upsert": "false"})
    if response.status_code >= 400:
        raise SupabaseError("storage_failed")


async def register_account(payload: dict[str, object]) -> None:
    response = await _request("POST", "/rest/v1/rpc/register_account", json={"payload": payload})
    if response.status_code >= 400:
        raise SupabaseError("register_account_failed")


async def registration_outcome(user_id: str) -> bool:
    response = await _request("POST", "/rest/v1/rpc/registration_outcome", json={"account_id": user_id})
    return response.status_code < 400 and response.json() is True


async def rollback_registration(user_id: str) -> bool:
    response = await _request("POST", "/rest/v1/rpc/rollback_registration", json={"account_id": user_id})
    return response.status_code < 400 and response.json() is True


async def remove_documents(paths: list[str]) -> None:
    if paths:
        await _request("DELETE", "/storage/v1/object/documentos-cadastro", json={"prefixes": paths})


async def delete_auth_user(user_id: str) -> None:
    await _request("DELETE", f"/auth/v1/admin/users/{user_id}")


async def resend_confirmation(email: str) -> bool:
    try:
        response = await _request("POST", "/auth/v1/resend", service_role=False, json={"type": "signup", "email": email})
        return response.status_code < 400
    except httpx.HTTPError:
        return False
