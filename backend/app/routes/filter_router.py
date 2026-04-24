from typing import List

from fastapi import APIRouter, HTTPException

from database import SessionDep
from models.models import DiscFilters, DiscoReadFull
from services.filter_service import get_car_and_disc_by_filter_from_db


router = APIRouter()


@router.post(
    "/disc", response_model=list[DiscoReadFull], tags=[" cars and disc by filter"]
)
def get_car_and_disc_by_filter(session: SessionDep, filters: DiscFilters):
    cars_and_discs = get_car_and_disc_by_filter_from_db(
        session=session, filters=filters
    )
    return cars_and_discs
