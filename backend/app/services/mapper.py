from typing import List, Tuple

from models.models import Brand, Disc, DiscoReadFull, Model, Version


def transform_duple_data_to_DiscoReadFull(
    data: List[Tuple[Disc, Version, Model, Brand]],
) -> List[DiscoReadFull]:
    if not data:
        return []
    data_formatted = []

    for disc_obj, version_obj, model_obj, brand_obj in data:

        model_obj.brand = brand_obj
        version_obj.model = model_obj
        disc_obj.version = version_obj
        data_formatted.append(disc_obj)

    return data_formatted
