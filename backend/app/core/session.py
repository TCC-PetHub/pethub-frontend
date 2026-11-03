from datetime import UTC, datetime, timedelta
from uuid import uuid4

import jwt

from app.core.config import settings

SESSION_DURATION_SECONDS = 15 * 60
SESSION_COOKIE = "pethub-session"


def issue_session(user_id: str, name: str, role: str) -> str:
    now = datetime.now(UTC)
    payload = {
        "sub": user_id, "name": name, "role": role,
        "iss": "urn:pethub:auth:development", "aud": "urn:pethub:web",
        "iat": now, "exp": now + timedelta(seconds=SESSION_DURATION_SECONDS),
        "jti": str(uuid4()),
    }
    return jwt.encode(payload, settings.auth_jws_secret, algorithm="HS256", headers={"typ": "pethub-session+jwt"})
