from typing import List
from fastapi import APIRouter, HTTPException, status
from exceptions import (
    BrandsNotFoundException,
    ModelsNotFoundException,
    VersionsNotFoundException,
)
from models.table_models import Brand, Model, Version
from database import SessionDep
from services.cascade_service import (
    get_brands_from_db,
    get_models_from_db,
    get_versions_from_db,
)

router = APIRouter()


@router.get("/brands", response_model=List[Brand], tags=["brands"])
def get_brands(session: SessionDep):
    try:
        brands = get_brands_from_db(session=session)
        return brands
    except BrandsNotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=e.message)


@router.get("/models/{brand_id}", response_model=List[Model], tags=["models"])
def get_models(session: SessionDep, brand_id: int):
    try:
        models = get_models_from_db(session=session, brand_id=brand_id)
        return models
    except ModelsNotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=e.message)


@router.get("/versions/{model_id}", response_model=List[Version], tags=["version"])
def get_versions(session: SessionDep, model_id: int):
    try:
        versions = get_versions_from_db(session=session, model_id=model_id)
        return versions
    except VersionsNotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=e.message)
