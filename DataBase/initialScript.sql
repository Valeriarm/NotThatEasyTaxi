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
origen GEOMETRY(POINT) NOT NULL,
telefonousuario VARCHAR(15) NOT NULL,
PRIMARY KEY (origen, telefonousuario),
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
	IF NOT EXISTS (SELECT * FROM maneja WHERE conductor=phone AND taxi=placataxi)
	THEN RETURN 'El taxi que desea manejar no esta asociado con su cuenta';
	END IF;
	IF EXISTS (SELECT * FROM maneja WHERE chosen=true AND taxi=placataxi 
		AND conductor!=phone)
	THEN RETURN 'El taxi que desea manejar se encuentra seleccionado por otro usuario';
	END IF;
	IF NOT EXISTS (
		WITH taxis_chosen_by_user AS 
			(SELECT count(*) AS num_taxis FROM maneja WHERE conductor=phone AND chosen=true)
			SELECT * FROM taxis_chosen_by_user WHERE num_taxis > 1
			)THEN 
			UPDATE maneja SET chosen = false WHERE taxi!=placataxi
				AND conductor=phone;
			UPDATE maneja SET chosen = true WHERE taxi=placataxi
				AND conductor=phone;
		RETURN placataxi;
	END IF;
UPDATE maneja SET chosen = true WHERE taxi=placataxi
	AND conductor=phone;
RETURN placataxi;
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
		RETURN 'Taxi creado con exito';
	END IF;
END;
$$
LANGUAGE plpgsql;


/*Buscar por solicitudes activas por placa*/
CREATE OR REPLACE FUNCTION buscar_solicitudes_conductor(VARCHAR(6), VARCHAR(15)) RETURNS Text AS $$
DECLARE
	phone ALIAS FOR $2;
	placa ALIAS FOR $1;
	id INTEGER := (
		SELECT idsolicitud FROM solicitud WHERE conductor=phone AND activa=false
	);
BEGIN
	IF EXISTS (
		SELECT * FROM solicitud WHERE taxi=placa AND conductor=phone AND activa=TRUE
	)THEN RETURN id;
	END IF;
	RETURN 'Buscando Solicitudes';
END;
$$
LANGUAGE plpgsql;


/*Buscar por solicitudes activas por telefono*/
CREATE OR REPLACE FUNCTION buscar_solicitudes_usuario(VARCHAR(15)) RETURNS Text AS $$
DECLARE
	phone ALIAS FOR $1;
BEGIN
	IF EXISTS (
		SELECT * FROM solicitud WHERE usuario=phone AND activa=TRUE
	)THEN RETURN 'Solicitud encontrado';
	END IF;
	RETURN 'Buscando Solicitudes';
END;
$$
LANGUAGE plpgsql;




/*Buscar por servicios activas*/
CREATE OR REPLACE FUNCTION buscar_servicios(VARCHAR(15)) RETURNS Text AS $$
DECLARE
	phone ALIAS FOR $1;
	id_servicio INTEGER := (
		SELECT idservicio FROM servicio WHERE usuario=phone AND terminado=false
	);
BEGIN
	IF EXISTS (
		SELECT * FROM servicio WHERE usuario=phone AND terminado=false
	)THEN 
		RETURN id_servicio;
	END IF;
	RETURN 'Buscando Servicio';
END;
$$
LANGUAGE plpgsql;


/*Buscar por servicios terminados*/
CREATE OR REPLACE FUNCTION buscar_servicios_terminados(INTEGER) RETURNS Text AS $$
DECLARE
	id_servicio ALIAS FOR $1;
BEGIN
	IF EXISTS (
		SELECT * FROM servicio WHERE idservicio=id_servicio AND terminado=true
	)THEN 
		RETURN id_servicio;
	END IF;
	RETURN 'Servicio en curso';
END;
$$
LANGUAGE plpgsql;


/*Crea una solicitud recibiendo la ubicacion del usuario y luego encuentra el taxi mas cercano*/
CREATE OR REPLACE FUNCTION crear_solicitud() RETURNS TRIGGER AS $$
DECLARE
	placa_taxi VARCHAR(6) := (
		WITH reporte_taxi AS (SELECT taxi,horaactual, coordenada FROM reporte),
			taxis AS (SELECT taxi, MAX (horaactual) AS horaactual FROM reporte_taxi Group by taxi),
			taxi_cercano AS (SELECT *, ST_Distance(coordenada,new.posicionusuario)
						 FROM taxis NATURAL JOIN reporte),
			taxi_mas_cercano AS (SELECT taxi, MIN(st_distance) 
							 AS distance FROM taxi_cercano 
							 GROUP BY taxi ORDER BY distance LIMIT 1),
			taxi_chosen AS (SELECT taxi FROM taxi_mas_cercano WHERE distance < 20)
			SELECT taxi FROM taxi_chosen);
	tel_conductor VARCHAR(15) := (
		WITH reporte_taxi AS (SELECT taxi,horaactual, coordenada FROM reporte),
			taxis AS (SELECT taxi, MAX (horaactual) AS horaactual FROM reporte_taxi Group by taxi),
			taxi_cercano AS (SELECT *, ST_Distance(coordenada,new.posicionusuario)
						 FROM taxis NATURAL JOIN reporte),
			taxi_mas_cercano AS (SELECT taxi, MIN(st_distance) 
							 AS distance FROM taxi_cercano 
							 GROUP BY taxi ORDER BY distance LIMIT 1),
			taxi_chosen AS (SELECT taxi FROM taxi_mas_cercano WHERE distance < 20),
			driver_chosen AS (SELECT conductor FROM maneja NATURAL JOIN taxi_chosen
							  WHERE chosen = true)
			SELECT conductor FROM driver_chosen);
