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