from typing import List

from fastapi import APIRouter, Body, Depends, Query

from services.comment_service import (
    delete_comment_by_id,
    get_comments_by_post,
    modify_comment,
    save_comment,
)
from database import SessionDep
from services.auth_service import get_authorization
from models.models import (
    CommentCreate,
    CommentModify,
    ModelResp,
    CommentRead,
    PaginationResponse,
)


router = APIRouter()


@router.post("/create", response_model=ModelResp[CommentRead], tags=["Create comment"])
def handle_create_comment(
    session: SessionDep,
    data: CommentCreate,
    user_id: int = Depends(get_authorization),
):

    new_comment = save_comment(session=session, comment_data=data, user_id=user_id)
    return ModelResp(success=True, data=new_comment)


@router.put(
    "/modify", response_model=ModelResp[CommentRead], tags=["Modify existing comment"]
)
def handle_modify_comment(
    session: SessionDep,
    data: CommentModify,
    user_id: int = Depends(get_authorization),
):

    modified_comment = modify_comment(
        session=session, comment_data=data, user_id=user_id
    )
    return ModelResp(success=True, data=modified_comment)


@router.delete(
    "/delete/{comment_id}",
    response_model=ModelResp[str],
    tags=["Deletes existing comment"],
)
def handle_delete_comment(
    session: SessionDep, comment_id: int, user_id: int = Depends(get_authorization)
):
    result = delete_comment_by_id(
        session=session, comment_id=comment_id, user_id=user_id
    )
    return ModelResp(success=True, data=result)


@router.get(
    "/by-post/{post_id}",
    response_model=ModelResp[PaginationResponse[CommentRead]],
    tags=["Gets all comments in one post"],
)
def handle_all_coments_by_post(
    session: SessionDep,
    post_id: int,
    page: int = Query(1, ge=1),
    limit: int = Query(5, ge=1, le=100),
):
    comments_and_data = get_comments_by_post(
        session=session, page=page, limit=limit, post_id=post_id
    )
    return ModelResp(success=True, data=comments_and_data)
