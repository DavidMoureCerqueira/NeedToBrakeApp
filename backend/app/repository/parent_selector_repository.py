from typing import List, Tuple

from sqlmodel import Session, select

from models.table_models import Brand, Disc, Model, Version


def get_all_disc_by_model_id(
    session: Session, model_id: int
) -> List[Tuple[Disc, Version, Model, Brand]]:
    all_data_disc = session.exec(
        select(Disc, Version, Model, Brand)
        .join(Version, Disc.version_id == Version.id)
        .join(Model, Version.model_id == Model.id)
        .join(Brand, Model.brand_id == Brand.id)
        .filter(Model.id == model_id)
    ).all()
    return all_data_disc


def get_all_disc_by_version_id(session: Session, version_id: int):
    all_data_disc = session.exec(
        select(Disc, Version, Model, Brand)
        .join(Version, Disc.version_id == Version.id)
        .join(Model, Version.model_id == Model.id)
        .join(Brand, Model.brand_id == Brand.id)
        .filter(Version.id == version_id)
    ).all()
    return all_data_disc
