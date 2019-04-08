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

/*LogIn Usuario*/
CREATE OR REPLACE FUNCTION validar_usuario(VARCHAR(15), Text) RETURNS Text AS $$
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
CREATE OR REPLACE FUNCTION validar_conductor(VARCHAR(15), Text) RETURNS Text AS $$
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
CREATE OR REPLACE FUNCTION manejar_taxi(VARCHAR(15), VARCHAR(6)) RETURNS Text AS $$
DECLARE
	phone ALIAS FOR $1;
	placataxi ALIAS FOR $2;
BEGIN
	IF NOT EXISTS (SELECT * FROM maneja WHERE taxi=placataxi)
	THEN RETURN 'El taxi que desea manejar no esta registrado';
	END IF;
	IF NOT EXISTS (SELECT * FROM maneja WHERE telefonoconductor=phone AND taxi=placataxi)
	THEN RETURN 'El taxi que desea manejar no esta asociado con su cuenta';
	END IF;
	IF NOT EXISTS (SELECT * FROM maneja WHERE chosen AND taxi=placataxi 
		AND telefonoconductor!=phone)
	THEN RETURN 'El taxi que desea manejar se encuentra seleccionado por otro usuario';
	END IF;
	IF NOT EXISTS (
		WITH taxis_chosen_by_user AS 
			(SELECT count(*) AS num_taxis FROM maneja WHERE telefonoConductor=phone AND chosen)
			SELECT * FROM taxis_chosen_by_user WHERE num_taxis > 1
			)THEN 
			UPDATE manejar SET chosen = FALSE WHERE taxi!=placataxi
				AND telefonoconductor=phone;
			UPDATE manejar SET chosen = TRUE WHERE taxi=placataxi
				AND telefonoConductor=phone;
		RETURN placa;
	END IF;
UPDATE manejar SET chosen = TRUE WHERE taxi=placataxi
	AND telefonoConductor=phone;
RETURN placa;
END;
$$
LANGUAGE plpgsql;
/*Redimir Kilometros Conductor*/
CREATE OR REPLACE FUNCTION redimir_kilometros(Text) RETURNS Text AS $$
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
/*Paga Kilometros Usuario*/
CREATE OR REPLACE FUNCTION pagar_kilometros(Text) RETURNS Text AS $$
DECLARE
	phone ALIAS FOR $1;
BEGIN
    IF EXISTS(
    WITH kilometros_por_servicio AS (
            SELECT telefonoConductor, ST_Distance(puntoPartida, puntoLlegada) AS kilometros FROM
            conductor INNER JOIN servicio ON conductor = telefonoConductor
            WHERE telefonoConductor = phone AND usuario_pago = FALSE), 
        kilometros_totales_usuario AS (
            SELECT telefonoConductor, SUM(kilometros) AS kilometros_totales FROM kilometros_por_servicio 
            WHERE telefonoConductor = phone)
        SELECT * FROM kilometros_totales_usuario)
		THEN UPDATE servicio SET usuario_pago = TRUE 
        WHERE conductor = telefonoConductor AND usuario_pago = FALSE;
        RETURN 'Kilometros pagados con exito';
    END IF;
    RETURN 'No tiene deudas con la empresa para pagar';
END;
$$
LANGUAGE plpgsql;
/*No eliminar un usuario si tiene deudas*/
CREATE OR REPLACE FUNCTION cobrar_on_delete() RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS(
        SELECT telefonousuario FROM servicio INNER JOIN usuario
        ON telefonousuario = usuario WHERE telefonoUsuario=new.telefonousuario AND usuario_pago = FALSE
    )THEN 
	DELETE FROM usuario WHERE telefonousuario=new.telefonoUsuario;
	RETURN NEW;
    END IF;
		RAISE EXCEPTION 'El usuario todavia tiene deudas pendientes'
		USING HINT = 'Por favor pague sus servicios antes de eliminar su cuenta';
