from typing import List, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.models import Fabricante, Modelo, VersionVehiculo


async def get_makers_name(session: AsyncSession) -> List[Fabricante]:
    """Obtiene todos los makers"""
    # Define la consola
    stmt = select(Fabricante)
    # Ejecuta la consulta de manera asíncrona
    result = await session.execute(stmt)
    # Utilizamos .scalars() para mapear los resultados a objetos Fabricante y devolverlos en una lista
    makers = result.scalars().all()
    return makers


async def get_maker_id_by_name(session: AsyncSession, maker_name: str) -> Optional[int]:
    """Busca y devuelve solo el ID de un fabricante por su nombre"""
    stmt = select(Fabricante.id).where(Fabricante.nombre == maker_name)
    # Se encarga de devolver el valor ya desempaquetado de esa única celda
    return await session.scalar(stmt)


async def get_model_id_by_name(session: AsyncSession, model_name: str) -> Optional[int]:
    stmt = select(Modelo.id).where(Modelo.nombre == model_name)
    return await session.scalar(stmt)


async def get_models_by_maker_id(session: AsyncSession, maker_id: int) -> List[Modelo]:
    """Obtiene todos los modelos para un ID de fabricante dado."""
    stmt = select(Modelo).where(Modelo.fabricante_id ==
                                maker_id).order_by(Modelo.nombre)
    result = await session.execute(stmt)
    return result.scalars().all()


async def get_version_by_model_id(session: AsyncSession, model_id: int) -> List[VersionVehiculo]:
    """Obtiene todas las versiones para un ID de modelo dado."""

    stmt = select(VersionVehiculo).where(VersionVehiculo.modelo_id == model_id)
    result = await session.execute(stmt)
    return result.scalars().all()


async def get_versionID_by_model_id(session: AsyncSession, model_id: int) -> List[int]:
    """Obtiene todos los ID de versiones para un ID de modelo dado."""
    stmt = select(VersionVehiculo.id).where(
        VersionVehiculo.modelo_id == model_id)
    result = await session.execute(stmt)
    return result.scalars().all()


async def get_modelsID_by_maker_id(session: AsyncSession, maker_id: int) -> List[int]:
    stmt = select(Modelo.id).where(Modelo.fabricante_id == maker_id)
    result = await session.execute(stmt)
    return result.scalars().all()


async def get_versionsID_by_models_id(session: AsyncSession, models_id: List[int]) -> List[int]:
    stmt = select(VersionVehiculo.id).where(
        VersionVehiculo.modelo_id.in_(models_id))
    result = await session.execute(stmt)
    return result.scalars().all()
