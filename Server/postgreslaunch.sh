#!/bin/bash
docker rm postgres
#docker volume prune 
docker run --name postgres --env POSTGRES_PASSWORD="postgrestest" --mount type=bind,source=./databases/initialisation/postgreSQL/,destination=/docker-entrypoint-initdb.d/,ro -p 5432:5432 postgres:15.4