from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship, Mapped
from app.database import Base # Importamos la Base declarativa

# ----------------------------------------------------
# 1. Fabricante (ABARTH, FIAT, etc.)
# ----------------------------------------------------
class Fabricante(Base):
    __tablename__ = "fabricantes"
    id: Mapped[int] = Column(Integer, primary_key=True, index=True)
    nombre: Mapped[str] = Column(String(50), unique=True, index=True)

    # Relación: Un Fabricante tiene muchos Modelos
    modelos = relationship("Modelo", back_populates="fabricante")

# ----------------------------------------------------
# 2. Modelo (124 Spider, Punto, etc.)
# ----------------------------------------------------
class Modelo(Base):
    __tablename__ = "modelos"
    id: Mapped[int] = Column(Integer, primary_key=True, index=True)
    fabricante_id: Mapped[int] = Column(Integer, ForeignKey("fabricantes.id"))
    nombre: Mapped[str] = Column(String(50), index=True)
    
    # Relaciones
    fabricante = relationship("Fabricante", back_populates="modelos")
    versiones = relationship("VersionVehiculo", back_populates="modelo")

# ----------------------------------------------------
# 3. Versión del Vehículo (Motor, BHP, Año)
# ----------------------------------------------------
class VersionVehiculo(Base):
    __tablename__ = "versiones_vehiculos"
    id: Mapped[int] = Column(Integer, primary_key=True, index=True)
    modelo_id: Mapped[int] = Column(Integer, ForeignKey("modelos.id"))
    
    # Datos de Identificación (del JSON original)
    engine: Mapped[float] = Column(Float) # 1.4
    bhp: Mapped[float] = Column(Float, nullable=True)    # 170.0
    year: Mapped[str] = Column(String(20), nullable=True) # "2016-2019"
    submodelo: Mapped[str] = Column(String, nullable=True) 

    # Relaciones
    modelo = relationship("Modelo", back_populates="versiones")
    discos = relationship("DiscoFreno", back_populates="version_vehiculo")

# ----------------------------------------------------
# 4. Disco de Freno (Especificaciones)
# ----------------------------------------------------
class DiscoFreno(Base):
    __tablename__ = "discos_freno"
    id: Mapped[int] = Column(Integer, primary_key=True, index=True)
    version_id: Mapped[int] = Column(Integer, ForeignKey("versiones_vehiculos.id"))
    eje: Mapped[str] = Column(String(10)) # 'Front' o 'Rear'

    # Especificaciones del Disco (del JSON original)
    style: Mapped[str] = Column(String(20))          # "Vented" / "Solid"
    holes: Mapped[int] = Column(Float, nullable=True)             # 4
    diameter: Mapped[int] = Column(Float, nullable=True)          # 280
    height: Mapped[float] = Column(Float, nullable=True)            # 44.0
    thickness_new: Mapped[float] = Column(Float, nullable=True)     # 22.0
    thickness_min: Mapped[float] = Column(Float, nullable=True)     # 20.0
    pcd: Mapped[float] = Column(Float, nullable=True)
    centerbore:Mapped[float]=Column(Float, nullable=True)
    
    # Relación
    version_vehiculo = relationship("VersionVehiculo", back_populates="discos")