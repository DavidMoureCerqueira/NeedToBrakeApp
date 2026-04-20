from typing import List

from sqlmodel import Session, select, update

from sqlalchemy.orm import joinedload
from models.table_models import Model, UserVersionGarage, Version


def add_garage(session: Session, garage: UserVersionGarage) -> UserVersionGarage:
    session.add(garage)
    session.commit()
    session.refresh(garage)
    return garage


def set_favourite(session: Session, user_id: int, version_id: int) -> UserVersionGarage:
    session.exec(
        update(UserVersionGarage)
        .where(UserVersionGarage.user_id == user_id)
        .where(UserVersionGarage.is_favourite == True)
        .values(is_favourite=False)
    )

    garage_item = session.exec(
        select(UserVersionGarage).where(
            UserVersionGarage.user_id == user_id,
            UserVersionGarage.version_id == version_id,
        )
    ).one()

    garage_item.is_favourite = True
    session.add(garage_item)
    session.commit()
    session.refresh(garage_item)
    return garage_item


def get_all_garage_items(session: Session, user_id: int) -> List[UserVersionGarage]:
    garage = session.exec(
        select(UserVersionGarage)
        .where(UserVersionGarage.user_id == user_id)
        .options(
            joinedload(UserVersionGarage.version)
            .joinedload(Version.model)
            .joinedload(Model.brand)
        )
    ).all()

    return garage


def get_garage_item(
    session: Session, user_id: int, version_id: int
) -> UserVersionGarage:
    garage_item = session.exec(
        select(UserVersionGarage)
        .where(UserVersionGarage.user_id == user_id)
        .where(UserVersionGarage.version_id == version_id)
    ).first()
    return garage_item


def delete_garage_item(session: Session, garage_item: UserVersionGarage):
    session.delete(garage_item)
    session.commit()


def unset_favourite(session: Session, user_id: int):
    session.exec(
        update(UserVersionGarage)
        .where(UserVersionGarage.user_id == user_id)
        .where(UserVersionGarage.is_favourite == True)
        .values(is_favourite=False)
    )
    session.commit()
