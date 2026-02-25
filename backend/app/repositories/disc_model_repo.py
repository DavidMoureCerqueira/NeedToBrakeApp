from typing import List, Optional
from sqlalchemy import Tuple, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.models import DiscoFreno, Fabricante, Modelo, VersionVehiculo


async def get_disc_version_id(session: AsyncSession, version_id: int) -> List[DiscoFreno]:
    """Obtiene los discos para un ID de VERSION dado."""
    stmt = select(DiscoFreno).where(DiscoFreno.version_id == version_id)
    result = await session.execute(stmt)
    return result.scalars().all()

async def get_discs_versionsID_in(session:AsyncSession, versions_id:List[int])-> List[DiscoFreno]:
    stmt=select(DiscoFreno).where(DiscoFreno.version_id.in_(versions_id))
    result=await session.execute(stmt)
    return result.scalars().all()

async def get_full_discs_by_maker_id(session:AsyncSession, maker_id:int)-> List[Tuple]:
    stmt=select(
        Fabricante.nombre.label('maker_name'),
        Modelo.nombre.label('model_name'),
        VersionVehiculo,
        DiscoFreno
        ).join(
            Modelo,Fabricante.id==Modelo.fabricante_id
        ).join(
            VersionVehiculo,Modelo.id==VersionVehiculo.modelo_id
        ).join(
            DiscoFreno, VersionVehiculo.id==DiscoFreno.version_id
        ).where(Fabricante.id==maker_id)
    result=await session.execute(stmt)
    return result.all()
    
async def get_full_discs_by_model_id(session:AsyncSession, model_id:int)-> List[Tuple]:
    stmt=select(
        Fabricante.nombre.label('maker_name'),
        Modelo.nombre.label('model_name'),
        VersionVehiculo,
        DiscoFreno
        ).join(
            Fabricante,Modelo.fabricante_id==Fabricante.id
        ).join(
            VersionVehiculo,Modelo.id==VersionVehiculo.modelo_id
        ).join(
            DiscoFreno, VersionVehiculo.id==DiscoFreno.version_id
        ).where(Modelo.id==model_id)
    result=await session.execute(stmt)
    return result.all()

async def get_full_discs_by_version_id(session:AsyncSession, version_id:int)-> List[Tuple]:
    stmt=select(
        Fabricante.nombre.label('maker_name'),
        Modelo.nombre.label('model_name'),
        VersionVehiculo,
        DiscoFreno
        ).join(
            Modelo,VersionVehiculo.modelo_id==Modelo.id
        ).join(
            Fabricante,Modelo.fabricante_id==Fabricante.id
        ).join(
            DiscoFreno, VersionVehiculo.id==DiscoFreno.version_id
        ).where(VersionVehiculo.id==version_id)
    result=await session.execute(stmt)
    return result.all()