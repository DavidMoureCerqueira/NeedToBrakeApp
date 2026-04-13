from typing import List

from fastapi import APIRouter, HTTPException, Request
import jwt

from services.auth_service import get_authorization
from models.models import ModelResp, LoginData
from exceptions import (
    InvalidPasswordException,
    UserAlreadyExistsException,
    WrongPasswordException,
    WrongUserException,
)

from services.user_services import get_user_by_id_from_db, save_user, singin_user
from database import SessionDep


router = APIRouter()


@router.post("/register", response_model=ModelResp, tags=["Login user"])
def login(session: SessionDep, email_and_password: LoginData):
    try:
        data = save_user(session=session, login_data=email_and_password)
        return ModelResp(succes=True, data=data)
    except (InvalidPasswordException, UserAlreadyExistsException) as e:
        return ModelResp(success=False, error=e.message)


@router.post("/sign-in", response_model=ModelResp, tags=["Sign in user"])
def sign_in(session: SessionDep, login_data: LoginData):
    try:
        data = singin_user(session=session, login_data=login_data)
        return ModelResp(succes=True, data=data)
    except (WrongUserException, WrongPasswordException) as e:
        return ModelResp(sucess=False, error=e.message)


@router.get("/profile", response_model=ModelResp, tags=["Get user profile"])
def get_my_profile(request: Request, session: SessionDep):
    try:
        user_id = get_authorization(request=request)
        user = get_user_by_id_from_db(user_id=user_id, session=session)
        return ModelResp(success=True, data=user)
    except WrongPasswordException as e:
        return ModelResp(success=False, error=e.message)
    except HTTPException as e:
        return ModelResp(success=False, error=e.detail)
