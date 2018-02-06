ash:
	docker exec -it $(shell docker ps | grep "hackwebsite20_web" | tr -s ' ' | cut -d' ' -f1) /bin/ash

up:
	docker-compose up

down:
	docker-compose down

build:
	docker-compose build