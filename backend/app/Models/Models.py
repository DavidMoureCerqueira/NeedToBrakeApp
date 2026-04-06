from pydantic import BaseModel
from sqlmodel import Relationship, SQLModel, Field

"""
    SQLModel works as an interface for typing for custom objects and table-structure for SQL.
    ID needs to be setted as Null to avoid Pydantic to fail in case ID is not used and 
    SQL gets it as optional and after being primary key, 
    it is automatically autoincremental in case that it is not provided
"""

"""
    I define the Base model to avoid repeating code, to allow me to have an schema 
    to return the full data of a disc including the full car that it belongs
"""


class BrandBase(SQLModel):
    name: str = Field(unique=True, index=True)


class ModelBase(SQLModel):
    name: str | None = Field(index=True)
    brand_id: int = Field(foreign_key="brand.id")


class VersionBase(SQLModel):
    name: str | None = Field(index=True)
    engine: float | None = Field(index=True)
    bhp: float | None = Field(index=True)
    year: str | None = Field(index=True)
    model_id: int = Field(foreign_key="model.id")


class DiscBase(SQLModel):
    position: str | None = Field(default=None, index=True)
    holes: int | None = Field(default=None, index=True)
    style: str | None = Field(default=None, index=True)
    diameter: float | None = Field(default=None, index=True)
    height: float | None = Field(default=None, index=True)
    thickness: float | None = Field(default=None, index=True)
    center_bore: float | None = Field(default=None, index=True)
    pcd: float | None = Field(default=None, index=True)
    version_id: int = Field(foreign_key="version.id")


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


class BrandRead(BrandBase):
    id: int
    model_config = {"from_attributes": True}


class ModelRead(ModelBase):
    id: int
    brand: BrandRead
    model_config = {"from_attributes": True}


class VersionRead(VersionBase):
    id: int
    model: ModelRead
    model_config = {"from_attributes": True}


class DiscoReadFull(DiscBase):
    id: int
    version: VersionRead
    model_config = {"from_attributes": True}


class DiscFilters(BaseModel):
    position: str | None = None
    holes: int | None = None
    style: str | None = None
    diameter: float | None = None
    height: float | None = None
    thickness: float | None = None
    center_bore: float | None = None
    pcd: float | None = None
