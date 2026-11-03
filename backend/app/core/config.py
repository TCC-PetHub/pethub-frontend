from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    supabase_url: str
    supabase_anon_key: str
    supabase_service_role_key: str
    auth_jws_secret: str
    auth_app_origin: str = "http://localhost:3000"
    privacy_policy_version: str
    registration_encryption_key: str
    registration_hash_key: str


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
