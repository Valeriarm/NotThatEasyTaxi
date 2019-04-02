const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const pgp = require('pg-promise')(/*options*/)
const db = pgp('postgres://Marthox:Marthox2299@localhost:5432/ProyectoBases')

app.use(cors())

// GET REQUESTS

/**
 * Valida los usuario recibiendo nombre de usuario y contraseña
 */
app.get('/users/:userid/:psword', (req, res) => {
  console.log(req.params.userid + "-" + req.params.psword)
  db.one('SELECT validarUsuario($1 ,$2)', [req.params.userid, req.params.psword])
  .then(function (data) {
    console.log('DATA:', data.validarusuario)
    res.send(JSON.stringify(data.validarusuario))
  })
  .catch(function (error) {
    console.log('ERROR:', error)
    res.send(JSON.stringify("Credenciales invalidas"))
  })
})
/**
 * Valida los Conductores recibiendo nombre de usuario y contraseña
 */
app.get('/drivers/:username/:psword', (req, res) => {
  console.log(req.params.userid + "-" + req.params.psword)
  db.one('SELECT validarConductor($1 ,$2)', [req.params.username, req.params.psword])
  .then(function (data) {
    console.log('DATA:', data.validarConductor)
    res.send(JSON.stringify(data.validarConductor))
  })
  .catch(function (error) {
    console.log('ERROR:', error)
    res.send(JSON.stringify("Credenciales invalidas"))
  })
})
/**
 * Valida cuando un conductor quiera manejar un taxi recibiendo username del conductor
 * y placa del vehiculo
 */
app.get('/drivers/taxi/:username/:placa', (req, res) => {
  console.log(req.params.userid + "-" + req.params.psword)
  db.one('SELECT manejarTaxi($1 ,$2)', [req.params.username, req.params.placa])
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
 * Crea un usuario recibiendo, numero de telefono, nombre de usuario, contraseña, nombre
 * apellido, fecha de nacimiento, correo y numero de tarjeta
 */
app.post('/users/:tel/:psword/:nombre/:apellido/:fechanac/:mail/:tarjeta', (req, res) => {
  db.one('INSERT INTO usuario VALUES($1,$2,$3,$4,$5,$6,$7,$8)',
    [req.params.tel, req.params.psword, req.params.nombre, 
      req.params.apellido, req.params.fechanac, req.params.mail, req.params.tarjeta])
      .then((data)=>{
        console.log('DATA: ', data)
        res.send('Usuario creado exitosamente')
      })
      .catch((error)=>{
        console.log('ERROR', error)
        res.send('Error creando el usuario, por favor intentelo de nuevo')
      })
    })
/**
 * Crea un Conductor recibiendo, numero de telefono, nombre de usuario, contraseña, nombre
 * apellido, fecha de nacimiento, correo y numero de cuenta
 */
app.post('/drivers/:tel/:psword/:nombre/:apellido/:fechanac/:mail/:cuenta', (req, res) => {
  db.one('INSERT INTO conductor VALUES($1,$2,$3,$4,$5,$6,$7,$8)',
    [req.params.tel, req.params.psword, req.params.nombre, 
      req.params.apellido, req.params.fechanac, req.params.mail, req.params.cuenta])
      .then((data)=>{
        console.log('DATA: ', data)
        res.send('Conductor creado exitosamente')
      })
      .catch((error)=>{
        console.log('ERROR', error)
        res.send('Error creando el conductor, por favor intentelo de nuevo')
      })
    })
/**
 * Crea un Taxi recibiendo, placa, marca, modelo, anio
 * baul, soat y, ocupado
 */
app.post('/taxi/:placa/:marca/:modelo/:anio/:baul/:soat/:ocupado', (req, res) => {
  db.one('INSERT INTO taxi VALUES($1,$2,$3,$4,$5,$6,$7,$8)',
    [req.params.placa, req.params.marca, req.params.modelo, req.params.anio, 
    req.params.anio, req.params.baul, req.params.soat, req.params.ocupado])
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
 * Actualiza un usuario recibiendo, numero de telefono, nombre de usuario, contraseña, nombre
 * apellido, fecha de nacimiento, correo y numero de tarjeta
 */
app.put('/users/:tel/:psword/:nombre/:apellido/:mail/:tarjeta', (req, res) => {
  db.one('UPDATE usuario SET contrasenia=$2, nombreUsuario=$3, apellidoUsuario=$4, email=$5, numTarjeta=$6 WHERE telefonoUsuario=$1',
    [req.params.tel, req.params.psword, req.params.nombre, 
      req.params.apellido, req.params.mail, req.params.tarjeta])
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
 * Actualiza un Conductor recibiendo, numero de telefono, nombre de usuario, contraseña, nombre
 * apellido, fecha de nacimiento, correo y numero de cuenta
 */
app.put('/drivers/:uname/:psword/:nombre/:apellido/:mail/:cuenta', (req, res) => {
  db.one('UPDATE usuario SET contrasenia=$2, nombreConductor=$3, apellidoConductor=$4, email=$5, numCuenta=$6 WHERE username=$1',
    [req.params.uname, req.params.psword, req.params.nombre, 
      req.params.apellido, req.params.mail, req.params.cuenta])
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
  db.one('UPDATE taxi SET soat=$2 WHERE placa=$1',
    [req.params.placa, req.params.soat])
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