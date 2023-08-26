#!/bin/bash

DB_NAME="Pi-Cloud"

DB_USERNAME="pi_cloud"
DB_PASSWORD="pi_cloud"
DB_HOST="localhost"
DB_PORT="5432"

user_exist=$(psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='$DB_USERNAME'")

echo "Retour du select username : $userexist"

if [ -z "$user_exist"]; then
    # User doesn't exist, create it
    psql -c "CREATE USER $DB_USERNAME WITH ENCRYPTED PASSWORD '$DB_PASSWORD';"
    echo "Création de l'utilisateur $DB_USERNAME";
fi
user_exist=$(psql -tAc "SELECT * FROM pg_roles")

echo "Retour du select username : $user_exist"

echo "Execution de la ligne qui query les db name"
database_exist=$(psql -lqt | cut -d \| -f 1 | grep -qw $DB_NAME)

echo "Retour du select DB : $database_exist"

if [ -z "$database_exist" ]; then
    # Database doesn't exist, create it
    echo "On tente le createdb";
    createdb $DB_NAME -O $DB_USERNAME
    echo "Database $DB_NAME created."
fi
