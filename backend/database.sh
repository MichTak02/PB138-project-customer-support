# changed ports from 5555:5432
docker run --detach -p 5556:5432 --name pb138-project-database -e POSTGRES_PASSWORD=password -e POSTGRES_USER=user -e POSTGRES_DB=database postgres:latest

# podman version - use this version if you use podman
# podman run --detach --port 5555:5432 --name pb138-iteration-03-database -e POSTGRES_PASSWORD=password -e POSTGRES_USER=user -e POSTGRES_DB=database docker.io/postgres:latest
