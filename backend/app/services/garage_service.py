from typing import List

from sqlmodel import Session

from messages import succes_messages
from models.models import ModelResp, UserVersionGarageRead
from repository.garage_repository import (
    add_garage,
    delete_garage_item,
    get_all_garage_items,
    get_garage_item,
    set_favourite,
    unset_favourite,
)
from models.table_models import UserVersionGarage
from repository.cascade_repository import get_version_by_id
from exceptions import (
    VersionOnUserGarageAlreadyExistsException,
    VersionOnUserGarageDoesNotExistsException,
    VersionsNotFoundException,
    WrongUserException,
)
from repository.user_repository import get_user_by_id


def save_garage_item(
    session: Session, user_id: int, version_id: int
) -> List[UserVersionGarage]:
    check_version_and_user_exists(
        session=session, version_id=version_id, user_id=user_id
    )
    check_garage_item = get_garage_item(
        session=session, user_id=user_id, version_id=version_id
    )
    if check_garage_item:
        raise VersionOnUserGarageAlreadyExistsException()
    garage_item = UserVersionGarage(
        user_id=user_id, version_id=version_id, is_favourite=False
    )
    new_garage_item = add_garage(session=session, garage=garage_item)
    garage = get_all_garage_items(session=session, user_id=user_id)
    return garage


def set_favourite_item(
    session: Session, user_id: int, version_id: int
) -> List[UserVersionGarage]:
    check_version_and_user_exists(
        session=session, version_id=version_id, user_id=user_id
    )
    check_garage_item = get_garage_item(
        session=session, user_id=user_id, version_id=version_id
    )

    if not check_garage_item:
        raise VersionOnUserGarageDoesNotExistsException()

    garage_item = set_favourite(session=session, user_id=user_id, version_id=version_id)
    garage = get_all_garage_items(session=session, user_id=user_id)

    return garage


def delete_favourite(session: Session, user_id: int) -> str:
    user = get_user_by_id(session=session, user_id=user_id)
    if not user:
        raise WrongUserException()
    unset_favourite(session=session, user_id=user_id)
    return succes_messages["SUCCESS_REMOVE_FAV"]


def delete_item_from_garage(session: Session, user_id: int, version_id: int) -> str:
    check_version_and_user_exists(
        session=session, version_id=version_id, user_id=user_id
    )
    garage_item = get_garage_item(
        session=session, user_id=user_id, version_id=version_id
    )
    if not garage_item:
        raise VersionOnUserGarageDoesNotExistsException()
    delete_garage_item(session, garage_item=garage_item)
    return succes_messages["SUCCESS_REMOVE_ITEM"]


def get_garage_by_user(session: Session, user_id: int) -> List[UserVersionGarage]:
    user = get_user_by_id(session=session, user_id=user_id)
    if not user:
        raise WrongUserException()
    garage = get_all_garage_items(session=session, user_id=user_id)
    return garage


def check_version_and_user_exists(session: Session, version_id: int, user_id: int):
    user = get_user_by_id(session=session, user_id=user_id)
    if not user:
        raise WrongUserException()
    version = get_version_by_id(session=session, version_id=version_id)
    if not version:
        raise VersionsNotFoundException()
