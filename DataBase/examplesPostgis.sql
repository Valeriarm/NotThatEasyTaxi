/*Inserting a value with coordinates from openstreetmap into postgres*/
INSERT INTO origenesfav VALUES (ST_GeomFromText('POINT(3.4394 -76.529)', 4326), 'Marthox')

/*To obtain the point from postgres and pass it to openstreetmap*/
SELECT username, origen, st_asText(st_transform(origen, 4326)) FROM origenesfav

/*To obtain longitud and latitud divided*/
SELECT ST_X(origen) as longitude, ST_Y(origen) as latitude FROM origenesfav
/*To obtain the closest taxi to a point, needs to be improved*/
WITH reporte_taxi AS (SELECT taxi,horaactual, coordenada FROM reporte),
taxis AS (SELECT taxi, MAX (horaactual) AS horaactual FROM reporte_taxi Group by taxi),
taxi_cercano AS (SELECT *, ST_Distance(coordenada,
									   ST_GeomFromText('POINT(30.4394 -76.529)', 4326)
									  )
				 FROM taxis NATURAL JOIN reporte),
taxi_mas_cercano AS (SELECT taxi, MIN(st_distance) 
					 AS distance FROM taxi_cercano 
					 GROUP BY taxi ORDER BY distance LIMIT 1) 
SELECT taxi FROM taxi_mas_cercano;

