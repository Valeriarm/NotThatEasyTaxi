#Database Connection
FROM postgres

RUN apt-get update \
    && apt-cache showpkg postgresql-11-postgis-2.5 \
    && apt-get install -y --no-install-recommends \
        postgresql-11-postgis-2.5 \
        postgresql-11-postgis-2.5-scripts \ 
    && rm -rf /var/lib/apt/lists/*

COPY initialScript.sql /docker-entrypoint-initdb.d/ 

EXPOSE 5432