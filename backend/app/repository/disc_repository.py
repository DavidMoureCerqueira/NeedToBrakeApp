from sqlmodel import Session, select

from models.table_models import Disc


def get_disc_by_id(session: Session, disc_id: int) -> Disc:
    disc = session.exec(select(Disc).filter(Disc.id == disc_id)).first()
    return disc
