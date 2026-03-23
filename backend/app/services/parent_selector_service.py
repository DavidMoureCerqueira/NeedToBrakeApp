from typing import List

from sqlmodel import Session

from models.models import DiscoReadFull
from repository.parent_selector_repository import get_all_disc_by_model_id


def get_all_disc_by_model_from_db(
    session: Session, model_id: int
) -> List[DiscoReadFull]:
    data = get_all_disc_by_model_id(session, model_id=model_id)
    all_disc = []
    for disc_obj, version_obj, model_obj, brand_obj in data:
        model_obj.brand = brand_obj
        version_obj.model = model_obj
        disc_obj.version = version_obj
        all_disc.append(disc_obj)
    if all_disc:
        return all_disc
    return None
