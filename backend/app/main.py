from contextlib import asynccontextmanager
import select
from exceptions import add_exception_handlers
from routes.cascade_router import router as cascade_router
from routes.parent_selector_router import router as parent_selector_router
from routes.filter_router import router as filter_selector_router
from routes.disc_router import router as disc_router
from routes.user_router import router as user_router
from routes.post_router import router as post_router
from routes.garage_router import router as garage_router
from routes.comment_router import router as comment_router
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from utils.seed import load_json_data
from database import SessionDep, check_data_exists, init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    # if not check_data_exists():
    #     load_json_data()

    yield
    print("Connection Close")


app = FastAPI(title="NeedToBrake-Backend", lifespan=lifespan)

origins = [
    "http://localhost:4200",
    "http://127.0.0.1:4200",
    "https://needtobrake.netlify.app",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


add_exception_handlers(app)
app.include_router(router=cascade_router, prefix="/cascade")
app.include_router(router=parent_selector_router, prefix="/parent-selector")
app.include_router(router=filter_selector_router, prefix="/filter")
app.include_router(router=disc_router, prefix="/disc")
app.include_router(router=user_router, prefix="/user")
app.include_router(router=post_router, prefix="/post")
app.include_router(router=garage_router, prefix="/garage")
app.include_router(router=comment_router, prefix="/comment")


@app.get("/health-check")
async def read_root():
    return {"status": "ok"}


@app.get("/git-with-db")
def git_check(request: Request, session: SessionDep):
    print(f"User-Agent recibido: {request.headers.get('user-agent')}")
    try:
        session.exec(select(1))
        # Ejecuta la consulta más simple posible
        return {"status": "ok", "database": "connected"}
    except Exception as e:
        # Si falla, devolvemos un 500 para que Render/GitHub lo sepan
        raise HTTPException(
            status_code=500, detail=f"Database connection failed: {str(e)}"
        )
