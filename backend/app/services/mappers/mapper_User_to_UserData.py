from models.models import UserSecure
from models.table_models import User


def mapper_user_without_password(user: User) -> UserSecure:

    return UserSecure(id=user.id, email=user.email)
