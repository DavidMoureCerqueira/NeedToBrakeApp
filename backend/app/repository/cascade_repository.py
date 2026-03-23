from typing import List
from sqlmodel import Session, select
from models.models import Brand, Model, Version


def get_all_brands(session: Session) -> List[Brand]:
    brands = session.exec(select(Brand)).all()
    return brands


def get_all_models_by_brand_id(session: Session, brand_id: int) -> List[Model]:
    models = session.exec(select(Model).filter(Model.brand_id == brand_id)).all()
    return models


def get_all_versions_by_model_id(session: Session, model_id: int) -> List[Version]:
    versions = session.exec(select(Version).filter(Version.model_id == model_id)).all()
    return versions
