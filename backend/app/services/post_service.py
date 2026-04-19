import math
from typing import List

from sqlmodel import Session

from models.table_models import Post
from repository.post_repository import (
    check_post_by_user,
    check_post_by_version,
    create_post,
    get_latest_post_by_user_and_version,
)
from models.models import PostCreate, PostPaginationResponse


def save_post(session: Session, post_data: PostCreate, user_id: int) -> Post:
    post = Post(
        user_id=user_id,
        content=post_data.content,
        title=post_data.title,
        version_id=post_data.version_id,
    )
    new_post = create_post(session=session, post=post)

    return new_post


def get_latest_post(
    session: Session,
    page: int = 1,
    limit: int = 10,
    version_id: int = None,
    user_id: int = None,
) -> PostPaginationResponse:
    offset = (limit * page) - limit

    posts_and_total = get_latest_post_by_user_and_version(
        session=session,
        offset=offset,
        limit=limit,
        user_id=user_id,
        version_id=version_id,
    )
    pages = math.ceil(posts_and_total.total / limit)

    return PostPaginationResponse(
        items=posts_and_total.items,
        total=posts_and_total.total,
        pages=pages,
        page=page,
        has_next=pages > page,
    )


def get_post_by_version(
    session: Session, version_id: int, page: int = 1, limit: int = 10
) -> PostPaginationResponse:
    is_post = check_post_by_version(session=session, version_id=version_id)
    if not is_post:
        return PostPaginationResponse()

    return get_latest_post(
        session=session, page=page, limit=limit, version_id=version_id
    )


def get_post_by_user(
    session: Session, user_id: int, page: int = 1, limit: int = 10
) -> PostPaginationResponse:
    is_post = check_post_by_user(session=session, user_id=user_id)
    if not is_post:
        return PostPaginationResponse()

    return get_latest_post(session=session, page=page, limit=limit, user_id=user_id)
