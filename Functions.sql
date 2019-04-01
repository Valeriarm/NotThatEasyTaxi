/*LogIn Usuario*/
CREATE OR REPLACE FUNCTION validarUsuario(Text, Text) RETURNS Text AS $$
DECLARE
	uname ALIAS FOR $1;
	psword ALIAS FOR $2;
BEGIN
	IF NOT EXISTS (SELECT * FROM usuario WHERE username=uname)
	THEN RETURN 'Nombre de usuario incorrecto';
	END IF;
	IF NOT EXISTS (SELECT * FROM usuario WHERE username=uname AND contrasenia=psword)
	THEN RETURN 'Contraseña incorrecta';
	END IF;
RETURN uname;
END;
$$
LANGUAGE plpgsql;
/*LogIn Conductor*/
CREATE OR REPLACE FUNCTION validarConductor(Text, Text) RETURNS Text AS $$
DECLARE
	uname ALIAS FOR $1;
	psword ALIAS FOR $2;
BEGIN
	IF NOT EXISTS (SELECT * FROM conductor WHERE username=uname)
	THEN RETURN 'Nombre de usuario incorrecto';
	END IF;
	IF NOT EXISTS (SELECT * FROM conductor WHERE username=uname AND contrasenia=psword)
	THEN RETURN 'Contraseña incorrecta';
	END IF;
RETURN uname;
END;
$$
LANGUAGE plpgsql;
/*Select a taxi*/
CREATE OR REPLACE FUNCTION manejarTaxi(Text, Text) RETURNS Text AS $$
DECLARE
	placataxi ALIAS FOR $1;
	uname ALIAS FOR $2;
BEGIN
	IF NOT EXISTS (SELECT * FROM maneja WHERE taxi=placataxi)
	THEN RETURN 'El taxi que desea manejar no esta registrado';
	END IF;
	IF NOT EXISTS (SELECT * FROM maneja WHERE conductor=uname AND taxi=placataxi)
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
	uname ALIAS FOR $1;
BEGIN
    IF EXISTS(
    WITH kilometros_por_servicio AS (
            SELECT uname, ST_Distance(puntoPartida, puntoLlegada) AS kilometros FROM
            conductor INNER JOIN servicio ON conductor = username AND conductor_pago = FALSE
            WHERE username = uname), 
        kilometros_totales_conductor AS (
            SELECT uname, SUM(kilometros) AS kilometros_totales FROM kilometros_por_servicio 
            WHERE username = uname),
        kilometros_redimir AS(
            SELECT uname, kilometros_totales FROM kilometros_totales_conductor 
            WHERE kilometros_totales >= 20 AND username = uname)
        SELECT kilometros_redimir)
		THEN UPDATE servicio SET conductor_pago = TRUE 
        WHERE conductor = username AND conductor_pago = FALSE;
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
        SELECT username FROM servicio INNER JOIN usuario
        ON username = new.username WHERE usuario_pago = FALSE
    )THEN RETURN NEW;
    END IF;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER delete_usuario_deuda BEFORE DELETE ON usuario FOR EACH ROW EXECUTE PROCEDURE cobrarOnDelete();
INSERT INTO conductor VALUES ('1234', 'Marthox', '1234', 'Mateo', 'Gregory','1999/07/02', 'magremenez@gmail.com', '123454312');
INSERT INTO usuario VALUES ('1234', 'Marthox', '1234', 'Mateo', 'Gregory','1999/07/02', 'magremenez@gmail.com', '123454312');
INSERT INTO conductor VALUES ('12345', 'Valeriarm', '1234', 'Valeria', 'Rivera','1998/11/19', 'valeriarm@gmail.com', '123454312');
INSERT INTO usuario VALUES ('12345', 'Valeriarm', '1234', 'Valeria', 'Rivera','1998/11/19', 'valeriarm@gmail.com', '123454312');
SELECT * FROM usuario;