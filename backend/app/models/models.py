from datetime import datetime, timezone
from typing import TYPE_CHECKING, Generic, List, Optional, TypeVar

from pydantic import BaseModel, EmailStr
from sqlmodel import Relationship, SQLModel, Field

if TYPE_CHECKING:
    from models.table_models import Post

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


class PostBase(SQLModel):
    title: str = Field()
    content: str = Field()
    date: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc), index=True
    )
    user_id: int | None = Field(
        default=None, index=True, foreign_key="user.id", ondelete="SET NULL"
    )
    version_id: int | None = Field(
        foreign_key="version.id", index=True, ondelete="CASCADE"
    )


class PostCreate(BaseModel):
    title: str
    content: str
    version_id: int | None = None


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


class RegisterData(BaseModel):
    email: EmailStr
    password: str
    user_name: str


class SignInData(BaseModel):
    email: EmailStr
    password: str


T = TypeVar("T")


class ModelResp(BaseModel, Generic[T]):
    success: bool = None
    data: Optional[T] = None
    error: Optional[str] = None


class UserSecure(BaseModel):
    id: int
    email: EmailStr
    user_name: str
    is_admin: bool


class ValidationModelResponse(BaseModel):
    user: UserSecure
    token: str


T = TypeVar("T")


class ItemsWithTotal(BaseModel, Generic[T]):
    items: List[T] = []
    total: int = 0


class PostPaginationResponse(ItemsWithTotal):
    pages: int = 0
    page: int = 1
    has_next: bool = False
