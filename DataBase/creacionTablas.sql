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
telefonoUsuario VARCHAR(15) NOT NULL,
contrasenia TEXT NOT NULL,
nombreUsuario TEXT NOT NULL,
apellidoUsuario TEXT NOT NULL,
fechaNacimiento DATE NOT NULL,
email TEXT NOT NULL,
numTarjeta VARCHAR (30) NOT NULL,
PRIMARY KEY (telefonoUsuario)
);

CREATE TABLE origenesfav(
origen GEOMETRY(POINT) NOT NULL,
telefonoUsuario TEXT NOT NULL,
PRIMARY KEY (origen, telefonoUsuario),
FOREIGN KEY (telefonoUsuario) REFERENCES Usuario(telefonoUsuario) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE conductor(
telefonoConductor VARCHAR(15) NOT NULL,
contrasenia TEXT NOT NULL,
nombreConductor TEXT NOT NULL,
apellidoConductor TEXT NOT NULL,
fechaNacimiento DATE NOT NULL,
email TEXT NOT NULL,
numCuenta VARCHAR (30) NOT NULL,
PRIMARY KEY (telefonoConductor)
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
idServicio SERIAL NOT NULL,
usuario TEXT NOT NULL,
conductor TEXT NOT NULL,
taxi VARCHAR(6) NOT NULL,
calificacionUsuario INTEGER,
calificacionConductor INTEGER,
puntoPartida GEOMETRY(POINT) NOT NULL,
puntoLlegada GEOMETRY(POINT) NOT NULL,
horaInicio TIMESTAMP NOT NULL,
horaFin TIMESTAMP NOT NULL,
usuario_pago BOOLEAN NOT NULL,
conductor_pago BOOLEAN NOT NULL,
PRIMARY KEY (idServicio),
FOREIGN KEY (usuario) REFERENCES Usuario(telefonoUsuario) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (conductor) REFERENCES Conductor(telefonoConductor) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (taxi) REFERENCES Taxi(placa) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE solicitud(
idsolicitud SERIAL NOT NULL,
usuario TEXT NOT NULL,
posicionUsuario GEOMETRY(POINT) NOT NULL,
taxi VARCHAR(6) NOT NULL,
activa BOOLEAN NOT NULL,
PRIMARY KEY (idsolicitud),
FOREIGN KEY (usuario) REFERENCES Usuario(telefonoUsuario) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (taxi) REFERENCES Taxi(placa) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE maneja(
taxi VARCHAR(6) NOT NULL,
conductor VARCHAR(30) NOT NULL,
chosen BOOLEAN NOT NULL,
PRIMARY KEY (taxi, conductor),
FOREIGN KEY (taxi) REFERENCES Taxi(placa) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (conductor) REFERENCES Conductor(telefonoConductor) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE reporte(
idReporte SERIAL NOT NULL,
taxi VARCHAR(6) NOT NULL,
horaActual TIMESTAMP NOT NULL,
coordenada GEOMETRY(POINT) NOT NULL,
PRIMARY KEY (idReporte),
FOREIGN KEY (taxi) REFERENCES Taxi(placa) ON DELETE CASCADE ON UPDATE CASCADE
);