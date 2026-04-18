import math
from typing import List

from sqlmodel import Session

from models.table_models import Post
from repository.post_repository import create_post, get_latest_post_by_user_and_version
from models.models import PostCreate, PostPaginationResponse


def save_post(session: Session, post_data: PostCreate, user_id: int) -> Post:
    post = Post(
        user_id=user_id,
        content=post_data.content,
        title=post_data.title,
    )
    new_post = create_post(session=session, post=post)

    return new_post


def get_latest_post(
    session: Session, page: int = 1, limit: int = 10
) -> PostPaginationResponse:
    offset = (limit * page) - limit

    posts_and_total = get_latest_post_by_user_and_version(
        session=session, offset=offset, limit=limit
    )
    pages = math.ceil(posts_and_total.total / limit)

    return PostPaginationResponse(
        items=posts_and_total.items,
        total=posts_and_total.total,
        pages=pages,
        page=page,
        has_next=pages > page,
    )
