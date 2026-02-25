# app/services/maker_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.models.models import Fabricante, Modelo, VersionVehiculo
# Importamos la función de acceso a datos del repositorio
from app.repositories.cascade_repo import get_maker_id_by_name, get_makers_name, get_model_id_by_name, get_models_by_maker_id, get_version_by_model_id


class FabricanteService:
    """
    Clase de servicio para Fabricante. Actúa como la capa de lógica 
    de negocio entre el Router y el Repositorio.
    """

    def __init__(self, session: AsyncSession):
        # 1. Almacenamos la sesión inyectada por FastAPI
        self.session = session

    async def seach_makers_list(self) -> List[Fabricante]:
        makers=await get_makers_name(self.session)
        if makers:
            return makers
        
        return []

    async def search_models_by_maker_name(self, maker: str) -> List[Modelo]:
        maker_id = await get_maker_id_by_name(self.session, maker.upper())
        if maker_id is None:
            return []

        models = await get_models_by_maker_id(self.session, maker_id)
        
        return models

    async def search_versions_by_model(self, model: str) -> List[VersionVehiculo]:
        model_id = await get_model_id_by_name(self.session, model.capitalize())
        if model_id is None:
            return None
        versiones = await get_version_by_model_id(self.session, model_id)
        return versiones

    async def search_versions_by_model_id(self, model_id: int) -> List[VersionVehiculo]:

        versiones = await get_version_by_model_id(self.session, model_id)
        return versiones

    async def search_models_by_maker_id(self, maker_id: int) -> List[Modelo]:

        modelos = await get_models_by_maker_id(self.session, maker_id)
        return modelos
