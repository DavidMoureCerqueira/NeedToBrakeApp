from typing import List

from fastapi import APIRouter, HTTPException, Request, status


from models.models import ModelResp, RegisterData, SignInData
from services.auth_service import get_authorization

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
def login(session: SessionDep, loginData: RegisterData):
    try:
        data = save_user(session=session, login_data=loginData)
        return ModelResp(success=True, data=data)
    except (InvalidPasswordException, UserAlreadyExistsException) as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=e.message)


@router.post("/sign-in", response_model=ModelResp, tags=["Sign in user"])
def sign_in(session: SessionDep, login_data: SignInData):
    try:
        data = singin_user(session=session, login_data=login_data)
        return ModelResp(success=True, data=data)
    except (WrongUserException, WrongPasswordException) as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=e.message)


@router.get("/profile", response_model=ModelResp, tags=["Get user profile"])
def get_my_profile(request: Request, session: SessionDep):
    try:
        user_id = get_authorization(request=request)
        user = get_user_by_id_from_db(user_id=user_id, session=session)
        return ModelResp(success=True, data=user)
    except WrongUserException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=e.message)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred",
        )
