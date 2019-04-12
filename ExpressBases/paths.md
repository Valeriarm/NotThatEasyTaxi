# API Paths

## Usuario

### Crear Usuario

#### Post

##### Params

telefono del usuario, contrasenia del usuario, nombre del usuario, apellido del usuario, fecha de nacimiento del usuario, correo del usuario, numero de tarjeta del usuario

##### Path

<http://localhost:5000/user/${phone}/${password}/${nombre}/${apellido}/${fecha}/${email}/${numtarjeta}>

### Consultar Usuario

#### Get

##### Params

telefono del usuario

##### Path

<http://localhost:5000/user/:phone/>

### Actualizar Usuario

#### Patch

##### Params

telefono del usuario, contrasenia del usuario, nombre del usuario, apellido del usuario, correo del usuario, numero de tarjeta del usuario

##### Path

<http://localhost:5000/user/:phone/:psword/:nombre/:apellido/:mail/:tarjeta>

### Borrar Usuario

#### DELETE

##### Params

telefono del usuario

##### Path

<http://localhost:5000/user/:phone>

### Validar Usuario

#### Get

##### Params

telefono del usuario, contrasenia del usuario

##### Path

<http://localhost:5000/user/${phone}/${password}>

### Pagar Servicios

#### Patch

##### Params

telefono del usuario

##### Path

<http://localhost:5000/user/:phone/>

## Conductor

### Crear Conductor

#### Post

##### Params

telefono del conductor, contrasenia, nombre del conductor, apellido del conductor, fecha de nacimiento del conductor, correo del conductor, cuenta bancaria del conductor

##### Path

<http://localhost:5000/driver/${phone}/${password}/${nombre}/${apellido}/${fecha}/${email}/${numcuenta}>

### Consultar Conductor

#### Get

##### Params

telefono del conductor

##### Path

<http://localhost:5000/driver/:phone/>

### Actualizar Conductor

#### Patch

##### Params

telefono del conductor, contrasenia del conductor, nombre del conductor, apellido del conductor, correo del conductor, cuenta bancaria del conductor

##### Path 

<http://localhost:5000/driver/:phone/:psword/:nombre/:apellido/:mail/:cuenta>

### Borrar Conductor

#### Delete

##### Params

telefono del conductor

##### Path 

<http://localhost:5000/driver/:phone/>

### Validar Conductor

#### Get

##### Params

telefono del conductor, contraseña del conductor

##### Path

<http://localhost:5000/driver/${phone}/${password}>

### Manejar Taxi

##### Params

telefono del conductor, placa del taxi

  #### Get

  ##### Path 
  
  <http://localhost:5000/driver/taxi/:phone/:placa>

### Redimir Kilometros

##### Params

telefono del conductor

  #### Patch

  ##### Path 
  
  <http://localhost:5000/driver/:phone>

## Taxi

### Crear Taxi

##### Params

    telefono del conductor, placa del taxi, contraseña del taxi, marca del taxi, modelo del taxi, anio del taxi, tamaño del baul del taxi, fecha de expiracion del soat

  #### Post

  ##### Path 
  
  <http://localhost:5000/taxi/${phone}/${placa}/${password}/${marca}/${modelo}/${anio}/${baul}/${soat}/${ocupado}>

### Consultar Taxi

  #### Get

  ##### Params 

    placa del taxi

  ##### Path 
  
  <http://localhost:5000/taxi/:placa>

### Actualizar Taxi

  #### Patch

  ##### Params 

    placa del taxi, fecha de expiracion del soat

  ##### Path 
  
  <http://localhost:5000/taxi/:placa/:soat>

### Eliminar Taxi

  #### Delete

  ##### Params

    placa del taxi

  ##### Path
  
  <http://localhost:5000/taxi/:placa>

### Validar Taxi

#### Get

##### Params

    placa del taxi, contraseña asociada al taxi

##### Path 

<http://localhost:5000/taxi/:placa/:psword>

## Solicitud

### Crear solicitud

  #### Post

  ##### Params

    telefono del usuario, latitud inicial, longitud inicial, latitud final, longitud final

  ##### Path
  
    <http://localhost:5000/request/users/:phoneuser/:latin/:lngin/:latfin/:lngfin>

### Consultar Solicitud Activa del usuario

  #### Get

  ##### Params

    telefono del usuario

  ##### Path
  
    <http://localhost:5000/request/user/:phone>

### Consultar Solicitud Activa del conductor

  #### Get

  ##### Params

    telefono del conductor, placa del taxi

  ##### Path
  
    <http://localhost:5000/request/drivers/taxi/:phone/:placa>

## Servicio

### Crear Servicio

  #### Post

  ##### Params

    id de la solicitud

  ##### Path
  
    <http://localhost:5000/service/user/add/:idsolicitud>
  
### Consultar Servicio activo usuario

  #### Get

  ##### Params

    telefono del usuario

  ##### Path
  
    <http://localhost:5000/service/user/:phone>
  
### Consulta si un servicio termino

  #### Get

  ##### Params

    id del servicio

  ##### Path
  
    <http://localhost:5000/service/finished/:idservicio>

### Calificar al conductor

  #### Patch

  ##### Params

    telefono del usuario

  ##### Path
  
    <http://localhost:5000/service/user/:phone/:calificacion>

### Calificar al usuario

  #### Patch

  ##### Params

    telefono del conductor

  ##### Path
  
  <http://localhost:5000/service/drivers/:phone/:calificacion>

### Terminar servicio

  #### Patch

  ##### Params

    telefono del conductor

  ##### Path
  
  <http://localhost:5000/service/drivers/end/:phone>

### Obtener servicios usuario

  #### Get

  ##### Params

    telefono del usuario

  ##### Path
  
  <http://localhost:5000/services/user/all/:phone>

### Obtener servicios conductor

  #### Get

  ##### Params

    telefono del conductor

  ##### Path
  
  <http://localhost:5000/services/driver/all/:phone>

## Favorites

### Crear ubicacion Favorita

  #### Post

  ##### Params

    telefono del usuario, nombre del favorito, latitud, longitud

  ##### Path
  
  <http://localhost:5000/favorites/user/:phone/:name/:lat/:lng>
  
### Obtener ubicaciones usuario

  #### Get

  ##### Params

    telefono del usuario

  ##### Path
  
  <http://localhost:5000/favorites/user/:phone>

### Borra una ubicacion favorita

  #### Delete

  ##### Params

    telefono del usuario, nombre del favorito
  ##### Path
  
  <http://localhost:5000/favorites/user/:phone/:name>

## Reports

### Crea un reporte

  #### Post

  ##### Params

    placa del taxi, latitud, longitud

  ##### Path
  
  <http://localhost:5000/report/user/taxi/:placa/:lat/:lng>