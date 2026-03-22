import os

from sqlmodel import SQLModel, Session, create_engine

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL, echo=True)
#  echo: Para ver las consultas en la consola


# Fabrica de sesiones, para conectar a la base de datos y cierre automático.
def get_session():
    with Session(engine) as session:
        yield session


def init_db():
    from models.models import Brand
    from models.models import Model
    from models.models import Version
    from models.models import Disc

    SQLModel.metadata.create_all(engine)
