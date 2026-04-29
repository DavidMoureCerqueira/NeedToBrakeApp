import math

from sqlmodel import Session

from messages import succes_messages
from repository.comment_repository import (
    create_comment,
    delete_comment,
    get_comment_by_id,
    get_latest_comment,
    modify_comment_by_id,
)
from exceptions import (
    CommentNotFoundException,
    PostDoesNotExistException,
    UnauthorizedCommentAccessException,
    WrongUserException,
)
from repository.post_repository import get_post_by_id
from repository.user_repository import get_user_by_id
from models.models import CommentCreate, CommentModify, PaginationResponse
from models.table_models import Comment


def save_comment(
    session: Session, comment_data: CommentCreate, user_id: int
) -> Comment:
    check_post_and_user_exists(
        session=session, post_id=comment_data.post_id, user_id=user_id
    )

    comment = Comment(
        user_id=user_id, content=comment_data.content, post_id=comment_data.post_id
    )
    new_comment = create_comment(session=session, comment=comment)

    return new_comment


def modify_comment(
    session: Session, comment_data: CommentModify, user_id: int
) -> Comment:
    check_comment_and_author(
        session=session, comment_id=comment_data.comment_id, user_id=user_id
    )
    modified_comment = modify_comment_by_id(session=session, comment_data=comment_data)
    return modified_comment


def delete_comment_by_id(session: Session, comment_id: int, user_id: int):
    comment = check_comment_and_author(
        session=session, comment_id=comment_id, user_id=user_id
    )
    delete_comment(session=session, comment=comment)
    return succes_messages["SUCCESS_REMOVE_COMMENT"]


def get_comments_by_post(
    session: Session, post_id: int, page: int = 1, limit: int = 10
) -> PaginationResponse:
    is_post = get_post_by_id(session=session, post_id=post_id)
    if not is_post:
        return PaginationResponse()

    return get_latest_comment_by_post(
        session=session, page=page, limit=limit, post_id=post_id
    )


def get_latest_comment_by_post(
    session: Session,
    page: int = 1,
    limit: int = 10,
    version_id: int = None,
    post_id: int = None,
) -> PaginationResponse:
    offset = (limit * page) - limit

    comments_and_total = get_latest_comment(
        session=session,
        post_id=post_id,
        offset=offset,
        limit=limit,
    )
    pages = math.ceil(comments_and_total.total / limit)

    return PaginationResponse(
        items=comments_and_total.items,
        total=comments_and_total.total,
        pages=pages,
        page=page,
        has_next=pages > page,
    )


def check_post_and_user_exists(session: Session, post_id: int, user_id: int):
    user = get_user_by_id(session=session, user_id=user_id)
    if not user:
        raise WrongUserException()
    post = get_post_by_id(session=session, post_id=post_id)
    if not post:
        raise PostDoesNotExistException()


def check_comment_and_author(session: Session, comment_id: int, user_id: int):
    comment = get_comment_by_id(session=session, comment_id=comment_id)
    if not comment:
        raise CommentNotFoundException()
    if comment.user_id != user_id:
        raise UnauthorizedCommentAccessException()
    return comment
