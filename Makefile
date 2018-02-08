ash-running:
	docker-compose exec web /bin/ash

ash:
	docker run -v "$(shell pwd):/app" -it hackwebsite20_web /bin/ash

up:
	docker-compose up

down:
	docker-compose down

build:
	docker-compose build