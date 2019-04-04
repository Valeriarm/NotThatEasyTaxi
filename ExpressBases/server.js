const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const pgp = require('pg-promise')(/*options*/)
const db = pgp('postgres://Marthox:Marthox2299@localhost:5432/ProyectoBases')

app.use(cors())

// GET REQUESTS

/**
 * Valida los usuario recibiendo telefono y contraseña
 */
app.get('/users/:phone/:psword', (req, res) => {
  console.log(req.params.phone + "-" + req.params.psword)
  db.one('SELECT validarUsuario($1 ,$2)', [escape(req.params.phone), escape(req.params.psword)])
  .then(function (data) {
    console.log('DATA:', data.validarUsuario)
    res.send(JSON.stringify(data.validarUsuario))
  })
  .catch(function (error) {
    console.log('ERROR:', error)
    res.send(JSON.stringify("Credenciales invalidas"))
  })
})
/**
 * Valida los Conductores recibiendo telefono y contraseña
 */
app.get('/drivers/:phone/:psword', (req, res) => {
  console.log(req.params.phone + "-" + req.params.psword)
  db.one('SELECT validarconductor($1 ,$2)', [escape(req.params.phone), escape(req.params.psword)])
  .then(function (data) {
    console.log('DATA:', data.validarconductor)
    res.send(JSON.stringify(data.validarconductor))
  })
  .catch(function (error) {
    console.log('ERROR:', error)
    res.send(JSON.stringify("Credenciales invalidas"))
  })
})
/**
 * Valida cuando un conductor quiera manejar un taxi recibiendo telefono del conductor
 * y placa del vehiculo
 */
app.get('/drivers/taxi/:phone/:placa', (req, res) => {
  console.log(req.params.phone + "-" + req.params.psword)
  db.one('SELECT manejarTaxi($1 ,$2)', [escape(req.params.phone), escape(req.params.placa)])
  .then(function (data) {
    console.log('DATA:', data.manejarTaxi)
    res.send(JSON.stringify(data.manejarTaxi))
  })
  .catch(function (error) {
    console.log('ERROR:', error)
    res.send(JSON.stringify("Credenciales invalidas"))
  })
})

// POST REQUESTS

/**
 * Crea un usuario recibiendo, numero de telefono, contraseña, nombre
 * apellido, fecha de nacimiento, correo y numero de tarjeta
 */
app.post('/users/:tel/:psword/:nombre/:apellido/:fechanac/:mail/:tarjeta', (req, res) => {
  db.none('INSERT INTO usuario VALUES($1,$2,$3,$4,$5,$6,$7)',
    [escape(req.params.tel), escape(req.params.psword), escape(req.params.nombre), 
      escape(req.params.apellido), escape(req.params.fechanac), escape(req.params.mail), 
      escape(req.params.tarjeta)])
      .then((data)=>{
        console.log(req.params)
        res.send('Usuario creado exitosamente')
      })
      .catch((error)=>{
        console.log(req.params)
        console.log('ERROR', error)
        res.send('Error creando el usuario, por favor intentelo de nuevo')
      })
    })
/**
 * Crea un Conductor recibiendo, numero de telefono, contraseña, nombre
 * apellido, fecha de nacimiento, correo y numero de cuenta
 */
app.post('/drivers/:tel/:psword/:nombre/:apellido/:fechanac/:mail/:cuenta', (req, res) => {
  db.none('INSERT INTO conductor VALUES($1,$2,$3,$4,$5,$6,$7)',
    [escape(req.params.tel), escape(req.params.psword), escape(req.params.nombre), 
      escape(req.params.apellido), escape(req.params.fechanac), escape(req.params.mail),
      escape(req.params.cuenta)])
      .then((data)=>{
        console.log('DATA: ', data)
        console.log(req.params)
        res.send('Conductor creado exitosamente')
      })
      .catch((error)=>{
        console.log('ERROR', error)
        console.log(req.params)
        res.send('Error creando el conductor, por favor intentelo de nuevo')
      })
    })
/**
 * Crea un Taxi recibiendo, placa, marca, modelo, anio
 * baul, soat y, ocupado
 */
