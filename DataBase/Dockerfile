#Database Connection
FROM postgres

#RUN 

ADD creacionTablasProyectoV2.sql /docker-entrypoint-initdb.d/script.sql

RUN chmod -R 775 /docker-entrypoint-initdb.d