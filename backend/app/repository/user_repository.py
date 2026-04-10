from pydantic import EmailStr
from sqlmodel import Session, insert, select

from models.table_models import User


def get_user_by_email(session: Session, email: EmailStr) -> User:
    user = session.exec(select(User).filter(User.email == email)).first()
    return user


def create_user(session: Session, user: User) -> User:
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
