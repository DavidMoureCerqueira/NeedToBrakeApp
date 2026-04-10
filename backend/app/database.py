import os
from typing import Annotated

from fastapi import Depends
from sqlmodel import SQLModel, Session, create_engine, select
from models.table_models import Brand

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL, echo=True)
#  echo: Para ver las consultas en la consola


# Fabrica de sesiones, para conectar a la base de datos y cierre automático.
def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
# Annotated es un tipo que proporciona una instrucción para obtener ese tipo


def init_db():
    from models.table_models import Brand
    from models.table_models import Model
    from models.table_models import Version
    from models.table_models import Disc

    SQLModel.metadata.create_all(engine)


def check_data_exists() -> bool:
    """It is used to check if its needed to make the initial seeding"""
    with Session(engine) as session:
        exist_data = session.exec(select(Brand)).first()
        if exist_data:
            return True
        return False
