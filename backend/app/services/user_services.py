from sqlmodel import Session

from services.mappers.mapper_User_to_UserData import mapper_user_without_password
from exceptions import (
    InvalidPasswordException,
    UserAlreadyExistsException,
    WrongPasswordException,
    WrongUserException,
)
from models.table_models import User
from repository.user_repository import create_user, get_user_by_email
from models.models import LoginData, UserSecure


def singin_user(session: Session, login_data: LoginData) -> UserSecure:
    user = get_user_by_email(session=session, email=login_data.email)
    if not user:
        raise WrongUserException()
    if not user.checkPassword(login_data.password):
        raise WrongPasswordException(user.email)

    return mapper_user_without_password(user)


def save_user(session: Session, login_data: LoginData) -> UserSecure:
    if not checkIfValidPassword(login_data.password):
        raise InvalidPasswordException()
    user = get_user_by_email(session=session, email=login_data.email)
    if user:
        raise UserAlreadyExistsException(user.email)
    hashedPassword = User.hashPassword(login_data.password)
    user = User(email=login_data.email, hashed_password=hashedPassword)
    new_user = create_user(session=session, user=user)
    return mapper_user_without_password(new_user)


def checkIfValidPassword(password: str) -> bool:
    if len(password) >= 8:
        return True
    return False
