from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.schemas import AxleInfo, DiscoFrenoBase, DiscoFullDetailRead
from app.database import get_db_session
from app.services.disc_service import DiscoService

def get_disc_service(session: AsyncSession = Depends(get_db_session)) -> DiscoService:
    return DiscoService(session)

router = APIRouter(prefix="/disc_measurement", tags=['discModelMeasurement'])

@router.get(
    "/",
    response_model=List[AxleInfo],
    summary="Buscar discos por medidas y eje."
)
async def search_rotors_by_measurements(
    # FastAPI mapeará estos parámetros de query a los argumentos del servicio
    diameter: Optional[float] = Query(None, description="Diámetro del disco (mm)"),
    height: Optional[float] = Query(None, description="Altura total del disco (mm)"),
    thickness_new: Optional[float] = Query(None, alias="tNew", description="Espesor nominal del disco (mm)"),
    thickness_min: Optional[float] = Query(None, alias="tMin", description="Espesor mínimo de descarte (mm)"),
    holes: Optional[float] = Query(None, description="Número de agujeros/pernos"),
    eje: Optional[str] = Query(None, description="Eje del disco (FRONT o REAR)"),
    style: Optional[str] = Query(None, description="Estilo del disco (Sólido, Ventilado, etc.)"),
    pcd: Optional[float] = Query(None, description="Diámetro de círculo de paso (PCD)"),
    centerbore: Optional[float] = Query(None, description="Diámetro del orificio central (CB)"),

    # Inyección del servicio
    disco_service: DiscoService = Depends(get_disc_service)
):
  
    discs = await disco_service.search_full_discs_by_measurement(
        eje=eje,
        style=style,
        holes=holes,
        diameter=diameter,
        height=height,
        thickness_new=thickness_new,
        thickness_min=thickness_min,
        pcd=pcd,
        centerbore=centerbore,
    )
    
    if not discs:
        # Nota: Para búsquedas, es común devolver una lista vacía 200 en lugar de 404, 
        # pero 404 puede ser más informativo si la búsqueda es muy específica.
        # Mantendremos la lista vacía (return []) si no hay resultados, lo que FastAPI maneja como 200.
        pass
        
    return discs