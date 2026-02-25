# /app/database.py

import os
from dotenv import load_dotenv

# Importaciones Asíncronas
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase 
from typing import AsyncGenerator

# ------------------------------------
# 1. Cargar la variable DATABASE_URL
# ------------------------------------
# 🚨 CRÍTICO: Esto lee el archivo .env
load_dotenv() 
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("La variable DATABASE_URL no está configurada en el entorno.")

# ------------------------------------
# 2. Definición de la Base y Engine
# ------------------------------------
class Base(DeclarativeBase):
    pass

# El motor asíncrono que usa la URL del .env
engine = create_async_engine(DATABASE_URL, echo=True)

# La fábrica de sesiones asíncronas
AsyncSessionLocal = async_sessionmaker(
    bind=engine, 
    class_=AsyncSession, # Asegura que use la clase de sesión asíncrona
    expire_on_commit=False
)

# ------------------------------------
# 3. Función de Dependencia (para FastAPI)
# ------------------------------------
async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    """Proporciona una sesión de base de datos a los endpoints de FastAPI."""
    async with AsyncSessionLocal() as session:
        yield session

# ------------------------------------
# 4. Función de Inicialización
# ------------------------------------
async def init_db():
    """Crea las tablas en la base de datos si no existen."""
    async with engine.begin() as conn:
        # Importa los modelos aquí para asegurar que Base los conozca antes de crear las tablas
        from . import models 
        await conn.run_sync(Base.metadata.create_all)