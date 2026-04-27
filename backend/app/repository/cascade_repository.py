from typing import List
from sqlmodel import Session, select
from models.table_models import Brand, Model, Version
from sqlalchemy.orm import joinedload


def get_all_brands(session: Session) -> List[Brand]:
    brands = session.exec(select(Brand)).all()
    return brands


def get_all_models_by_brand_id(session: Session, brand_id: int) -> List[Model]:
    models = session.exec(select(Model).filter(Model.brand_id == brand_id)).all()
    return models


def get_all_versions_by_model_id(session: Session, model_id: int) -> List[Version]:
    versions = session.exec(select(Version).filter(Version.model_id == model_id)).all()
    return versions


def get_version_by_id(session: Session, version_id: int) -> Version:
    version = session.exec(select(Version).where(Version.id == version_id)).first()
    return version


def get_model_by_id(session: Session, model_id: int) -> Model:
    model = session.exec(select(Model).where(Model.id == model_id)).first()
    return model


def get_version_full(session: Session, version_id: int) -> Version:
    return session.exec(
        select(Version)
        .where(Version.id == version_id)
        .options(joinedload(Version.model).joinedload(Model.brand))
    ).first()
