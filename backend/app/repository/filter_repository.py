from typing import Any

from sqlmodel import Session, select

from models.table_models import Brand, Disc, Model, Version


def get_car_and_disc_by_filter(session: Session, filters: dict[str, Any]):
    statement = (
        select(Disc, Version, Model, Brand)
        .join(Version, Disc.version_id == Version.id)
        .join(Model, Version.model_id == Model.id)
        .join(Brand, Model.brand_id == Brand.id)
    )
    for key, value in filters.items():
        column = getattr(Disc, key)
        statement = statement.where(column == value)

    car_and_disc = session.exec(statement).all()

    return car_and_disc
