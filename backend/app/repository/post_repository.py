from typing import List, Tuple

from sqlmodel import Session, desc, func, select
from sqlalchemy.orm import joinedload

from models.models import ItemsWithTotal, PostDetail
from models.table_models import Comment, Post


def create_post(session: Session, post: Post) -> Post:
    session.add(post)
    session.commit()
    session.refresh(post)
    return post


def get_latest_post_by_user_and_version(
    session: Session,
    version_id: int = None,
    user_id: int = None,
    offset: int = 0,
    limit: int = 10,
) -> Tuple[List[Tuple[Post, int]], int]:
    comment_count_subquery = (
        select(func.count(Comment.id))
        .where(Comment.post_id == Post.id)
        .scalar_subquery()
    )
    stmt = select(Post, comment_count_subquery.label("total_comments")).options(
        joinedload(Post.author)
    )
    if user_id:
        stmt = stmt.filter(Post.user_id == user_id)
    if version_id:
        stmt = stmt.filter(Post.version_id == version_id)

    counted_stmt = select(func.count()).select_from(stmt.subquery())
    total_count = session.exec(counted_stmt).first() or 0
    results = session.exec(
        stmt.order_by(desc(Post.date)).offset(offset).limit(limit)
    ).all()

    return results, total_count


def get_post_by_id(session: Session, post_id: int):
    post = session.exec(select(Post).where(Post.id == post_id)).first()
    return post


def check_post_by_version(session: Session, version_id: int) -> bool:
    is_post = not not session.exec(
        select(Post.id).where(Post.version_id == version_id)
    ).first()
    return is_post


def check_post_by_user(session: Session, user_id: int) -> bool:
    is_post = not not session.exec(
        select(Post.id).where(Post.user_id == user_id)
    ).first()
    return is_post


def get_post_by_id_detailed(session: Session, post_id: int) -> Post:
    post = session.exec(
        select(Post).where(Post.id == post_id).options(joinedload(Post.author))
    ).first()
    return post
