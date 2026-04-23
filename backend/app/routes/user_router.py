from fastapi import APIRouter, Depends, Request

from models.models import (
    ModelResp,
    RegisterData,
    SignInData,
    UserProfile,
    UserSecure,
    ValidationModelResponse,
)
from services.auth_service import get_authorization


from services.user_service import (
    get_user_by_id_from_db,
    save_user,
    singin_user,
)
from database import SessionDep


router = APIRouter()


@router.post(
    "/register", response_model=ModelResp[ValidationModelResponse], tags=["Login user"]
)
def login(session: SessionDep, loginData: RegisterData):
    data = save_user(session=session, login_data=loginData)
    return ModelResp(success=True, data=data)


@router.post(
    "/sign-in", response_model=ModelResp[ValidationModelResponse], tags=["Sign in user"]
)
def sign_in(session: SessionDep, login_data: SignInData):
    data = singin_user(session=session, login_data=login_data)
    return ModelResp(success=True, data=data)


@router.get(
    "/profile/{user_id}",
    response_model=ModelResp[UserProfile],
    tags=["Get user profile"],
)
def get_my_profile(
    request: Request,
    session: SessionDep,
    user_id: int,
    user_auth: int = Depends(get_authorization),
):

    user = get_user_by_id_from_db(session=session, user_id=user_id, user_auth=user_auth)
    return ModelResp(success=True, data=user)
