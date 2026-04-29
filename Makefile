test:
	docker-compose exec backend bash -c "PYTHONPATH=/code/app pytest /code/app/test"

freeze:
	pip freeze > backend/requirements.txt

up:
	docker-compose up
detached:
	docker-compose up -d

down:
	docker-compose down

test-cov:
	docker-compose exec backend bash -c "PYTHONPATH=/code/app pytest --cov=app --cov-report=term-missing /code/app/test"

DOCKER_BE = docker compose exec backend
# Generar una nueva migración (ej: make migrate-gen m="mensaje")
migrate-gen:
	$(DOCKER_BE) sh -c "cd app && alembic revision --autogenerate -m '$(m)'"# Para aplicar: make migrate-up
migrate-up:
	$(DOCKER_BE) sh -c "cd app && alembic upgrade head"