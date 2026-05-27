import os
from typing import Annotated

from dotenv import load_dotenv
from fastapi import Depends
from sqlmodel import SQLModel, Session, create_engine, select
from models.table_models import Brand

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(
    DATABASE_URL,
    connect_args={"ssl": {}},
    echo=True,
)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


def init_db():
    pass


def check_data_exists() -> bool:
    with Session(engine) as session:
        exist_data = session.exec(select(Brand)).first()
        if exist_data:
            return True
        return False
