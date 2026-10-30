#!/bin/bash
set -e

echo "Starting multi-tenant database initialization..."

# Ждем запуска MySQL
until mysqladmin ping -h localhost --silent; do
    sleep 2
done

echo "MySQL is ready. Creating clients..."

IFS=',' read -ra CLIENTS <<< "$MYSQL_CLIENTS"
IFS=',' read -ra PASSWORDS <<< "$MYSQL_CLIENT_PASSWORDS"

for i in "${!CLIENTS[@]}"; do
    CLIENT="${CLIENTS[$i]}"
    PASSWORD="${PASSWORDS[$i]}"
    
    echo "Processing client: $CLIENT"
    
    # Проверяем, существует ли уже БД
    DB_EXISTS=$(mysql -uroot -p"$MYSQL_ROOT_PASSWORD" -sN -e \
        "SELECT SCHEMA_NAME FROM information_schema.SCHEMATA 
         WHERE SCHEMA_NAME = '${CLIENT}_db';")
    
    if [ -z "$DB_EXISTS" ]; then
        echo "Creating new database for $CLIENT"
        
        mysql -uroot -p"$MYSQL_ROOT_PASSWORD" <<-EOSQL
            CREATE DATABASE \`${CLIENT}_db\`
            CHARACTER SET utf8mb4
            COLLATE utf8mb4_unicode_ci;
            
            CREATE USER '${CLIENT}_user'@'%'
            IDENTIFIED BY '${PASSWORD}';
            
            GRANT ALL PRIVILEGES ON \`${CLIENT}_db\`.*
            TO '${CLIENT}_user'@'%';
            
            FLUSH PRIVILEGES;
EOSQL
        
        # Импортируем дамп если существует
        if [ -f "/docker-entrypoint-initdb.d/dumps/${CLIENT}.sql" ]; then
            echo "Importing initial schema for $CLIENT"
            mysql -uroot -p"$MYSQL_ROOT_PASSWORD" "${CLIENT}_db" \
                < "/docker-entrypoint-initdb.d/dumps/${CLIENT}.sql"
        fi
    else
        echo "Database for $CLIENT already exists. Skipping."
    fi
done

echo "Database initialization completed!"