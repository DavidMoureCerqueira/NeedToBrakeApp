from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from models.models import PaginationResponse, PostCreate, PostDetail, PostReadList
from models.models import ModelResp
from services.post_service import (
    get_post_by_id,
    get_post_by_user,
    get_post_by_version,
    get_latest_post,
    save_post,
)

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


@router.get("/latest", response_model=ModelResp, tags=["Get latest post"])
def read_latest_post(
    session: SessionDep, page: int = Query(1, ge=1), limit: int = Query(5, ge=1, le=100)
):
    posts_and_data = get_latest_post(session=session, page=page, limit=limit)
    return ModelResp(success=True, data=posts_and_data)


@router.get(
    "/by-version/{version_id}", response_model=ModelResp, tags=["Get post by version"]
)
def read_post_by_version(
    session: SessionDep,
    version_id: int,
    page: int = Query(1, ge=1),
    limit: int = Query(5, ge=1, le=100),
):
    posts_and_data = get_post_by_version(
        session=session, page=page, limit=limit, version_id=version_id
    )
    return ModelResp(success=True, data=posts_and_data)


@router.get(
    "/by-user/{user_id}",
    response_model=ModelResp[PaginationResponse[PostReadList]],
    tags=["Get post by user"],
)
def read_post_by_user(
    session: SessionDep,
    user_id: int,
    page: int = Query(1, ge=1),
    limit: int = Query(5, ge=1, le=100),
):
    posts_and_data = get_post_by_user(
        session=session, page=page, limit=limit, user_id=user_id
    )
    return ModelResp(success=True, data=posts_and_data)


@router.get(
    "/{post_id}",
    response_model=ModelResp[PostDetail],
    tags=["Get post by id with user and number of comments"],
)
def read_post_by_id(
    session: SessionDep, post_id: int, user_id: int = Depends(get_authorization)
):
    postDetail = get_post_by_id(session=session, post_id=post_id, user_id=user_id)
    return ModelResp(success=True, data=postDetail)
