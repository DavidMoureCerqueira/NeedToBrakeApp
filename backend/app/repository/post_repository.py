from typing import List

from sqlmodel import Session, desc, func, select

from models.models import ItemsWithTotal
from models.table_models import Post


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
) -> ItemsWithTotal:

    stmt = select(Post)
    if user_id:
        stmt = stmt.filter(Post.user_id == user_id)
    if version_id:
        stmt = stmt.filter(Post.version_id == version_id)

    counted_stmt = select(func.count()).select_from(stmt.subquery())
    total_count = session.exec(counted_stmt).first() or 0
    posts = session.exec(
        stmt.order_by(desc(Post.date)).offset(offset).limit(limit)
    ).all()

    return ItemsWithTotal[Post](items=posts, total=total_count)


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
