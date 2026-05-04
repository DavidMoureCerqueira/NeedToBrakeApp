from typing import List

from fastapi import APIRouter, Body, Depends, Request
from sqlmodel import Session

from services.auth_service import get_authorization
from database import SessionDep
from services.garage_service import (
    delete_favourite,
    delete_item_from_garage,
    get_garage_by_user,
    save_garage_item,
    set_favourite_item,
)
from models.models import GarageData, ModelResp, UserVersionGarageRead

router = APIRouter()


@router.post(
    "/add",
    response_model=ModelResp[List[UserVersionGarageRead]],
    tags=["Add version to garage"],
)
def add_garage(
    session: SessionDep,
    version_id: int = Body(..., embed=True),
    user_id: int = Depends(get_authorization),
):

    data = save_garage_item(session=session, user_id=user_id, version_id=version_id)
    return ModelResp(success=True, data=data)


@router.patch(
    "/set-favourite",
    response_model=ModelResp[List[UserVersionGarageRead]],
    tags=["Set a garage item as favourite"],
)
def add_favourite(
    session: SessionDep,
    version_id: int = Body(..., embed=True),
    user_id: int = Depends(get_authorization),
):

    data = set_favourite_item(session=session, user_id=user_id, version_id=version_id)
    return ModelResp(success=True, data=data)


@router.delete(
    "/delete-garage-item/version/{version_id}",
    response_model=ModelResp[str],
    tags=["Deletes an item from garage"],
)
def remove_garage_item(
    session: SessionDep,
    version_id: int,
    user_id: int = Depends(get_authorization),
):

    result = delete_item_from_garage(
        session=session, user_id=user_id, version_id=version_id
    )
    return ModelResp(success=True, data=result)


@router.patch(
    "/unset-garage-fav",
    response_model=ModelResp[str],
    tags=["Deletes an item from garage"],
)
def remove_garage_fav(
    session: SessionDep,
    user_id: int = Depends(get_authorization),
):
    result = delete_favourite(session=session, user_id=user_id)
    return ModelResp(success=True, data=result)


@router.get(
    "/get-all-garage/{user_id}",
    response_model=ModelResp[List[UserVersionGarageRead]],
    tags=["Get all garage items for a user"],
)
def get_garage(
    session: SessionDep, user_id: int, user_auth: int = Depends(get_authorization)
):
    data = get_garage_by_user(session=session, user_id=user_id)
    return ModelResp(success=True, data=data)
