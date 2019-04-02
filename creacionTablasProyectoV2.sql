DROP TABLE IF EXISTS usuario CASCADE;
DROP TABLE IF EXISTS origenesFav CASCADE;
DROP TABLE IF EXISTS telefono CASCADE;
DROP TABLE IF EXISTS Conductor CASCADE;
DROP TABLE IF EXISTS Taxi CASCADE;
DROP TABLE IF EXISTS Servicio CASCADE;
DROP TABLE IF EXISTS reporte CASCADE;
DROP TABLE IF EXISTS Maneja CASCADE;
CREATE EXTENSION posgis;
CREATE EXTENSION pgcrypto;

CREATE TABLE Usuario(
telefonoUsuario VARCHAR(15) NOT NULL,
contrasenia TEXT NOT NULL,
nombreUsuario TEXT NOT NULL,
apellidoUsuario TEXT NOT NULL,
fechaNacimiento DATE NOT NULL,
email TEXT NOT NULL UNIQUE,
numTarjeta VARCHAR (30) NOT NULL,
PRIMARY KEY (telefonoUsuario)
);

CREATE TABLE OrigenesFav(
origen GEOMETRY(POINT) NOT NULL,
telefonoUsuario TEXT NOT NULL,
PRIMARY KEY (origen, username),
FOREIGN KEY (telefonoUsuario) REFERENCES Usuario(telefonoUsuario) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Conductor(
telefonoConductor VARCHAR(15) NOT NULL,
contrasenia TEXT NOT NULL,
nombreConductor TEXT NOT NULL,
apellidoConductor TEXT NOT NULL,
fechaNacimiento DATE NOT NULL,
email TEXT NOT NULL,
numCuenta VARCHAR (30) NOT NULL,
PRIMARY KEY (telefonoConductor)
);

CREATE TABLE Taxi(
placa VARCHAR(6) NOT NULL,
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

CREATE TABLE Maneja(
taxi VARCHAR(6) NOT NULL,
conductor VARCHAR(30) NOT NULL,
PRIMARY KEY (taxi, conductor),
FOREIGN KEY (taxi) REFERENCES Taxi(placa) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (conductor) REFERENCES Conductor(telefonoConductor) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Reporte(
idReporte SERIAL NOT NULL,
taxi VARCHAR(6) NOT NULL,
horaActual TIMESTAMP NOT NULL,
coordenada GEOMETRY(POINT) NOT NULL,
PRIMARY KEY (idReporte),
FOREIGN KEY (taxi) REFERENCES Taxi(placa) ON DELETE CASCADE ON UPDATE CASCADE
);


INSERT INTO conductor VALUES ('1234', 'Marthox', '1234', 'Mateo', 'Gregory','1999/07/02', 'magremenez@gmail.com', '123454312');
INSERT INTO usuario VALUES ('1234', 'Marthox', '1234', 'Mateo', 'Gregory','1999/07/02', 'magremenez@gmail.com', '123454312');
INSERT INTO conductor VALUES ('12345', 'Valeriarm', '1234', 'Valeria', 'Rivera','1998/11/19', 'valeriarm@gmail.com', '123454312');
INSERT INTO usuario VALUES ('12345', 'Valeriarm', '1234', 'Valeria', 'Rivera','1998/11/19', 'valeriarm@gmail.com', '123454312');
SELECT * FROM usuario;