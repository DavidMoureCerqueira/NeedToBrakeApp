from typing import List

from fastapi import APIRouter, HTTPException

from models.models import ModelResp, UserData
from exceptions import (
    InvalidPasswordException,
    UserAlreadyExistsException,
    WrongPasswordException,
    WrongUserException,
)

from services.user_services import save_user, singin_user
from database import SessionDep


router = APIRouter()


@router.post("/register", response_model=ModelResp, tags=["Login user"])
def login(session: SessionDep, email_and_password: UserData):
    try:
        user = save_user(session=session, login_data=email_and_password)
        return ModelResp(succes=True, data=user)
    except (InvalidPasswordException, UserAlreadyExistsException) as e:
        return ModelResp(success=False, error=e.message)


@router.post("/sign-in", response_model=ModelResp, tags=["Sign in user"])
def sign_in(session: SessionDep, login_data: UserData):
    try:
        user = singin_user(session=session, login_data=login_data)
        return ModelResp(succes=True, data=user)
    except (WrongUserException, WrongPasswordException) as e:
        return ModelResp(sucess=False, error=e.message)
