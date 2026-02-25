# app/routers/admin_router.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db_session
from app.services import data_service

# Definimos el router con un prefijo para agrupar endpoints de administración
router = APIRouter(
    prefix="/admin",
    tags=["Administración de Datos"],
)

@router.post("/load-data", status_code=status.HTTP_200_OK)
async def load_initial_data(
    session: AsyncSession = Depends(get_db_session)
):
    """
    Endpoint para iniciar la carga masiva de datos desde el archivo JSON 
    hacia la base de datos PostgreSQL.
    """
    
    # Llamamos al servicio para ejecutar toda la lógica de carga y commit
    result = await data_service.load_data_from_json_service(session)
    
    if result["status"] == "error":
        # Si hay un error, devolvemos un error HTTP 400
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result["message"]
        )
        
    return result