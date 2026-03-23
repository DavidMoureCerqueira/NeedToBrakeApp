from typing import List

from fastapi import APIRouter, HTTPException

from services.parent_selector_service import get_all_disc_by_model_from_db
from models.models import DiscoReadFull
from database import SessionDep

router = APIRouter()


@router.get(
    "/disc-by-model/{model_id}",
    response_model=List[DiscoReadFull],
    tags=["disc by models"],
)
def get_all_discs_by_model(session: SessionDep, model_id: int):
    full_data_disc_by_model = get_all_disc_by_model_from_db(
        session=session, model_id=model_id
    )
    if not full_data_disc_by_model:
        return HTTPException(
            status_code=404, detail="No disc found on Database for that model_id"
        )
    return full_data_disc_by_model
