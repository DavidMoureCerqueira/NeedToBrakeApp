from logging.config import fileConfig
import os

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context
from sqlmodel import SQLModel
from models.table_models import Brand, Model, Version, Disc


config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

print(f"Tablas detectadas en metadata: {SQLModel.metadata.tables.keys()}")
target_metadata = SQLModel.metadata


def run_migrations_offline() -> None:

    url = os.getenv("DATABASE_URL")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:

    url = os.getenv("DATABASE_URL")
    if not url:
        raise RuntimeError("DATABASE_URL NOT FOUND, CHECK ENV")
    configuration = config.get_section(config.config_ini_section, {})
    configuration["sqlalchemy.url"] = url

    connectable = engine_from_config(
        configuration,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
