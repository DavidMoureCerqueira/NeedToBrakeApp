from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Dict, Any, List, Optional
from app.models.models import Fabricante, Modelo, VersionVehiculo, DiscoFreno 


# ---------------------------------------------------------------------
# FUNCIÓN AUXILIAR 1: Obtener o Crear Fabricante (Marca)
# ---------------------------------------------------------------------

async def get_or_create_fabricante(session: AsyncSession, nombre_fabricante: str) -> Fabricante:
    """Busca un fabricante por nombre; si no existe, lo crea (Upsert)."""
    stmt = select(Fabricante).where(Fabricante.nombre == nombre_fabricante)
    result = await session.execute(stmt)
    fabricante = result.scalars().first()
    if fabricante:
        return fabricante
    nuevo_fabricante = Fabricante(nombre=nombre_fabricante)
    session.add(nuevo_fabricante)
    await session.flush()
    await session.refresh(nuevo_fabricante) 
    return nuevo_fabricante


# ---------------------------------------------------------------------
# FUNCIÓN AUXILIAR 2: Obtener o Crear Modelo
# ---------------------------------------------------------------------

async def get_or_create_modelo(session: AsyncSession, fabricante_id: int, nombre_modelo: str) -> Modelo:
    """Busca un modelo asociado a un fabricante; si no existe, lo crea (Upsert)."""
    stmt = select(Modelo).where(
        (Modelo.fabricante_id == fabricante_id) & 
        (Modelo.nombre == nombre_modelo)
    )
    result = await session.execute(stmt)
    modelo = result.scalars().first()
    if modelo:
        return modelo
    nuevo_modelo = Modelo(fabricante_id=fabricante_id, nombre=nombre_modelo)
    session.add(nuevo_modelo)
    await session.flush()
    await session.refresh(nuevo_modelo)
    return nuevo_modelo


# ---------------------------------------------------------------------
# FUNCIÓN DE VALIDACIÓN: Omite Discos Completamente Nulos
# ---------------------------------------------------------------------

def is_disco_data_valid(disco_data: Optional[Dict[str, Any]]) -> bool:
    """
    Retorna True si la sección del disco contiene al menos un valor 
    significativo (no None y no vacío).
    """
    if not disco_data:
        return False
    # Nota: Los campos de tipo String pueden ser 'None' si la conversión falló
    return any(value is not None and value != '' for value in disco_data.values())


# ---------------------------------------------------------------------
# FUNCIÓN PRINCIPAL: Inserción de Datos del JSON (Simplificada)
# ---------------------------------------------------------------------

async def insert_data_from_json(session: AsyncSession, data_list: List[Dict[str, Any]]) -> int:
    """
    Procesa el JSON plano, inserta la información normalizada, usando Float y String.
    """
    if not data_list:
        return 0 
        
    inserted_count = 0
    
    # Mapeo de prefijos a claves finales del modelo DiscoFreno (Asumimos el JSON plano)
    DISC_KEYS = ['Style', 'Holes', 'Diameter', 'Height', 'Thickness_New', 'Thickness_Min', 'PCD', 'CenterBore']
    
    def extract_disc_data(prefix: str) -> Dict[str, Any]:
        """Extrae, renombra y FUERZA la conversión de tipos a Float o String."""
        data = {}
        for key in DISC_KEYS:
            json_value = item.get(f"{prefix}_{key}")
            db_key = key.lower()
            
            # --- Reglas de Conversión ---
            if json_value is None or json_value == '':
                data[db_key] = None
                continue
            
            try:
                if db_key == 'style' or db_key == 'eje':
                    # Es String
                    data[db_key] = str(json_value)
                else:
                    # Todo lo demás es Float (incluyendo Holes y Diameter)
                    # Intentamos convertir primero a Float, esto maneja enteros y strings de números
                    data[db_key] = float(json_value)
                    
            except (ValueError, TypeError):
                # Si la conversión a float falla, lo tratamos como nulo
                data[db_key] = None
                
        return data

    for item in data_list:
        try:
            # 1. Fabricante y Modelo (Upsert)
            fabricante = await get_or_create_fabricante(session, item['Make']) 
            modelo = await get_or_create_modelo(session, fabricante.id, item['Model'])

            # 2. Reestructuración y Validación de datos de Disco 
            disco_frontal_data = extract_disc_data('Front')
            disco_trasero_data = extract_disc_data('Rear')
            
            discos_frontales_validos = is_disco_data_valid(disco_frontal_data)
            discos_traseros_validos = is_disco_data_valid(disco_trasero_data)
            
            # 🚨 OMITIR INSERCIÓN: Si no hay discos válidos, pasamos al siguiente item
            if not discos_frontales_validos and not discos_traseros_validos:
                continue 
            
            # 3. Si hay discos válidos, insertamos la versión del vehículo (Tabla superior)
            nueva_version = VersionVehiculo(
                modelo_id=modelo.id,
                # Asumimos que Engine y BHP ya son Float o Strings convertibles
                engine=float(item['Engine']),
                bhp=float(item['BHP']),
                year=item['Year'],
                submodelo=item.get('SubModel') 
            )
            session.add(nueva_version)
            await session.flush() 

            # 4. Insertar Discos Válidos (Tabla inferior)
            
            # --- Disco Frontal ---
            if discos_frontales_validos:
                disco_frontal = DiscoFreno(
                    version_id=nueva_version.id,
                    eje='Front',
                    **disco_frontal_data
                )
                session.add(disco_frontal)
            
            # --- Disco Trasero ---
            if discos_traseros_validos:
                disco_trasero = DiscoFreno(
                    version_id=nueva_version.id,
                    eje='Rear',
                    **disco_trasero_data
                )
                session.add(disco_trasero)
            
            inserted_count += 1
            
        except KeyError as e:
            print(f"Advertencia: El registro carece de la clave esencial {e} (ej. Make, Engine). Omitiendo entrada.")
        except Exception as e:
            print(f"Error desconocido al procesar el registro: {e}")
            
    return inserted_count