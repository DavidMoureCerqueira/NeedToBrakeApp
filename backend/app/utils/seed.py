import json
from typing import Any, Dict, List
from sqlmodel import Session, select
from pathlib import Path
from models.table_models import Brand, Disc, Model, Version
from database import engine


def load_json_data():
    """This funtion is in charge of loading data from JSON into database"""
    with Session(engine) as session:
        try:
            current_file = Path(__file__).parent.resolve()
            json_file_path = (
                current_file.parent / "Data" / "catalogo_frenos_objetos.json"
            )
            if not json_file_path.exists():
                print(f"Error: El archivo NO está en {json_file_path}")
                return
            with open(json_file_path, "r") as f:
                data = json.load(f)
                inserted_count = insert_data_from_json(session, data)
                session.commit()

                print(f"{inserted_count} new registers has been saved.")
        except json.JSONDecodeError:
            session.rollback()
            print("An error has occured, JSON is not valid")
        except Exception as e:
            session.rollback()
            print(f"Something went wrong: {e}")


def get_or_create_brand(session: Session, brand_name: str) -> Brand:
    """Looks for a brand in database to avoid duplicates"""
    brand = session.exec(select(Brand).where(Brand.name == brand_name)).first()
    if brand:
        return brand
    new_brand = Brand(name=brand_name)
    session.add(new_brand)
    session.flush()
    return new_brand


def get_or_create_model(session: Session, model_name: str, brand_id: int) -> Model:
    """This function looks for a model in database to avoid duplicates"""
    model = session.exec(
        select(Model).where(Model.name == model_name, Model.brand_id == brand_id)
    ).first()
    if model:
        return model
    new_model = Model(name=model_name, brand_id=brand_id)
    session.add(new_model)
    session.flush()
    return new_model


def extract_disc_data(prefix: str, item: Dict[str, Any]) -> Dict[str, Any]:
    """This function gets an item from JSON an extract the disc data"""
    """DISC_KEYS on JSON"""
    DISC_KEYS = [
        "Style",
        "Holes",
        "Diameter",
        "Height",
        "thickness",
        "PCD",
        "center_bore",
    ]
    data = {}
    for key in DISC_KEYS:
        value = item.get(f"{prefix}_{key}")
        db_key = key.lower()

        try:
            if db_key == "style":
                data[db_key] = str(value) if value else None
            else:
                data[db_key] = float(value) if value is not None else None
        except (ValueError, TypeError):
            data[db_key] = None

    return data


def is_disc_data_valid(data: Dict[str, Any]) -> bool:
    """This funtion checks 3 or more data-values are null and verifies if it is a valid or invalid disc"""
    if not data:
        return False
    empty_data = 0
    for value in data.values():
        if not value:
            empty_data += 1
        if empty_data > 3:
            return False
    return True


def insert_data_from_json(session, data: List[Dict[str, Any]]):
    """This function recieve data and is in charge of insert it into DB, creating every single instance for every item in data"""
    if not data:
        return 0

    inserted_count = 0

    for item in data:

        try:
            brand = get_or_create_brand(session, item["Make"])
            model = get_or_create_model(session, item["Model"], brand.id)
            front_disc_data = extract_disc_data("Front", item)
            rear_disc_data = extract_disc_data("Rear", item)
            front_disc_valid = is_disc_data_valid(front_disc_data)
            rear_disc_valid = is_disc_data_valid(rear_disc_data)
            if not front_disc_valid and not rear_disc_valid:
                continue
            version = Version(
                name=item.get("SubModel"),
                engine=float(item.get("Engine") or 0),
                bhp=float(item.get("BHP") or 0),
                year=item.get("Year"),
                model_id=model.id,
            )
            session.add(version)
            session.flush()

            if front_disc_valid:
                front_disc = Disc(
                    version_id=version.id,
                    position="front",
                    **front_disc_data,
                )
                session.add(front_disc)
                session.flush()
            if rear_disc_valid:
                rear_disc = Disc(
                    version_id=version.id,
                    position="rear",
                    **rear_disc_data,
                )
                session.add(rear_disc)
                session.flush()
            inserted_count += 1
        except KeyError as e:
            print(f"Error: Key is not valid {e}")
        except Exception as e:
            print(f"Error processing {e}")

    session.commit()
    return inserted_count
