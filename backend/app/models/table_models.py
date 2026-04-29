from datetime import datetime, timezone
from typing import List, Optional

from pydantic import EmailStr
from sqlmodel import Relationship, SQLModel, Field

from bcrypt import hashpw, checkpw, gensalt
from models.models import BrandBase, ModelBase, PostBase, VersionBase, DiscBase


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
    posts: list["Post"] = Relationship(back_populates="version")
    in_garages: list["UserVersionGarage"] = Relationship(back_populates="version")


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
    posts: List["Post"] = Relationship(back_populates="author")
    garage_cars: List["UserVersionGarage"] = Relationship(back_populates="user")
    comments: List["Comment"] = Relationship(back_populates="author")

    @staticmethod
    def hashPassword(password: str):
        byte_pw = password.encode("utf-8")
        byte_hash_pw = hashpw(password=byte_pw, salt=gensalt())
        return byte_hash_pw.decode("utf-8")

    def checkPassword(self, password: str):
        byte_pw = password.encode("utf-8")
        byte_hash_pw = self.hashed_password.encode("utf-8")
        return checkpw(hashed_password=byte_hash_pw, password=byte_pw)


class Post(PostBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    author: Optional["User"] = Relationship(back_populates="posts")
    version: Optional["Version"] = Relationship(
        back_populates="posts", sa_relationship_kwargs={"passive_deletes": True}
    )
    comments: List["Comment"] = Relationship(
        back_populates="post", sa_relationship_kwargs={"cascade": "all, delete-orphan"}
    )


class UserVersionGarage(SQLModel, table=True):
    user_id: int = Field(foreign_key="user.id", primary_key=True)
    version_id: int = Field(foreign_key="version.id", primary_key=True)
    is_favourite: bool = Field(default=False)

    user: "User" = Relationship(back_populates="garage_cars")
    version: "Version" = Relationship(back_populates="in_garages")


class Comment(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    content: str = Field(min_length=1, max_length=750)
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc), index=True
    )
    user_id: int = Field(
        default=None, foreign_key="user.id", ondelete="SET NULL", nullable=True
    )
    post_id: int = Field(foreign_key="post.id", ondelete="CASCADE")

    author: "User" = Relationship(back_populates="comments")
    post: "Post" = Relationship(back_populates="comments")
