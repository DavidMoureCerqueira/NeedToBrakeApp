from typing import List

from sqlmodel import Session

from services.mapper import transform_duple_data_to_DiscoReadFull
from repository.filter_repository import get_car_and_disc_by_filter
from models.models import DiscFilters


def get_car_and_disc_by_filter_from_db(session: Session, filters: DiscFilters):

    existing_filters = filters.model_dump(exclude_none=True, exclude_unset=True)

    data = get_car_and_disc_by_filter(session=session, filters=existing_filters)

    car_and_disc = transform_duple_data_to_DiscoReadFull(data)
    if car_and_disc:
        return car_and_disc
    return []
