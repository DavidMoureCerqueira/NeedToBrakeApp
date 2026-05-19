from sqlmodel import Session

from models.models import ModelResp
from exceptions import PostAlreadyDidNotLikedException, PostAlreadyLikedException
from repository.post_repository import check_user_liked_post
from repository.like_repository import create_like, delete_like


def add_like(session: Session, post_id: int, user_id: int):
    already_liked = check_user_liked_post(
        session=session, post_id=post_id, user_id=user_id
    )
    if already_liked:
        raise PostAlreadyLikedException()
    create_like(session=session, post_id=post_id, user_id=user_id)
    return ModelResp(success=True, data="Post liked correctly")


def remove_like(session: Session, post_id: int, user_id: int):
    was_deleted = delete_like(session, post_id, user_id)
    if not was_deleted:
        raise PostAlreadyDidNotLikedException()
    return ModelResp(success=True, data="Post unliked correctly")
