from exceptions import (
    BrandsNotFoundException,
    ModelsNotFoundException,
    VersionsNotFoundException,
)


def test_get_brands_router_success(client, mocker):

    mock_brands = [{"id": 1, "name": "Ferrari"}, {"id": 2, "name": "Lamborghini"}]

    mocker.patch("routes.cascade_router.get_brands_from_db", return_value=mock_brands)

    response = client.get("cascade/brands")

    assert response.status_code == 200
    assert response.json() == mock_brands
    assert len(response.json()) == len(mock_brands)


def test_get_brands_router_not_found(client, mocker):

    mocker.patch(
        "routes.cascade_router.get_brands_from_db",
        side_effect=BrandsNotFoundException(),
    )
    response = client.get("cascade/brands")
    assert response.status_code == 404
    assert response.json()["error"] == BrandsNotFoundException().message


def test_get_models_router_by_brand_id_succes(client, mocker):
    mock_models = [
        {"id": 10, "name": "488 Pista", "brand_id": 1},
        {"id": 11, "name": "F8 Tributo", "brand_id": 1},
    ]
    mocker.patch("routes.cascade_router.get_models_from_db", return_value=mock_models)
    response = client.get("cascade/models/1")
    assert response.status_code == 200
    assert len(response.json()) == 2
    assert response.json()[0]["name"] == mock_models[0]["name"]


def test_get_models_router_by_brand_id_not_found(client, mocker):
    mocker.patch(
        "routes.cascade_router.get_models_from_db",
        side_effect=ModelsNotFoundException(),
    )
    response = client.get("cascade/models/1")
    assert response.status_code == 404
    assert response.json()["error"] == ModelsNotFoundException().message


def test_get_version_router_by_model_id_succes(client, mocker):
    mock_versions = [
        {
            "id": 100,
            "name": "V8 Turbo",
            "engine": 3.9,
            "bhp": 670.0,
            "year": "2015",
            "model_id": 10,
        }
    ]
    mocker.patch(
        "routes.cascade_router.get_versions_from_db", return_value=mock_versions
    )
    response = client.get("cascade/versions/10")
    assert response.status_code == 200
    assert len(response.json()) == len(mock_versions)
    assert response.json()[0]["name"] == mock_versions[0]["name"]
    assert response.json()[0]["bhp"] == mock_versions[0]["bhp"]
    assert response.json()[0]["engine"] == mock_versions[0]["engine"]


def test_get_version_router_by_model_id_not_found(client, mocker):
    mocker.patch(
        "routes.cascade_router.get_versions_from_db",
        side_effect=VersionsNotFoundException(),
    )
    response = client.get("cascade/versions/10")
    assert response.status_code == 404
    assert response.json()["success"] is False
    assert response.json()["error"] == VersionsNotFoundException().message
