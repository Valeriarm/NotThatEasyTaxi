REVOKE ALL
ON ALL TABLES IN SCHEMA public 
FROM PUBLIC;

DROP USER IF EXISTS usercreate;
CREATE USER usercreate  WITH PASSWORD 'usercreate';
GRANT INSERT ON usuario IN SCHEMA public TO usercreate;
GRANT INSERT ON origenesfav IN SCHEMA public TO usercreate;
GRANT INSERT ON servicio IN SCHEMA public TO usercreate;
GRANT INSERT ON solicitud IN SCHEMA public TO usercreate;

DROP USER IF EXISTS userread;
CREATE USER userread  WITH PASSWORD 'userread';
GRANT SELECT ON usuario IN SCHEMA public TO userread;
GRANT SELECT ON origenesfav IN SCHEMA public TO userread;
GRANT SELECT ON servicio IN SCHEMA public TO userread;
GRANT SELECT ON solicitud IN SCHEMA public TO userread;

DROP USER IF EXISTS userupdate;
CREATE USER userupdate  WITH PASSWORD 'userupdate';
GRANT UPDATE ON usuario IN SCHEMA public TO userupdate;
GRANT UPDATE ON origenesfav IN SCHEMA public TO userupdate;
GRANT UPDATE ON servicio IN SCHEMA public TO userupdate;
GRANT UPDATE ON solicitud IN SCHEMA public TO userupdate;

DROP USER IF EXISTS userdelete;
CREATE USER userdelete  WITH PASSWORD 'userdelete';
GRANT DELETE ON usuario IN SCHEMA public TO userdelete;
GRANT DELETE ON origenesfav IN SCHEMA public TO userdelete;
GRANT DELETE ON servicio IN SCHEMA public TO userdelete;
GRANT DELETE ON solicitud IN SCHEMA public TO userdelete;

/*Driver users CRUD*/

DROP USER IF EXISTS drivercreate;
CREATE USER drivercreate  WITH PASSWORD 'drivercreate';
GRANT INSERT ON conductor IN SCHEMA public TO drivercreate;
GRANT INSERT ON maneja IN SCHEMA public TO drivercreate;
GRANT INSERT ON servicio IN SCHEMA public TO drivercreate;

DROP USER IF EXISTS driverread;
CREATE USER driverread  WITH PASSWORD 'driverread';
GRANT SELECT ON conductor IN SCHEMA public TO driverread;
GRANT SELECT ON maneja IN SCHEMA public TO driverread;
GRANT INSERT ON servicio IN SCHEMA public TO driverread;


DROP USER IF EXISTS driverupdate;
CREATE USER driverupdate  WITH PASSWORD 'driverupdate';
GRANT UPDATE ON conductor IN SCHEMA public TO driverupdate;
GRANT UPDATE ON maneja IN SCHEMA public TO driverupdate;
GRANT INSERT ON servicio IN SCHEMA public TO driverupdate;

DROP USER IF EXISTS driverdelete;
CREATE USER driverdelete  WITH PASSWORD 'driverdelete';
GRANT DELETE ON conductor IN SCHEMA public TO driverdelete;
GRANT DELETE ON maneja IN SCHEMA public TO driverdelete;
GRANT INSERT ON servicio IN SCHEMA public TO driverdelete;

/*Taxi users CRUD*/

DROP USER IF EXISTS taxicreate;
CREATE USER taxicreate  WITH PASSWORD 'taxicreate';
GRANT INSERT ON taxi IN SCHEMA public TO taxicreate;
GRANT INSERT ON maneja IN SCHEMA public TO taxicreate;
GRANT INSERT ON servicio IN SCHEMA public TO taxicreate;
GRANT INSERT ON solicitud IN SCHEMA public TO taxicreate;

DROP USER IF EXISTS taxiread;
CREATE USER taxiread  WITH PASSWORD 'taxiread';
GRANT SELECT ON taxi IN SCHEMA public TO taxiread;
GRANT SELECT ON maneja IN SCHEMA public TO taxiread;
GRANT SELECT ON servicio IN SCHEMA public TO taxiread;
GRANT SELECT ON solicitud IN SCHEMA public TO taxiread;

DROP USER IF EXISTS taxiupdate;
CREATE USER taxiupdate  WITH PASSWORD 'taxiupdate';
GRANT UPDATE ON taxi IN SCHEMA public TO taxiupdate;
GRANT UPDATE ON maneja IN SCHEMA public TO taxiupdate;
GRANT UPDATE ON servicio IN SCHEMA public TO taxiupdate;
GRANT UPDATE ON solicitud IN SCHEMA public TO taxiupdate;

DROP USER IF EXISTS taxidelete;
CREATE USER taxidelete  WITH PASSWORD 'taxidelete';
GRANT DELETE ON taxi IN SCHEMA public TO taxidelete;
GRANT DELETE ON maneja IN SCHEMA public TO taxidelete;
GRANT DELETE ON servicio IN SCHEMA public TO taxidelete;
GRANT DELETE ON solicitud IN SCHEMA public TO taxidelete;