from sqlmodel import Session, select

from models.table_models import PostLike


def create_like(session: Session, post_id: int, user_id: int):
    new_like = PostLike(user_id=user_id, post_id=post_id)
    session.add(new_like)
    session.commit()
    return new_like


def delete_like(session: Session, post_id: int, user_id: int):
    stmt = select(PostLike).where(
        PostLike.post_id == post_id, PostLike.user_id == user_id
    )
    like_found = session.exec(stmt).first()
    if like_found:
        session.delete(like_found)
        session.commit()
        return True
    return False
