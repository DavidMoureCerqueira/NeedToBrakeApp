from contextlib import asynccontextmanager

from fastapi import FastAPI

from database import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield
    print("Connection Close")


app = FastAPI(title="NeedToBrak-Backend", lifespan=lifespan)


@app.get("/")
async def read_root():
    return {"Hello": "World"}
