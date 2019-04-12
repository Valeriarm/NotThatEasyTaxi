# API Paths

## Usuario

  Crear Usuario
  Post
    Path: <http://localhost:5000/user/:phone/:psword/:nombre/:apellido/:fechanac/:mail/:tarjeta>

  Consultar Usuario
  Get
    Path: <http://localhost:5000/user/:phone/>

  Actualizar Usuario
  Patch
    Path: <http://localhost:5000/user/:phone/:psword/:nombre/:apellido/:mail/:tarjeta>

  Borrar Usuario
  DELETE
    Path: <http://localhost:5000/user/:phone>

  Validar Usuario
  Get
    Path: <http://localhost:5000/user/:phone/:psword>

  Pagar Servicios
  Patch
    Path: <http://localhost:5000/user/:phone/>

## Conductor

  Crear Conductor
  Post
    Path: <http://localhost:5000/driver/:phone/:psword/:nombre/:apellido/:fechanac/:mail/:cuenta>

  Consultar Conductor
  Get
    Path: <http://localhost:5000/driver/:phone/>

  Actualizar Conductor
  Patch
    Path: <http://localhost:5000/driver/:phone/:psword/:nombre/:apellido/:mail/:cuenta>

  Borrar Conductor
  Delete
    Path: <http://localhost:5000/driver/:phone/>

  Validar Conductor
  Get
    Path: <http://localhost:5000/driver/:phone/:psword>

  Manejar Taxi
    Get
      Path: <http://localhost:5000/driver/taxi/:phone/:placa>

  Redimir Kilometros
    Patch
      Path: <http://localhost:5000/driver/:phone>

## Taxi

  Crear Taxi
    Post
      Path: <http://localhost:5000/taxi/:phone/:placa/:contrasenia/:marca/:modelo/:anio/:baul/:soat/:ocupado>

  Consultar Taxi
    Get
      Path: <http://localhost:5000/taxi/:placa>

  Actualizar Taxi
    Patch
      Path: <http://localhost:5000/taxi/:placa/:soat>

  Eliminar Taxi
    Delete
      Path: <http://localhost:5000/taxi/:placa>

  Validar Taxi
  Get
    Path: <http://localhost:5000/taxi/:placa/:psword>

## Solicitud

  Crear solicitud
    Post
      Path: <http://localhost:5000/request/users/:phoneuser/:latin/:lngin/:latfin/:lngfin>

  Consultar Solicitud Activa del usuario
    Get
      Path: <http://localhost:5000/request/user/:phone>

  Consultar Solicitud Activa del conductor
    Get
      Path: <http://localhost:5000/request/drivers/taxi/:phone/:placa>

## Servicio

  Crear Servicio
    Post
      Path: <http://localhost:5000/service/user/add/:idsolicitud>
  
  Consultar Servicio activo usuario
    Get
      Path: <http://localhost:5000/service/user/:phone>
  
  Consulta si un servicio termino
    Get
      Path: <http://localhost:5000/service/finished/:idservicio>

  Calificar al conductor
    Patch
      Path: <http://localhost:5000/service/user/:phone/:calificacion>

  Calificar al usuario
    Patch
      Path: <http://localhost:5000/service/drivers/:phone/:calificacion>

  Terminar servicio
    Patch
      Path: <http://localhost:5000/service/drivers/end/:phone>

  Obtener servicios usuario
    Get
      Path: <http://localhost:5000/services/user/all/:phone>

  Obtener servicios conductor
    Get
      Path: <http://localhost:5000/services/driver/all/:phone>

## Favorites

  Crear ubicacion Favorita
    Post
      Path: <http://localhost:5000/favorites/user/:phone/:name/:lat/:lng>
  
  Obtener ubicaciones usuario
    Get
      Path: <http://localhost:5000/favorites/user/:phone>

  Borra una ubicacion favorita
    Delete
      Path: <http://localhost:5000/favorites/user/:phone/:name>

## Reports

  Crea un reporte
    Post
      Path: <http://localhost:5000/report/user/taxi/:placa/:lat/:lng>