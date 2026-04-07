from fastapi import APIRouter, HTTPException

from services.disc_service import get_disc_from_db
from database import SessionDep
from models.models import Disc


router = APIRouter()


@router.get("/{disc_id}", response_model=Disc, tags=["Disc by id"])
def get_disc(session: SessionDep, disc_id: int):
    disc = get_disc_from_db(session=session, disc_id=disc_id)
    if not disc:
        raise HTTPException(status_code=404, detail="No models found for this brand_id")
    return disc
