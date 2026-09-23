FROM mysql:8.0

# Копируем скрипты инициализации
COPY scripts/ /docker-entrypoint-initdb.d/
RUN chmod -R 755 /docker-entrypoint-initdb.d/

# Настройки для ускорения инициализации
ENV MYSQL_ROOT_PASSWORD=root_temp_password
ENV MYSQL_INITDB_SKIP_TZINFO=1

CMD ["sh", "./docker-entrypoint-initdb.d/init.sh"]