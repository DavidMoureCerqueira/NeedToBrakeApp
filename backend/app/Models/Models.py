from sqlmodel import Relationship, SQLModel, Field

"""
    SQLModel works as an interface for typing for custom objects and table-structure for SQL.
    ID needs to be setted as Null to avoid Pydantic to fail in case ID is not used and 
    SQL gets it as optional and after being primary key, 
    it is automatically autoincremental in case that it is not provided
"""


class Brand(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(unique=True, index=True)
    models: list["Model"] = Relationship(back_populates="brand")


class Model(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str | None = Field(index=True)
    brand_id: int = Field(foreign_key="brand.id")
    brand: "Brand" = Relationship(back_populates="models")
    versions: list["Version"] = Relationship(back_populates="model")


class Version(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str | None = Field(index=True)
    engine: float | None = Field(index=True)
    bhp: float | None = Field(index=True)
    year: str | None = Field(index=True)
    model_id: int = Field(foreign_key="model.id")
    model: "Model" = Relationship(back_populates="versions")
    discs: list["Disc"] = Relationship(back_populates="version")


class Disc(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    position: str | None = Field(default=None, index=True)
    style: str | None = Field(default=None, index=True)
    diameter: float | None = Field(default=None, index=True)
    height: float | None = Field(default=None, index=True)
    thickness: float | None = Field(default=None, index=True)
    center_bore: float | None = Field(default=None, index=True)
    pcd: float | None = Field(default=None, index=True)
    version_id: int = Field(foreign_key="version.id")
    version: "Version" = Relationship(back_populates="discs")
