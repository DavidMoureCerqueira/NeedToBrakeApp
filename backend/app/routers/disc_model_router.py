from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.schemas import DiscoFrenoBase, AxleInfo

from app.database import get_db_session
from app.services.disc_service import DiscoService


def get_disc_service(session: AsyncSession = Depends(get_db_session)) -> DiscoService:
    return DiscoService(session)


router = APIRouter(prefix="/disc", tags=['discModel'])


@router.get("/by_version/{version_id}", response_model=List[DiscoFrenoBase], summary="Obtiene los discos de una versión específica")
async def disc_by_version(version_id: int, service: DiscoService = Depends(get_disc_service)):
    discs = await service.search_disc_version_id(version_id)
    if discs is None:
        raise HTTPException(
            status_code=404, detail=f"Discos para '{version_id}' no encontrado.")
    return discs


@router.get("/by_model/{model_id}", response_model=List[DiscoFrenoBase], summary="Obtiene los todos los discos para un modelo.")
async def dics_by_model(model_id: int, service: DiscoService = Depends(get_disc_service)):
    discs = await service.search_disc_model_id(model_id)
    if discs is None:
        raise HTTPException(
            status_code=404, detail=f"Discos para '{model_id}' no encontrado.")
    return discs


@router.get("/by_make/{make_id}", response_model=List[DiscoFrenoBase], summary="Obtiene todos los discos para un fabricante.")
async def dics_by_make(make_id: int, service: DiscoService = Depends(get_disc_service)):
    discs = await service.search_disc_maker_id(make_id)
    if discs is None:
        raise HTTPException(
            status_code=404, detail=f"Discos para '{make_id}' no encontrado.")
    return discs


@router.get("/full/by_make/{make_id}", response_model=List[AxleInfo
], summary="Obtiene todos los discos para un fabricante y con la respuesta asociada")
async def full_disc_by_make(make_id: int, service: DiscoService = Depends(get_disc_service)):
    discs = await service.search_full_disc_maker_id(make_id)
    if discs is None:
        raise HTTPException(
            status_code=404, detail=f"Discos para '{make_id}' no encontrado.")
    return discs

@router.get("/full/by_model/{model_id}", response_model=List[AxleInfo
], summary="Obtiene todos los discos para un modelo y con la respuesta asociada")
async def full_disc_by_make(model_id: int, service: DiscoService = Depends(get_disc_service)):
    discs = await service.search_full_disc_model_id(model_id)
    if discs is None:
        raise HTTPException(
            status_code=404, detail=f"Discos para '{model_id}' no encontrado.")
    return discs

@router.get("/full/by_version/{version_id}", response_model=List[AxleInfo
], summary="Obtiene todos los discos para una versión y con la respuesta asociada")
async def full_disc_by_make(version_id: int, service: DiscoService = Depends(get_disc_service)):
    discs = await service.search_full_disc_version_id(version_id)
    if discs is None:
        raise HTTPException(
            status_code=404, detail=f"Discos para '{version_id}' no encontrado.")
    return discs