app.post('/taxi/:placa/:marca/:modelo/:anio/:baul/:soat/:ocupado', (req, res) => {
  db.none('INSERT INTO taxi VALUES($1,$2,$3,$4,$5,$6,$7)',
    [escape(req.params.placa), escape(req.params.marca), escape(req.params.modelo), 
      escape(req.params.anio), escape(req.params.baul), escape(req.params.soat), 
      escape(req.params.ocupado)])
    .then((data)=>{
      console.log('DATA: ', data)
      res.send('Taxi creado exitosamente')
    })
    .catch((error)=>{
      console.log('ERROR', error)
      res.send('Error creando el taxi, por favor intentelo de nuevo')
    })
})

// PUT REQUESTS

/**
 * Actualiza un usuario recibiendo, numero de telefono, contraseña, nombre
 * apellido, fecha de nacimiento, correo y numero de tarjeta
 */
app.put('/users/:tel/:psword/:nombre/:apellido/:mail/:tarjeta', (req, res) => {
  db.none('UPDATE usuario SET contrasenia=$2, nombreUsuario=$3, apellidoUsuario=$4, email=$5, numTarjeta=$6 WHERE telefonoUsuario=$1',
    [escape(req.params.tel), escape(req.params.psword), escape(req.params.nombre), 
      escape(req.params.apellido), escape(req.params.mail),  escape(req.params.tarjeta)])
      .then((data)=>{
        console.log('DATA: ', data)
        res.send('Usuario actualizado exitosamente')
      })
      .catch((error)=>{
        console.log('ERROR', error)
        res.send('Error actualizando el usuario, por favor intentelo de nuevo')
      })
    })
/**
 * Actualiza un Conductor recibiendo, numero de telefono, contraseña, nombre
 * apellido, fecha de nacimiento, correo y numero de cuenta
 */
app.put('/drivers/:phone/:psword/:nombre/:apellido/:mail/:cuenta', (req, res) => {
  db.none('UPDATE usuario SET contrasenia=$2, nombreConductor=$3, apellidoConductor=$4, email=$5, numCuenta=$6 WHERE phone=$1',
    [escape(req.params.uname), escape(req.params.psword), escape(req.params.nombre), 
      escape(req.params.apellido), escape(req.params.mail), escape(req.params.cuenta)])
      .then((data)=>{
        console.log('DATA: ', data)
        res.send('Conductor actualizado exitosamente')
      })
      .catch((error)=>{
        console.log('ERROR', error)
        res.send('Error actualizando el conductor, por favor intentelo de nuevo')
      })
    })
/**
 * Actualiza un Taxi recibiendo, placa, marca, modelo, anio
 * baul, soat y, ocupado
 */
app.put('/taxi/:placa/:soat', (req, res) => {
  db.none('UPDATE taxi SET soat=$2 WHERE placa=$1',
    [escape(req.params.placa), escape(req.params.soat)])
    .then((data)=>{
      console.log('DATA: ', data)
      res.send('Taxi creado exitosamente')
    })
    .catch((error)=>{
      console.log('ERROR', error)
      res.send('Error creando el taxi, por favor intentelo de nuevo')
    })
})


//////////////////////////////////////////////////////////////////////////////////
////////////////////////////    EJEMPLOOOOOOOOOOOS   /////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.send('I am a get request!')
})



/* OTRA FORMA DE OBTENER LOS DATOS
app.get('/users/prueba', (req, res) => {
  const {username, password}=req.query
  db.one('SELECT validarUsuario($1 ,$2)', [username, password])
  .then(function (data) {
    console.log('DATA:', data.validarusuario)
    res.send(JSON.stringify(data.validarusuario))
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })
})
*/

/*
app.get('/users/:userid', (req, res) => {
  console.log(req.params.userid)
  res.send(req.params.userid)
})
*/
//POST REQUESTS

app.post('/', (req, res) =>{
  res.send("I am a post request!")
})

app.post('/users', (req, res) =>{
  db.one('SELECT $1 AS value', 123)
  .then(function (data) {
    console.log('DATA:', data.value)
    res.send(JSON.stringify(data.value))
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })
})

app.post('/users/:newuser', (req, res) =>{
  console.log(req.params)
  res.send(JSON.stringify(req.params.newuser))
})

//PUT REQUESTS

app.put('/', (req, res) =>{
  res.send("I am a put request!")
})

app.put('/users', (req, res) =>{
  db.one('SELECT $1 AS value', 123)
  .then(function (data) {
    console.log('DATA:', data.value)
    res.send(JSON.stringify(data.value))
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })
})

app.put('/users/:newuser', (req, res) =>{
  console.log(req.params)
  res.send(JSON.stringify(req.params.newuser))
})

//LISTENER

app.listen(port, () => console.log(`Example app listening on port ${port}!`))