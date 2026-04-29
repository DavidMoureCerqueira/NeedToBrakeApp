import os
from typing import Annotated

from dotenv import load_dotenv
from fastapi import Depends
from sqlmodel import SQLModel, Session, create_engine, select
from models.table_models import Brand

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# engine = create_engine(
#     DATABASE_URL,
#     connect_args={
#         # Al poner "ssl": True, PyMySQL activa la conexión segura
#         # sin esperar parámetros extraños en la URL.
#         "ssl": {}
#     },
#     echo=True,
# )
# #  echo: Para ver las consultas en la consola

engine = create_engine(
    DATABASE_URL,
    connect_args={
        "ssl": {},
        "connect_timeout": 10,  # Evita que el backend se quede colgado si la red falla
    },
    # --- CONFIGURACIÓN DE POOLING ---
    pool_size=5,  # Mantiene 5 conexiones siempre abiertas
    max_overflow=10,  # Permite hasta 10 más en picos de tráfico
    pool_recycle=1200,  # Cierra conexiones cada 20 min (Aiven suele cortar a los 30)
    pool_pre_ping=True,  # ¡CRUCIAL! Verifica si la conexión murió antes de usarla
    # --------------------------------
    echo=False,  # Cámbialo a False en producción para no llenar los logs de Render
)


# Fabrica de sesiones, para conectar a la base de datos y cierre automático.
def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
# Annotated es un tipo que proporciona una instrucción para obtener ese tipo


def init_db():
    # from models.table_models import Brand
    # from models.table_models import Model
    # from models.table_models import Version
    # from models.table_models import Disc

    # SQLModel.metadata.create_all(engine)
    pass


def check_data_exists() -> bool:
    """It is used to check if its needed to make the initial seeding"""
    with Session(engine) as session:
        exist_data = session.exec(select(Brand)).first()
        if exist_data:
            return True
        return False
