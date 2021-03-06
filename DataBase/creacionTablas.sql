DROP TABLE IF EXISTS usuario CASCADE;
DROP TABLE IF EXISTS origenesFav CASCADE;
DROP TABLE IF EXISTS telefono CASCADE;
DROP TABLE IF EXISTS conductor CASCADE;
DROP TABLE IF EXISTS taxi CASCADE;
DROP TABLE IF EXISTS servicio CASCADE;
DROP TABLE IF EXISTS reporte CASCADE;
DROP TABLE IF EXISTS maneja CASCADE;
DROP TABLE IF EXISTS solicitud CASCADE;
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE usuario(
telefonousuario VARCHAR(15) NOT NULL,
contrasenia TEXT NOT NULL,
nombreusuario TEXT NOT NULL,
apellidousuario TEXT NOT NULL,
fechanacimiento DATE NOT NULL,
email TEXT NOT NULL,
numtarjeta VARCHAR (30) NOT NULL,
PRIMARY KEY (telefonousuario)
);

CREATE TABLE origenesfav(
nombre TEXT NOT NULL,
telefonousuario VARCHAR(15) NOT NULL,
origen GEOMETRY(POINT) NOT NULL,
PRIMARY KEY (origen, telefonousuario, nombre),
FOREIGN KEY (telefonousuario) REFERENCES Usuario(telefonousuario) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE conductor(
telefonoconductor VARCHAR(15) NOT NULL,
contrasenia TEXT NOT NULL,
nombreconductor TEXT NOT NULL,
apellidoconductor TEXT NOT NULL,
fechanacimiento DATE NOT NULL,
email TEXT NOT NULL,
numcuenta VARCHAR (30) NOT NULL,
PRIMARY KEY (telefonoconductor)
);

CREATE TABLE taxi(
placa VARCHAR(6) NOT NULL,
contrasenia TEXT NOT NULL,
marca TEXT NOT NULL,
modelo TEXT NOT NULL,
anio INTEGER NOT NULL,
baul TEXT NOT NULL,
soat DATE NOT NULL,
ocupado BOOLEAN NOT NULL,
PRIMARY KEY (placa)
);

CREATE TABLE servicio(
idservicio SERIAL NOT NULL,
usuario VARCHAR(15) NOT NULL,
conductor VARCHAR(15) NOT NULL,
taxi VARCHAR(6) NOT NULL,
calificacionusuario INTEGER,
calificacionconductor INTEGER,
puntopartida GEOMETRY(POINT) NOT NULL,
puntollegada GEOMETRY(POINT) NOT NULL,
horainicio TIMESTAMP NOT NULL,
horafin TIMESTAMP,
usuario_pago BOOLEAN NOT NULL,
conductor_pago BOOLEAN NOT NULL,
terminado BOOLEAN NOT NULL,
PRIMARY KEY (idservicio),
FOREIGN KEY (usuario) REFERENCES usuario(telefonousuario) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (conductor) REFERENCES Conductor(telefonoconductor) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (taxi) REFERENCES taxi(placa) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE solicitud(
idsolicitud SERIAL NOT NULL,
usuario VARCHAR(15) NOT NULL,
posicionusuario GEOMETRY(POINT) NOT NULL,
posicionfinal GEOMETRY(POINT) NOT NULL,
taxi VARCHAR(6) NOT NULL,
conductor VARCHAR(15) NOT NULL,
activa BOOLEAN NOT NULL,
PRIMARY KEY (idsolicitud),
FOREIGN KEY (usuario) REFERENCES Usuario(telefonousuario) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (taxi) REFERENCES taxi(placa) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE maneja(
taxi VARCHAR(6) NOT NULL,
conductor VARCHAR(15) NOT NULL,
chosen BOOLEAN NOT NULL,
PRIMARY KEY (taxi, conductor),
FOREIGN KEY (taxi) REFERENCES taxi(placa) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (conductor) REFERENCES conductor(telefonoconductor) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE reporte(
idreporte SERIAL NOT NULL,
taxi VARCHAR(6) NOT NULL,
horaactual TIMESTAMP NOT NULL,
coordenada GEOMETRY(POINT) NOT NULL,
PRIMARY KEY (idreporte),
FOREIGN KEY (taxi) REFERENCES taxi(placa) ON DELETE CASCADE ON UPDATE CASCADE
);