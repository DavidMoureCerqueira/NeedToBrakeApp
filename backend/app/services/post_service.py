import math
from typing import List

from sqlmodel import Session

from repository.cascade_repository import get_version_full
from repository.comment_repository import get_number_comments
from exceptions import PostDoesNotExistException
from models.table_models import Post
from repository.post_repository import (
    check_post_by_user,
    check_post_by_version,
    create_post,
    get_latest_post_by_user_and_version,
    get_post_by_id_detailed,
)
from models.models import PostCreate, PaginationResponse, PostDetail, PostReadList


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
) -> PaginationResponse[PostReadList]:
    offset = (limit * page) - limit

    raw_post, total = get_latest_post_by_user_and_version(
        session=session,
        offset=offset,
        limit=limit,
        user_id=user_id,
        version_id=version_id,
    )
    pages = math.ceil(total / limit)
    posts = []
    for post, count in raw_post:
        post_with_count = PostReadList.model_validate(
            post, update={"comment_count": count}
        )
        posts.append(post_with_count)
    return PaginationResponse(
        items=posts,
        total=total,
        pages=pages,
        page=page,
        has_next=pages > page,
    )


def get_post_by_version(
    session: Session, version_id: int, page: int = 1, limit: int = 10
) -> PaginationResponse:
    is_post = check_post_by_version(session=session, version_id=version_id)
    if not is_post:
        return PaginationResponse()

    return get_latest_post(
        session=session, page=page, limit=limit, version_id=version_id
    )


def get_post_by_user(
    session: Session, user_id: int, page: int = 1, limit: int = 10
) -> PaginationResponse:
    is_post = check_post_by_user(session=session, user_id=user_id)
    if not is_post:
        return PaginationResponse()

    return get_latest_post(session=session, page=page, limit=limit, user_id=user_id)


# COMPLETE
def get_post_by_id(session: Session, post_id: int, user_id: int) -> PostDetail:
    post = get_post_by_id_detailed(session=session, post_id=post_id)
    if not post:
        raise PostDoesNotExistException()
    comment_count = get_number_comments(session=session, post_id=post_id)
    post_detail = PostDetail.model_validate(post)
    full_version = None
    if post.version_id:
        full_version = get_version_full(session=session, version_id=post.version_id)
    post_detail.is_owner = post.user_id == user_id
    post_detail.comment_count = comment_count
    post_detail.version = full_version
    return post_detail
