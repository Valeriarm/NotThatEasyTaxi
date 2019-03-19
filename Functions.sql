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