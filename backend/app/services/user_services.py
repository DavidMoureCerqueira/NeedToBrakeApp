from sqlmodel import Session

from exceptions import InvalidPasswordException, UserAlreadyExistsException
from models.table_models import User
from repository.user_repository import create_user, get_user_by_email
from models.models import LoginUser


def save_user(session: Session, login_data: LoginUser) -> User:
    if not checkIfValidPassword(login_data.password):
        raise InvalidPasswordException()
    user = get_user_by_email(session=session, email=login_data.email)
    if user:
        raise UserAlreadyExistsException(user.email)
    hashedPassword = User.hashPassword(login_data.password)
    user = User(email=login_data.email, hashed_password=hashedPassword)
    new_user = create_user(session=session, user=user)
    return new_user


def checkIfValidPassword(password: str) -> bool:
    if len(password) >= 8:
        return True
    return False
