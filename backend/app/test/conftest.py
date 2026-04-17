import pytest
from fastapi.testclient import TestClient
from main import app


@pytest.fixture(scope="module")
def client():
    """
    Fixture que proporciona un cliente de pruebas para FastAPI.
    El scope='module' hace que el cliente se cree una vez por archivo de test,
    lo cual es más eficiente.
    """
    with TestClient(app) as c:
        yield c
