from pydantic import BaseModel, Field
from typing import Optional

class FabricanteSimpleRead(BaseModel):
    id: int
    makerName: str = Field(validation_alias='nombre',
                           serialization_alias='makerName')

    class Config:
        from_attributes = True


class ModelosReadSimple(BaseModel):
    id: int
    modelName: str = Field(validation_alias='nombre',
                           serialization_alias='modelName')

    class Config:
        from_attributes = True


class DiscoFrenoBase(BaseModel):
    id: int
    eje: Optional[str] = None       # 'Front' o 'Rear'
    style: Optional[str] = None
    holes: Optional[float] = None
    diameter: Optional[float] = None
    height: Optional[float] = None
    thickness_new: Optional[float] = None
    thickness_min: Optional[float] = None
    pcd: Optional[float] = None
    centerbore: Optional[float] = None

class VersionVehiculoBase(BaseModel):
    id: int
    engine: float
    bhp: float
    year: str
    submodelo: Optional[str] = None

# Schema READ: Devuelve la versión, su ID y los discos asociados

# ----------------------------------------------------


class CarModelVersionRead(BaseModel):
    maker_name: Optional[str] = Field(..., serialization_alias='make',
                                      description="Nombre del Fabricante.")
    model_name: Optional[str] = Field(..., serialization_alias='model',
                                      description="Nombre del Modelo.")

    version_id: int = Field(...,
                            description="ID interno de la Versión del vehículo.")
    version_details: Optional[str] = Field(
        ..., serialization_alias='versionDetails', description="Detalle del Motor, CV y Año.")


class DiscoFullDetailRead(BaseModel):
    """
    Esquema final para la respuesta consolidada de discos de freno, 
    incluyendo el contexto del vehículo y la información de ambos ejes.

    """
    # --- 1. CONTEXTO DEL VEHÍCULO (De Fabricante, Modelo, Versión) ---

    maker_name: Optional[str] = Field(..., serialization_alias='make',
                                      description="Nombre del Fabricante.")
    model_name: Optional[str] = Field(..., serialization_alias='model',
                                      description="Nombre del Modelo.")

    version_id: int = Field(...,
                            description="ID interno de la Versión del vehículo.")
    version_details: Optional[str] = Field(
        ..., serialization_alias='versionDetails', description="Detalle del Motor, CV y Año.")

    # --- 2. DATOS COMPARTIDOS (Se toman de un eje si el otro es None) ---
    # Estos campos son los consolidados en el servicio (consolidated_pcd, etc.)

    # PCD y Centerbore suelen ser iguales en ambos ejes, pero los devolvemos por separado para que
    # el cliente sepa qué eje tiene qué valor, aunque internamente vengan del mismo campo consolidado.

    # --- 3. DATOS DELANTEROS (Front) ---

    # Campos que pueden ser nulos (Optional)

    front_style: Optional[str] = Field(
        None, serialization_alias='frontRotorStyle')
    front_holes: Optional[int] = Field(
        None, serialization_alias='frontRotorHoles')
    front_diameter: Optional[float] = Field(
        None, serialization_alias='frontRotorDiameter')
    front_height: Optional[float] = Field(
        None, serialization_alias='frontRotorHeight')
    front_thickness_new: Optional[float] = Field(
        None, serialization_alias='frontRotorThicknessNew')
    front_thickness_min: Optional[float] = Field(
        None, serialization_alias='frontRotorThicknessMin')

    front_pcd: Optional[float] = Field(None, serialization_alias='frontPCD')
    front_centerbore: Optional[float] = Field(
        None, serialization_alias='frontCenterbore')

    # --- 4. DATOS TRASEROS (Rear) ---

    rear_style: Optional[str] = Field(
        None, serialization_alias='rearRotorStyle')
    rear_holes: Optional[int] = Field(
        None, serialization_alias='rearRotorHoles')
    rear_diameter: Optional[float] = Field(
        None, serialization_alias='rearRotorDiameter')
    rear_height: Optional[float] = Field(
        None, serialization_alias='rearRotorHeight')
    rear_thickness_new: Optional[float] = Field(
        None, serialization_alias='rearRotorThicknessNew')
    rear_thickness_min: Optional[float] = Field(
        None, serialization_alias='rearRotorThicknessMin')

    rear_pcd: Optional[float] = Field(None, serialization_alias='rearPCD')
    rear_centerbore: Optional[float] = Field(
        None, serialization_alias='rearCenterbore')

    class Config:
        from_attributes = True
        populate_by_name = True  # Permite usar los alias de serialización


class DiscAxleRead(BaseModel):
    axle: str = Field(..., serialization_alias='RotorAxle')
    style: Optional[str] = Field(
        None, serialization_alias='RotorStyle')
    holes: Optional[int] = Field(
        None, serialization_alias='RotorHoles')
    diameter: Optional[float] = Field(
        None, serialization_alias='RotorDiameter')
    height: Optional[float] = Field(
        None, serialization_alias='RotorHeight')
    thicknessNew: Optional[float] = Field(
        None, serialization_alias='RotorThicknessNew')
    thicknessMin: Optional[float] = Field(
        None, serialization_alias='RotorThicknessMin')

    pcd: Optional[float] = Field(None, serialization_alias='PCD')

    centerbore: Optional[float] = Field(
        None, serialization_alias='Centerbore')


class CarModelVersionRead(BaseModel):
    maker_name: Optional[str] = Field(None, serialization_alias='make')
    model_name: Optional[str] = Field(None, serialization_alias='model')

    version_id: int = Field(...)
    version_details: Optional[str] = Field(None, serialization_alias='versionDetails')


class AxleInfo(BaseModel):
    """Combinacion de los datos del coche y del eje """
    car:  CarModelVersionRead
    disc: DiscAxleRead

    class Config:
        from_attributes = True
