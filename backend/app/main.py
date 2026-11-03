from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.auth import router as auth_router
from app.core.config import settings

app = FastAPI(title="PetHub API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.auth_app_origin],
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
