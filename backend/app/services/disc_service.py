from sqlmodel import Session

from repository.disc_repository import get_disc_by_id
from models.models import Disc


def get_disc_from_db(session: Session, disc_id: int) -> Disc:
    disc = get_disc_by_id(session=session, disc_id=disc_id)
    if disc:
        return disc
    return {}
