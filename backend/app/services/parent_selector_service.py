from typing import List

from sqlmodel import Session

from services.mappers.mapper_duple_to_DiscoReadFull import (
    transform_duple_data_to_DiscoReadFull,
)
from models.models import DiscoReadFull


from repository.parent_selector_repository import (
    get_all_disc_by_model_id,
    get_all_disc_by_version_id,
)


def get_all_disc_by_model_from_db(
    session: Session, model_id: int
) -> List[DiscoReadFull]:
    data = get_all_disc_by_model_id(session=session, model_id=model_id)
    all_disc_formatted = transform_duple_data_to_DiscoReadFull(data)
    if all_disc_formatted:
        return all_disc_formatted
    return []


def get_all_disc_by_version_from_db(
    session: Session, version_id: int
) -> List[DiscoReadFull]:
    data = get_all_disc_by_version_id(session=session, version_id=version_id)
    all_disc_formatted = transform_duple_data_to_DiscoReadFull(data)
    if all_disc_formatted:
        return all_disc_formatted
    return []
