from datetime import datetime, timezone, timedelta
import os
from dotenv import load_dotenv
from fastapi import HTTPException, Request
import jwt


load_dotenv()


def create_JWT_token(user_id: int):
    payload = {
        "sub": str(user_id),
        "iat": datetime.now(timezone.utc),
        "exp": datetime.now(timezone.utc)
        + timedelta(minutes=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))),
    }

    token = jwt.encode(
        payload=payload, key=os.getenv("SECRET_KEY"), algorithm=os.getenv("ALGORITHM")
    )
    return token


def decode_JWT_Token(token):
    payload = jwt.decode(
        jwt=token, key=os.getenv("SECRET_KEY"), algorithms=[os.getenv("ALGORITHM")]
    )
    return int(payload.get("sub"))


def get_authorization(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized: Missing token")
    token = auth_header.split(" ")[1]
    user_id = decode_JWT_Token(token)
    return user_id
