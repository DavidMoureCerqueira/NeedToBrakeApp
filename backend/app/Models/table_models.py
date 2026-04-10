from sqlmodel import Relationship, SQLModel, Field

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
