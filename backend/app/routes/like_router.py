from fastapi import APIRouter, Depends

from services.like_service import add_like, remove_like
from database import SessionDep
from services.auth_service import get_authorization
from models.models import ModelResp

router = APIRouter()


@router.post("/{post_id}/like", response_model=ModelResp[str], tags=["Gives like to a post"])
def like_post(
    session: SessionDep, post_id: int, user_id: int = Depends(get_authorization)
):
    return add_like(session=session, post_id=post_id, user_id=user_id)

@router.delete("/{post_id}/unlike", response_model=ModelResp[str], tags=["Remove like from a post"])
def unlike_post(session:SessionDep, post_id:int,user_id:int=Depends(get_authorization)):
    return remove_like(session=session, post_id=post_id, user_id=user_id)