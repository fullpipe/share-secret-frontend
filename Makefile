build:
	docker build --target release -t fullpipe/share-secret-frontend .

push:
	docker push fullpipe/share-secret-frontend:latest