END;
$$
LANGUAGE plpgsql;
CREATE TRIGGER delete_usuario_deuda AFTER DELETE ON usuario FOR EACH ROW EXECUTE PROCEDURE cobrar_on_delete();
/*Crea una solicitud recibiendo la ubicacion del usuario y luego encuentra el taxi mas cercano*/
CREATE OR REPLACE FUNCTION crear_solicitud() RETURNS TRIGGER AS $$
BEGIN
	IF EXISTS(
		WITH reporte_taxi AS (SELECT taxi,horaactual, coordenada FROM reporte),
			taxis AS (SELECT taxi, MAX (horaactual) AS horaactual FROM reporte_taxi Group by taxi),
			taxi_cercano AS (SELECT *, ST_Distance(coordenada,new.coordenada)
						 FROM taxis NATURAL JOIN reporte),
			taxi_mas_cercano AS (SELECT taxi, MIN(st_distance) 
							 AS distance FROM taxi_cercano 
							 GROUP BY taxi ORDER BY distance LIMIT 1) 
			SELECT taxi INTO TEMPORARY placataxi FROM taxi_mas_cercano WHERE distance < 20
	)THEN INSERT INTO solicitud VALUES (Default, new.usuario, new.posicionusuario, placataxi.taxi, TRUE);
	RETURN NEW;
	END IF;
	RAISE EXCEPTION 'No hay conductores cerca de usted'
	USING HINT = 'Por favor intentelo mas tarde o cambie de posicion';
END;
$$
LANGUAGE plpgsql;
CREATE TRIGGER create_solicitud AFTER INSERT ON solicitud FOR EACH ROW EXECUTE PROCEDURE crear_solicitud();
/*Al crear un taxi se asocia con el usuario que lo registro en al tabla maneja*/
CREATE OR REPLACE FUNCTION insert_taxi(VARCHAR(15),VARCHAR(6), TEXT, TEXT, TEXT, INTEGER, TEXT, DATE) RETURNS TEXT AS $$
DECLARE
	phone ALIAS FOR $1;
	placa ALIAS FOR $2;
	contrasenia ALIAS FOR $3;
	marca ALIAS FOR $4;
	modelo ALIAS FOR $5;
	anio ALIAS FOR $6;
	baul ALIAS FOR $7;
	soat ALIAS FOR $8;
BEGIN
	IF EXISTS(
		SELECT * FROM conductor WHERE telefonoconductor=phone
	)THEN
		INSERT INTO taxi VALUES (placa, contrasenia, marca, modelo, anio, baul, soat, FALSE);
		INSERT INTO maneja VALUES (placa, phone, FALSE);
		RETURN "Taxi creado con exito";
	END IF;
END;
$$
LANGUAGE plpgsql;

REVOKE ALL
ON ALL TABLES IN SCHEMA public 
FROM PUBLIC;

/*User users CRUD*/

DROP USER IF EXISTS usercrud;
CREATE USER usercreate  WITH PASSWORD 'usercrud';
GRANT ALL PRIVILEGES ON usuario IN SCHEMA public TO usercrud;
GRANT ALL PRIVILEGES ON origenesfav IN SCHEMA public TO usercrud;
GRANT ALL PRIVILEGES ON servicio IN SCHEMA public TO usercrud;
GRANT ALL PRIVILEGES ON solicitud IN SCHEMA public TO usercrud;

/*Driver users CRUD*/

DROP USER IF EXISTS drivercrud;
CREATE USER drivercrud  WITH PASSWORD 'drivercrud';
GRANT ALL PRIVILEGES ON taxi IN SCHEMA public TO drivercrud;
GRANT ALL PRIVILEGES ON conductor IN SCHEMA public TO drivercrud;
GRANT ALL PRIVILEGES ON maneja IN SCHEMA public TO drivercrud;
GRANT ALL PRIVILEGES ON servicio IN SCHEMA public TO drivercrud;
GRANT ALL PRIVILEGES ON solicitud IN SCHEMA public TO drivercrud;
GRANT ALL PRIVILEGES ON reporte IN SCHEMA public TO drivercrud;

/*Default insertions*/

INSERT INTO conductor VALUES ('123456789012345', '12345678', 'Mateo', 'Gregory','1999-07-02', 'magremenez@gmail.com', '123454312');
INSERT INTO usuario VALUES ('123456789012345', '12345678', 'Mateo', 'Gregory','1999-07-02', 'magremenez@gmail.com', '123454312');
INSERT INTO conductor VALUES ('123451234567890', '12345678', 'Valeria', 'Rivera','1998-11-19', 'valeriarm@gmail.com', '123454313');
INSERT INTO usuario VALUES ('123451234567890', '12345678', 'Valeria', 'Rivera','1998-11-19', 'valeriarm@gmail.com', '123454313');
INSERT INTO taxi VALUES ('DEO840','12345678','Renault','Logan',2016,'Mediano','2020-10-01', false);
INSERT INTO taxi VALUES ('CMP217','12345678','Hyundai','Acent',2006,'Pequenio','2020-10-01', false);
SELECT * FROM usuario;