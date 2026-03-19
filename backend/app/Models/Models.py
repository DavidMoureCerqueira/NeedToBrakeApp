from sqlmodel import Relationship, SQLModel, Field

"""
#   Ya SQLModel hace la función de "interfaz" de tipado para objetos personalizados, y de estructura de tabla para SQL,
    se coloca el id como nulo, para evitar que Pydantic falle en caso de no recibirlo en algún momento.
    De nuevo el id como "opcional" hace que SQL entienda que es autoincremental y que no haga falta referenciarlo

"""


class Brand(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(unique=True, index=True)
    models: list["Model"] = Relationship(back_populates="brand")


class Model(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True, auto_increment=True)
    name: str | None = Field(index=True)
    brand_id: int = Field(foreign_key="brand.id")
    brand: "Brand" = Relationship(back_populates="models")
    versions: list["Version"] = Relationship(back_populates="model")


class Version(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True, auto_increment=True)
    name: str | None = Field(index=True)
    engine: float | None = Field(index=True)
    bhp: float | None = Field(index=True)
    year: str | None = Field(index=True)
    model_id: int = Field(foreign_key="model.id")
    model: "Model" = Relationship(back_populates="versions")
    discs: list["Disc"] = Relationship(back_populates="version")


class Disc(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True, auto_increment=True)
    position: str | None = Field(default=None, index=True)
    style: str | None = Field(default=None, index=True)
    diameter: float | None = Field(default=None, index=True)
    height: float | None = Field(default=None, index=True)
    thickness: float | None = Field(default=None, index=True)
    center_bore: float | None = Field(default=None, index=True)
    pcd: float | None = Field(default=None, index=True)
    version_id: int = Field(foreign_key="version.id")
    version: "Version" = Relationship(back_populates="discs")
