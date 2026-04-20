from sqlmodel import Session, desc, func, select
from models.models import CommentModify, ItemsWithTotal
from models.table_models import Comment
from sqlalchemy.orm import joinedload


def create_comment(session: Session, comment: Comment) -> Comment:
    session.add(comment)
    session.commit()
    session.refresh(comment)
    new_comment = session.exec(
        select(Comment)
        .where(Comment.id == comment.id)
        .options(joinedload(Comment.author))
    ).first()
    return new_comment


def modify_comment_by_id(session: Session, comment_data: CommentModify):
    comment = session.exec(
        select(Comment)
        .where(Comment.id == comment_data.comment_id)
        .options(joinedload(Comment.author))
    ).first()
    if not comment:
        return comment
    comment.content = comment_data.content
    session.commit()
    session.refresh(comment)
    return comment


def get_comment_by_id(session: Session, comment_id: int):
    comment = session.exec(select(Comment).where(Comment.id == comment_id)).first()
    return comment


def delete_comment(session: Session, comment: Comment):
    session.delete(comment)
    session.commit()


def get_latest_comment(
    session: Session,
    post_id: int = None,
    offset: int = 0,
    limit: int = 10,
) -> ItemsWithTotal:

    stmt = (
        select(Comment)
        .filter(Comment.post_id == post_id)
        .options(joinedload(Comment.author))
    )

    counted_stmt = select(func.count()).select_from(stmt.subquery())
    total_count = session.exec(counted_stmt).first() or 0
    posts = session.exec(
        stmt.order_by(desc(Comment.created_at)).offset(offset).limit(limit)
    ).all()

    return ItemsWithTotal[Comment](items=posts, total=total_count)