BEGIN
	IF NOT EXISTS (WITH reporte_taxi AS (SELECT taxi,horaactual, coordenada FROM reporte),
			taxis AS (SELECT taxi, MAX (horaactual) AS horaactual FROM reporte_taxi Group by taxi),
			taxi_cercano AS (SELECT *, ST_Distance(coordenada,new.posicionusuario)
						 FROM taxis NATURAL JOIN reporte),
			taxi_mas_cercano AS (SELECT taxi, MIN(st_distance) 
							 AS distance FROM taxi_cercano 
							 GROUP BY taxi ORDER BY distance LIMIT 1),
			taxi_chosen AS (SELECT taxi FROM taxi_mas_cercano WHERE distance < 20),
			driver_chosen AS (SELECT conductor FROM maneja 
							  WHERE chosen = true)
			SELECT * FROM driver_chosen,taxi_chosen
	)THEN RAISE EXCEPTION 'No hay conductores cerca de usted'
	USING HINT = 'Por favor intentelo mas tarde o cambie de posicion';
	END IF;
	BEGIN
		NEW.taxi=placa_taxi;
		NEW.conductor=tel_conductor;
		NEW.activa=True;
	END;
	RETURN NEW;
END;
$$
LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS create_solicitud ON solicitud;
CREATE TRIGGER create_solicitud BEFORE INSERT ON solicitud FOR EACH ROW EXECUTE PROCEDURE crear_solicitud();

/*Crear Servicio*/
/*
CREATE OR REPLACE FUNCTION crear_servicio(INTEGER) RETURNS TRIGGER AS $$
DECLARE
	idSolicitud ALIAS FOR $1;
BEGIN
	idUsuario VARCHAR (15):= (
		SELECT usuario FROM solicitud WHERE idSolicitud=idsolicitud;
	);
	idConductor VARCHAR(15):=(
		SELECT conductor FROM solicitud WHERE idSolicitud=idsolicitud;
	);
	placa VARCHAR(6):=(
		SELECT taxi FROM solicitud WHERE idSolicitud=idsolicitud;
	);
	origen GEOMETRY(POINT):=(
		SELECT posicionusuario FROM solicitud WHERE idSolicitud=idsolicitud;
	);
	destino VARCHAR(15):=(
		SELECT posicionfinal FROM solicitud WHERE idSolicitud=idsolicitud;
	);


END;
$$
LANGUAJE plpgsql;
*/


/*User users CRUD*/
/*
REVOKE ALL
ON ALL TABLES IN SCHEMA public 
FROM PUBLIC;

DROP USER IF EXISTS usercrud;
CREATE USER usercreate  WITH PASSWORD 'usercrud';
GRANT ALL PRIVILEGES ON usuario IN SCHEMA public TO usercrud;
GRANT ALL PRIVILEGES ON origenesfav IN SCHEMA public TO usercrud;
GRANT ALL PRIVILEGES ON servicio IN SCHEMA public TO usercrud;
GRANT ALL PRIVILEGES ON solicitud IN SCHEMA public TO usercrud;
*/
/*Driver users CRUD*/
/*
DROP USER IF EXISTS drivercrud;
CREATE USER drivercrud  WITH PASSWORD 'drivercrud';
GRANT ALL PRIVILEGES ON taxi IN SCHEMA public TO drivercrud;
GRANT ALL PRIVILEGES ON conductor IN SCHEMA public TO drivercrud;
GRANT ALL PRIVILEGES ON maneja IN SCHEMA public TO drivercrud;
GRANT ALL PRIVILEGES ON servicio IN SCHEMA public TO drivercrud;
GRANT ALL PRIVILEGES ON solicitud IN SCHEMA public TO drivercrud;
GRANT ALL PRIVILEGES ON reporte IN SCHEMA public TO drivercrud;
*/
/*Default insertions*/

INSERT INTO conductor VALUES ('3166443198', '12345678', 'Mateo', 'Gregory','1999-07-02', 'magremenez@gmail.com', '123454312');
INSERT INTO usuario VALUES ('3166443198', '12345678', 'Mateo', 'Gregory','1999-07-02', 'magremenez@gmail.com', '123454312');
INSERT INTO conductor VALUES ('3012617187', '12345678', 'Valeria', 'Rivera','1998-11-19', 'valeriarm@gmail.com', '123454313');
INSERT INTO usuario VALUES ('3012617187', '12345678', 'Valeria', 'Rivera','1998-11-19', 'valeriarm@gmail.com', '123454313');
SELECT insert_taxi('3166443198','CMP217','12345678','Hyundai','Accent',2016,'Mediano','2020-10-01');
SELECT insert_taxi('3012617187','DEO840','12345678','Renault','Logan',2016,'Mediano','2020-10-01');
/*INSERT INTO reporte VALUES (DEFAULT, 'CMP217', '2019-04-09T03:42:13.346Z', ST_GeomFromText('POINT(3.4394 -76.529)', 4326));
INSERT INTO reporte VALUES (DEFAULT, 'DEO840', '2019-04-09T03:43:45.346Z', ST_GeomFromText('POINT(3.4562 -76.327)', 4326));*/
SELECT * FROM usuario;
SELECT * FROM conductor;
SELECT * FROM maneja;
SELECT * FROM reporte;
SELECT * FROM solicitud;