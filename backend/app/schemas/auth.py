from typing import Literal

from pydantic import BaseModel, EmailStr, Field, field_validator


def validate_password(value: str) -> str:
    if not 8 <= len(value) <= 128:
        raise ValueError("A senha deve ter entre 8 e 128 caracteres.")
    if not all((any(c.islower() for c in value), any(c.isupper() for c in value), any(c.isdigit() for c in value), any(not c.isalnum() for c in value))):
        raise ValueError("A senha deve conter maiúscula, minúscula, número e símbolo.")
    return value


class LoginRequest(BaseModel):
    profile: Literal["adopter", "organization"]
    email: EmailStr
    password: str = Field(max_length=128)
    remember: bool = False

    _password = field_validator("password")(validate_password)


class PasswordRecoveryRequest(BaseModel):
    email: EmailStr
