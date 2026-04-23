from sqlmodel import Session

from services.auth_service import create_JWT_token
from services.mappers.mapper_User_to_UserData import mapper_user_without_password
from exceptions import (
    InvalidPasswordException,
    UserAlreadyExistsException,
    UserNameAlreadyInUseException,
    WrongPasswordException,
    WrongUserException,
)
from models.table_models import User
from repository.user_repository import (
    create_user,
    get_user_by_email,
    get_user_by_id,
    get_user_by_username,
)
from models.models import (
    RegisterData,
    SignInData,
    UserProfile,
    UserSecure,
    ValidationModelResponse,
)


def singin_user(session: Session, login_data: SignInData) -> ValidationModelResponse:
    user = get_user_by_email(session=session, email=login_data.email)
    if not user:
        raise WrongUserException()
    if not user.checkPassword(login_data.password):
        raise WrongPasswordException(user.email)
    token = create_JWT_token(user.id)

    return ValidationModelResponse(user=user, token=token)


def save_user(session: Session, login_data: RegisterData) -> ValidationModelResponse:
    if not checkIfValidPassword(login_data.password):
        raise InvalidPasswordException()
    user = get_user_by_email(session=session, email=login_data.email)
    if user:
        raise UserAlreadyExistsException(user.email)
    user = get_user_by_username(session=session, username=login_data.username)
    if user:
        raise UserNameAlreadyInUseException(login_data.username)
    hashedPassword = User.hashPassword(login_data.password)
    user = User(
        email=login_data.email,
        hashed_password=hashedPassword,
        username=login_data.username,
    )
    new_user = create_user(session=session, user=user)
    token = create_JWT_token(new_user.id)

    return ValidationModelResponse(
        user=mapper_user_without_password(new_user), token=token
    )


def get_user_by_id_from_db(
    session: Session, user_id: int, user_auth: int
) -> UserProfile:
    # TODO corregir cuando esta validado el isOwner

    user = get_user_by_id(user_id=user_id, session=session)
    if not user:
        raise WrongUserException()
    is_owner = user_auth == user.id
    cars_count = len(user.garage_cars)
    posts_count = len(user.posts)
    comments_count = len(user.comments)
    return UserProfile(
        **user.model_dump(),
        is_owner=is_owner,
        cars=cars_count,
        posts=posts_count,
        comments=comments_count
    )


def checkIfValidPassword(password: str) -> bool:
    if len(password) >= 8:
        return True
    return False
