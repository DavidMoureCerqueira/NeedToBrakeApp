# app/services/data_service.py

import json
from pathlib import Path
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict, Any

# Importamos el repositorio (donde está la lógica de inserción)
from app.repositories import data_repo 
from app.database import AsyncSessionLocal 

# 🚨 Ruta al archivo JSON:
# Asumimos que data.json está dos niveles arriba (en la raíz del proyecto BACKEND NTB)
JSON_PATH = Path(__file__).parent.parent.parent / ".\data\catalogo_frenos_objetos.json" 

async def load_data_from_json_service(session: AsyncSession) -> Dict[str, Any]:
    """
    Servicio principal para orquestar la carga masiva de datos desde el archivo JSON 
    hacia la DB. Maneja la lectura del archivo y la transacción (commit/rollback).
    """
    
    # 1. Verificar existencia del archivo
    if not JSON_PATH.exists():
        return {"status": "error", "message": f"Archivo JSON no encontrado en la ruta esperada: {JSON_PATH}"}
        
    try:
        # 2. Leer el JSON
        with open(JSON_PATH, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # 3. Ejecutar la inserción masiva a través del repositorio
        # El repositorio maneja el mapeo, la normalización, y la validación de nulos.
        inserted_count = await data_repo.insert_data_from_json(session, data)
        
        # 4. Commit Final: Si el repositorio no lanzó un error, guardamos todos los cambios
        await session.commit() 
        
        return {
            "status": "success", 
            "message": f"Carga masiva completada: {inserted_count} registros de vehículos (con discos) procesados y guardados."
        }

    except json.JSONDecodeError:
        # Error al leer o parsear el archivo JSON
        await session.rollback()
        return {"status": "error", "message": "Error de formato: El archivo JSON no es válido."}
        
    except Exception as e:
        return {"status": "error", "message": "Error de formato: El archivo JSON no es válido2."}
        # Si algo falla (ej. error de base de datos, error de tipo, etc.), hacemos rollback