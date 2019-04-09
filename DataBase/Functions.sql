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
/*Al crear un taxi se asocia con el usuario que lo registro en al tabla maneja*/
CREATE OR REPLACE FUNCTION insert_taxi(VARCHAR(15),VARCHAR(6), TEXT, TEXT, TEXT, INTEGER, TEXT, DATE, BOOLEAN) RETURNS TEXT AS $$
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
/*Buscar por solicitudes activas por placa*/
CREATE OR REPLACE FUNCTION buscar_solicitudes_conductor(VARCHAR(6)) RETURNS Text AS $$
DECLARE
	placa ALIAS FOR $1;
BEGIN
	IF EXISTS (
		SELECT * FROM solicitud WHERE taxi=placa AND activa=TRUE
	)THEN RETURN "Solicitud encontrado";
	END IF;
	RETURN "Buscando Solicitudes";
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
	)THEN RETURN "Solicitud encontrado";
	END IF;
	RETURN "Buscando Solicitudes";
END;
$$
LANGUAGE plpgsql;
/*Buscar por servicios activas*/
CREATE OR REPLACE FUNCTION buscar_servicios(VARCHAR(15)) RETURNS Text AS $$
DECLARE
	phone ALIAS FOR $1;
BEGIN
	IF EXISTS (
		SELECT * FROM servicio WHERE taxi=phone
	)THEN RETURN "Servicio encontrado";
	END IF;
	RETURN "Buscando Servicio";
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
							  WHERE chosen = TRUE)
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
							  WHERE chosen = TRUE)
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
DROP TRIGGER create_solicitud ON solicitud;
CREATE TRIGGER create_solicitud BEFORE INSERT ON solicitud FOR EACH ROW EXECUTE PROCEDURE crear_solicitud();
