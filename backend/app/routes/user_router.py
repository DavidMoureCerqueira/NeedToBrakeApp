from typing import List

from fastapi import APIRouter, HTTPException

from exceptions import InvalidPasswordException, UserAlreadyExistsException
from models.models import LoginUser, ModelResp
from services.user_services import save_user
from database import SessionDep


router = APIRouter()


@router.post("/register", response_model=ModelResp, tags=["Login user"])
def login(session: SessionDep, email_and_password: LoginUser):
    try:
        user = save_user(session=session, login_data=email_and_password)
        return ModelResp(succes=True, data=user)
    except (InvalidPasswordException, UserAlreadyExistsException) as e:
        return ModelResp(success=False, error=e.message)


# @router.post(
#     "/sign-in", response_model=str, tags=["Sign in user"]
# )
# def sign_in(session: SessionDep):
#     cars_and_discs = get_car_and_disc_by_filter_from_db(
#         session=session,
#     )
#     if not cars_and_discs:
#         return HTTPException(status_code=404, detail="No disc for that filters")
#     return cars_and_discs
