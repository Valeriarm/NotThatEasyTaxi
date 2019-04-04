DROP TABLE IF EXISTS usuario CASCADE;
DROP TABLE IF EXISTS origenesFav CASCADE;
DROP TABLE IF EXISTS telefono CASCADE;
DROP TABLE IF EXISTS Conductor CASCADE;
DROP TABLE IF EXISTS Taxi CASCADE;
DROP TABLE IF EXISTS Servicio CASCADE;
DROP TABLE IF EXISTS reporte CASCADE;
DROP TABLE IF EXISTS Maneja CASCADE;
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE Usuario(
telefonoUsuario VARCHAR(15) NOT NULL,
contrasenia TEXT NOT NULL,
nombreUsuario TEXT NOT NULL,
apellidoUsuario TEXT NOT NULL,
fechaNacimiento DATE NOT NULL,
email TEXT NOT NULL,
numTarjeta VARCHAR (30) NOT NULL,
PRIMARY KEY (telefonoUsuario)
);

CREATE TABLE OrigenesFav(
origen GEOMETRY(POINT) NOT NULL,
telefonoUsuario TEXT NOT NULL,
PRIMARY KEY (origen, telefonoUsuario),
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

CREATE TABLE solicitud(
idsolicitud SERIAL NOT NULL,
usuario TEXT NOT NULL,
posicionUsuario GEOMETRY(POINT) NOT NULL,
taxi VARCHAR(6) NOT NULL,
PRIMARY KEY (idsolicitud),
FOREIGN KEY (usuario) REFERENCES Usuario(telefonoUsuario) ON DELETE CASCADE ON UPDATE CASCADE,
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

/*LogIn Usuario*/
CREATE OR REPLACE FUNCTION validarUsuario(VARCHAR(15), Text) RETURNS Text AS $$
DECLARE
	phone ALIAS FOR $1;
	psword ALIAS FOR $2;
BEGIN
	IF NOT EXISTS (SELECT * FROM usuario WHERE telefonoUsuario=phone)
	THEN RETURN 'Telefono incorrecto';
	END IF;
	IF NOT EXISTS (SELECT * FROM usuario WHERE telefonoUsuario=phone AND contrasenia=psword)
	THEN RETURN 'Contraseña incorrecta';
	END IF;
RETURN phone;
END;
$$
LANGUAGE plpgsql;
/*LogIn Conductor*/
CREATE OR REPLACE FUNCTION validarConductor(VARCHAR(15), Text) RETURNS Text AS $$
DECLARE
	phone ALIAS FOR $1;
	psword ALIAS FOR $2;
BEGIN
	IF NOT EXISTS (SELECT * FROM conductor WHERE telefonoConductor=phone)
	THEN RETURN 'Telefono incorrecto';
	END IF;
	IF NOT EXISTS (SELECT * FROM conductor WHERE telefonoConductor=phone AND contrasenia=psword)
	THEN RETURN 'Contraseña incorrecta';
	END IF;
RETURN phone;
END;
$$
LANGUAGE plpgsql;
/*Select a taxi*/
CREATE OR REPLACE FUNCTION manejarTaxi(Text, VARCHAR(15)) RETURNS Text AS $$
DECLARE
	placataxi ALIAS FOR $1;
	phone ALIAS FOR $2;
BEGIN
	IF NOT EXISTS (SELECT * FROM maneja WHERE taxi=placataxi)
	THEN RETURN 'El taxi que desea manejar no esta registrado';
	END IF;
	IF NOT EXISTS (SELECT * FROM maneja WHERE telefonoConductor=phone AND taxi=placataxi)
	THEN RETURN 'El taxi que desea manejar no esta asociado con su cuenta';
	END IF;
	IF NOT EXISTS (SELECT * FROM maneja INNER JOIN taxi ON taxi=placa WHERE NOT ocupado AND taxi=placataxi)
	THEN RETURN 'El taxi que desea manejar se encuentra ocupado';
	END IF;
RETURN placa;
END;
$$
LANGUAGE plpgsql;
/*Redimir Kilometros Conductor*/
CREATE OR REPLACE FUNCTION redimirKilometros(Text) RETURNS Text AS $$
DECLARE
	phone ALIAS FOR $1;
BEGIN
    IF EXISTS(
    WITH kilometros_por_servicio AS (
            SELECT telefonoConductor, ST_Distance(puntoPartida, puntoLlegada) AS kilometros FROM
            conductor INNER JOIN servicio ON conductor = telefonoConductor
            WHERE telefonoConductor = phone AND conductor_pago = FALSE), 
        kilometros_totales_conductor AS (
            SELECT telefonoConductor, SUM(kilometros) AS kilometros_totales FROM kilometros_por_servicio 
            WHERE telefonoConductor = phone),
        kilometros_redimir AS(
            SELECT telefonoConductor, kilometros_totales FROM kilometros_totales_conductor 
            WHERE kilometros_totales >= 20 AND telefonoConductor = phone)
        SELECT * FROM kilometros_redimir)
		THEN UPDATE servicio SET conductor_pago = TRUE 
        WHERE conductor = telefonoConductor AND conductor_pago = FALSE;
        RETURN 'Kilometros redimidos con exito';
    END IF;
    RETURN 'Kilometros insuficientes, debe tener un minimo de 20 km para redimirlos';
END;
$$
LANGUAGE plpgsql;
/*No eliminar un usuario si tiene deudas*/
CREATE OR REPLACE FUNCTION cobrarOnDelete() RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS(
        SELECT telefonoUsuario FROM servicio INNER JOIN usuario
        ON telefonoUsuario = usuario WHERE telefonoUsuario=new.telefonoUsuario AND usuario_pago = FALSE
    )THEN 
	DELETE FROM usuario WHERE telefonoUsuario=new.telefonoUsuario;
	RETURN NEW;
    END IF;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER delete_usuario_deuda AFTER DELETE ON usuario FOR EACH ROW EXECUTE PROCEDURE cobrarOnDelete();

INSERT INTO conductor VALUES ('123456789012345', '1234', 'Mateo', 'Gregory','1999/07/02', 'magremenez@gmail.com', '123454312');
INSERT INTO usuario VALUES ('123456789012345', '1234', 'Mateo', 'Gregory','1999/07/02', 'magremenez@gmail.com', '123454312');
INSERT INTO conductor VALUES ('123451234567890', '1234', 'Valeria', 'Rivera','1998/11/19', 'valeriarm@gmail.com', '123454313');
INSERT INTO usuario VALUES ('123451234567890', '1234', 'Valeria', 'Rivera','1998/11/19', 'valeriarm@gmail.com', '123454313');
SELECT * FROM usuario;