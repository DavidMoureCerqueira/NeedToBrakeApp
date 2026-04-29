test:
	docker-compose exec backend bash -c "PYTHONPATH=/code/app pytest /code/app/test"

freeze:
	pip freeze > backend/requirements.txt

up:
	docker-compose up -d

down:
	docker-compose down

test-cov:
	docker-compose exec backend bash -c "PYTHONPATH=/code/app pytest --cov=app --cov-report=term-missing /code/app/test"