from contextlib import asynccontextmanager
from routes.cascade_router import router as cascade_router
from routes.parent_selector_router import router as parent_selector_router
from fastapi import FastAPI


from utils.seed import load_json_data
from database import check_data_exists, init_db, engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    if not check_data_exists():
        load_json_data()

    yield
    print("Connection Close")


app = FastAPI(title="NeedToBrake-Backend", lifespan=lifespan)

app.include_router(router=cascade_router, prefix="/cascade")
app.include_router(router=parent_selector_router, prefix="/parent-selector")


@app.get("/")
async def read_root():
    return {"Hello": "World"}
