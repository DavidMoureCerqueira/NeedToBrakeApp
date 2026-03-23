from sqlmodel import Session

from repository.cascade_repository import (
    get_all_brands,
    get_all_models_by_brand_id,
    get_all_versions_by_model_id,
)


def get_brands_from_db(session: Session):
    brands = get_all_brands(session=session)
    if brands:
        return brands
    return None


def get_models_from_db(session: Session, brand_id: int):
    models = get_all_models_by_brand_id(session=session, brand_id=brand_id)
    if models:
        return models
    return None


def get_versions_from_db(session: Session, model_id: int):
    versions = get_all_versions_by_model_id(session=session, model_id=model_id)
    if versions:
        return versions
    return None
