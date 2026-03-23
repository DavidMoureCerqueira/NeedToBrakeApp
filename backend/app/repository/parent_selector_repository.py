from typing import List, Tuple

from sqlmodel import Session, select

from models.models import Brand, Disc, DiscoReadFull, Model, Version


def get_all_disc_by_model_id(
    session: Session, model_id
) -> List[Tuple[Disc, Version, Model, Brand]]:
    all_data_disc = session.exec(
        select(Disc, Version, Model, Brand)
        .join(Version, Disc.version_id == Version.id)
        .join(Model, Version.model_id == Model.id)
        .join(Brand, Model.brand_id == Brand.id)
        .filter(Model.id == model_id)
    ).all()
    return all_data_disc
