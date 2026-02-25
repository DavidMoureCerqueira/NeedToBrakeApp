from typing import List, Optional
from sqlalchemy import Tuple, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.models import DiscoFreno, Fabricante, Modelo, VersionVehiculo



async def get_full_discs_by_measurement(session:AsyncSession, 
    eje:Optional[str]=None,
    style:Optional[str]=None,
    holes:Optional[float]=None,
    diameter:Optional[float]=None,
    height:Optional[float]=None,
    thickness_new:Optional[float]=None,
    thickness_min:Optional[float]=None,
    pcd:Optional[float]=None,
    centerbore:Optional[float]=None,
    )-> List[Tuple]:
    stmt=select(
        Fabricante.nombre.label('maker_name'),
        Modelo.nombre.label('model_name'),
        VersionVehiculo,
        DiscoFreno).select_from(DiscoFreno)
    
    stmt=stmt.join(
            VersionVehiculo, DiscoFreno.version_id==VersionVehiculo.id
        ).join(
            Modelo,VersionVehiculo.modelo_id==Modelo.id
        ).join(
            Fabricante,Modelo.fabricante_id==Fabricante.id
        )
    filters=[]
    if eje is not None:
        filters.append(DiscoFreno.eje==eje)
    if style is not None:
        filters.append(DiscoFreno.style==style)
    if holes is not None:
        filters.append(DiscoFreno.holes==holes)
    if diameter is not None:
        filters.append(DiscoFreno.diameter==diameter)
    if height is not None:
        filters.append(DiscoFreno.height==height)
    if thickness_new is not None:
        filters.append(DiscoFreno.thickness_new==thickness_new)
    if thickness_min is not None:
        filters.append(DiscoFreno.thickness_min==thickness_min)
    if pcd is not None:
        filters.append(DiscoFreno.pcd==pcd)
    if centerbore is not None:
        filters.append(DiscoFreno.centerbore==centerbore)
    if filters:
        stmt=stmt.where(*filters)
    
    result=await session.execute(stmt)
    return result.all()