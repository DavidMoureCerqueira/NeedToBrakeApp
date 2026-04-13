from pydantic import EmailStr
from sqlmodel import Relationship, SQLModel, Field

from bcrypt import hashpw, checkpw, gensalt
from models.models import BrandBase, ModelBase, VersionBase, DiscBase


class Brand(BrandBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    models: list["Model"] = Relationship(back_populates="brand")


class Model(ModelBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    brand: "Brand" = Relationship(back_populates="models")
    versions: list["Version"] = Relationship(back_populates="model")


class Version(VersionBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    model: "Model" = Relationship(back_populates="versions")
    discs: list["Disc"] = Relationship(back_populates="version")


class Disc(DiscBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    version: "Version" = Relationship(back_populates="discs")


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    email: EmailStr = Field(unique=True, index=True, nullable=False)
    hashed_password: str = Field(nullable=False)
    username: str = Field(unique=True, index=True, nullable=False)
    is_admin: bool = Field(default=False)
    is_active: bool = Field(default=True)

    @staticmethod
    def hashPassword(password: str):
        byte_pw = password.encode("utf-8")
        byte_hash_pw = hashpw(password=byte_pw, salt=gensalt())
        return byte_hash_pw.decode("utf-8")

    def checkPassword(self, password: str):
        byte_pw = password.encode("utf-8")
        byte_hash_pw = self.hashed_password.encode("utf-8")
        return checkpw(hashed_password=byte_hash_pw, password=byte_pw)
