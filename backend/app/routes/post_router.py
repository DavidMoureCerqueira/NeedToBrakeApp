from fastapi import APIRouter, HTTPException, Query, Request, status


from models.table_models import Post
from services.post_service import get_latest_post, save_post
from models.models import ModelResp, PostCreate, PostPaginationResponse
from services.auth_service import get_authorization


from services.user_service import (
    get_user_by_id_from_db,
    save_user,
    singin_user,
)
from database import SessionDep


router = APIRouter()


@router.post("/create", response_model=ModelResp, tags=["Create post"])
def handle_create_post(request: Request, session: SessionDep, data: PostCreate):
    user_id = get_authorization(request=request)
    new_post = save_post(session=session, post_data=data, user_id=user_id)
    return ModelResp(success=True, data=new_post)


@router.get("/latest", response_model=ModelResp, tags=["Gets latest post"])
def get_events_latest_post(
    session: SessionDep, page: int = Query(1, ge=1), limit: int = Query(1, ge=1, le=100)
):
    posts_and_data = get_latest_post(session=session, page=page, limit=limit)
    return ModelResp(success=True, data=posts_and_data)
