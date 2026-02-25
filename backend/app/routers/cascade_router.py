

from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.schemas import FabricanteSimpleRead, ModelosReadSimple, VersionVehiculoBase
from app.database import get_db_session
from app.services.cascade_service import FabricanteService

# 🚨 Función de Dependencia para el Servicio 🚨


def get_fabricante_service(session: AsyncSession = Depends(get_db_session)) -> FabricanteService:
    """
    Inyecta la sesión de DB y devuelve una instancia del servicio FabricanteService.
    """
    return FabricanteService(session)


router = APIRouter(prefix="", tags=['cascade'])


@router.get("/")
async def root():
    return {"message": "Hello World"}


@router.get("/read_makes", response_model=List[FabricanteSimpleRead], summary="Obtiene la lista simple de todos los fabricantes (ID y Nombre)")
async def simple_makers_list(service: FabricanteService = Depends(get_fabricante_service)):
    """
    Función del endpoint que llama al servicio para obtener la lista de fabricantes.
    """
    makers = await service.seach_makers_list()
    
    return makers


@router.get("/models/{make_name}", response_model=List[ModelosReadSimple], summary="Obtiene los modelos de un fabricante dado.")
async def read_models_by_make_name(make_name: str, service: FabricanteService = Depends(get_fabricante_service)):
    models = await service.search_models_by_maker_name(make_name)
    if models is None:
        raise HTTPException(status_code=404, detail=f"Modelos para '{make_name}' no encontrado.")
    return models


@router.get("/version/{model_name}", response_model=List[VersionVehiculoBase], summary="Obtiene las versiones de un modelo dado.")
async def read_version_by_model_name(model_name:str, service: FabricanteService=Depends(get_fabricante_service)):
    versions=await service.search_versions_by_model(model_name)
    if versions is None:
        raise HTTPException(status_code=404,detail=f"Versiones para '{model_name}' no encontrado.")
    return versions

@router.get("/models_by_ID/{make_id}", response_model=List[ModelosReadSimple], summary="Obtiene los modelos de un fabricante dado por id.")
async def read_models_by_make_id(make_id: int, service: FabricanteService = Depends(get_fabricante_service)):
    models = await service.search_models_by_maker_id(make_id)
    if models is None:
        raise HTTPException(status_code=404, detail=f"Modelos para '{make_id}' no encontrado.")
    return models


@router.get("/version_by_ID/{model_id}", response_model=List[VersionVehiculoBase], summary="Obtiene las versiones de un modelo dado por id.")
async def read_version_by_model_id(model_id:int, service: FabricanteService=Depends(get_fabricante_service)):
    versions=await service.search_versions_by_model_id(model_id)
    if versions is None:
        raise HTTPException(status_code=404,detail=f"Versiones para '{model_id}' no encontrado.")
    return versions

