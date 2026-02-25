from fastapi import FastAPI
from app.routers import admin_router, cascade_router, disc_model_router, disc_property_router
from fastapi.middleware.cors import CORSMiddleware


from dotenv import load_dotenv
load_dotenv() 

# Importaciones de tus archivos
from app.database import init_db




# -----------------
# 1. Inicialización
# -----------------
app = FastAPI(title="Comparador NTB")
app.include_router(disc_model_router.router)
app.include_router(cascade_router.router)
app.include_router(admin_router.router)
app.include_router(disc_property_router.router)
# CAMBAIR ORIGINS Y PONER VERSION DE PRODUCCION
# if settings.ENVIRONMENT == "production":
#     # En producción, solo permite el dominio hosteado
#     origins = [
#         settings.FRONTEND_URL
#     ]
# else:
#     # En desarrollo, permite localhost para Angular y cualquier otro origen
#     # que uses en tu máquina.
#     origins = [
#         "http://localhost",
#         "http://localhost:8000",
#         "http://localhost:4200", # Típico puerto de Angular
#         "*" # Dejas el wildcard o lo quitas si usas los anteriores explícitos
#     ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"]
    )
# ---------------------------------------------
# 2. Evento de Arranque: Crea las Tablas
# ---------------------------------------------
@app.on_event("startup")
async def startup_event():
    print("Iniciando conexión a la base de datos...")
    await init_db()
    print("Conexión exitosa y tablas listas.")



