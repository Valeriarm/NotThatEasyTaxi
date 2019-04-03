/*Inserting a value with coordinates from openstreetmap into postgres*/
INSERT INTO origenesfav VALUES (ST_GeomFromText('POINT(3.4394 -76.529)', 4326), 'Marthox')

/*To obtain the point from postgres and pass it to openstreetmap*/
SELECT username, origen, st_asText(st_transform(origen, 4326)) FROM origenesfav

/*To obtain longitud and latitud divided*/
SELECT ST_X(origen) as longitude, ST_Y(origen) as latitude FROM origenesfav
