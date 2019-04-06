const express = require(`express`);
const cors = require(`cors`);
const app = express();
const port = 5000;
const { check, validationResult } = require('express-validator/check');
const pgp = require('pg-promise')(/*options*/);

const connectionAdminOptions = {host: 'localhost',port: 5432,database: 'ProyectoBases',
  user: 'Marthox',password: 'Marthox2299',poolSize: 20,poolIdleTimeout: 10000};
const db = pgp(connectionAdminOptions);

const connectionUserCreateOptions = {host: 'localhost',port: 5432,database: 'ProyectoBases',
  user: 'Marthox',password: 'Marthox2299',poolSize: 20,poolIdleTimeout: 10000};
const dbcu = pgp(connectionUserCreateOptions);

const connectionUserReadOptions = {host: 'localhost',port: 5432,database: 'ProyectoBases',
  user: 'Marthox',password: 'Marthox2299',poolSize: 20,poolIdleTimeout: 10000};
const dbru = pgp(connectionUserReadOptions);

const connectionUserUpdateOptions = {host: 'localhost',port: 5432,database: 'ProyectoBases',
  user: 'Marthox',password: 'Marthox2299',poolSize: 20,poolIdleTimeout: 10000};
const dbuu = pgp(connectionUserUpdateOptions);

const connectionUserDeleteOptions = {host: 'localhost',port: 5432,database: 'ProyectoBases',
  user: 'Marthox',password: 'Marthox2299',poolSize: 20,poolIdleTimeout: 10000};
const dbdu = pgp(connectionUserDeleteOptions);

const connectionDriverCreateOptions = {host: 'localhost',port: 5432,database: 'ProyectoBases',
  user: 'Marthox',password: 'Marthox2299',poolSize: 20,poolIdleTimeout: 10000};
const dbcd = pgp(connectionDriverCreateOptions);

const connectionDriverReadOptions = {host: 'localhost',port: 5432,database: 'ProyectoBases',
  user: 'Marthox',password: 'Marthox2299',poolSize: 20,poolIdleTimeout: 10000};
const dbrd = pgp(connectionDriverReadOptions);

const connectionDriverUpdateOptions = {host: 'localhost',port: 5432,database: 'ProyectoBases',
  user: 'Marthox',password: 'Marthox2299',poolSize: 20,poolIdleTimeout: 10000};
const dbud = pgp(connectionDriverUpdateOptions);

const connectionDriverDeleteOptions = {host: 'localhost',port: 5432,database: 'ProyectoBases',
  user: 'Marthox',password: 'Marthox2299',poolSize: 20,poolIdleTimeout: 10000};
const dbdd = pgp(connectionDriverDeleteOptions);

const connectionTaxiCreateOptions = {host: 'localhost',port: 5432,database: 'ProyectoBases',
  user: 'Marthox',password: 'Marthox2299',poolSize: 20,poolIdleTimeout: 10000};
const dbct = pgp(connectionTaxiCreateOptions);

const connectionTaxiReadOptions = {host: 'localhost',port: 5432,database: 'ProyectoBases',
  user: 'Marthox',password: 'Marthox2299',poolSize: 20,poolIdleTimeout: 10000};
const dbrt = pgp(connectionTaxiReadOptions);

const connectionTaxiUpdateOptions = {host: 'localhost',port: 5432,database: 'ProyectoBases',
  user: 'Marthox',password: 'Marthox2299',poolSize: 20,poolIdleTimeout: 10000};
const dbut = pgp(connectionTaxiUpdateOptions);

const connectionTaxiDeleteOptions = {host: 'localhost',port: 5432,database: 'ProyectoBases',
  user: 'Marthox',password: 'Marthox2299',poolSize: 20,poolIdleTimeout: 10000};
const dbdt = pgp(connectionTaxiDeleteOptions);

app.use(cors())
app.use(express.json());

// GET REQUESTS

/**
 * Valida los usuario recibiendo telefono y contraseña
 */
app.get(`/users/:phone/:psword`,[
  check(`phone`).isNumeric().isLength({min:15, max:15}),
  check(`psword`).isLength({min:8})
],(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({errors: errors.array()})
    return res.status(422).json({ errors: errors.array() });
  }
  const phone = req.params.phone;
  const psword = req.params.psword;
  console.log(phone + "-" + psword)
  db.one(`SELECT validarusuario($1 ,$2)`, [escape(phone), escape(psword)])
  .then(function (data) {
    console.log(`DATA:`, data.validarusuario)
    res.send(JSON.stringify(data.validarusuario))
  })
  .catch(function (error) {
    console.log(`ERROR:`, error)
    res.send(JSON.stringify("Credenciales invalidas"))
  })
})
/**
 * Valida los Conductores recibiendo telefono y contraseña
 */
app.get(`/drivers/:phone/:psword`, [
  check(`phone`).isNumeric().isLength({min:15, max:15}),
  check(`psword`).isLength({min:8})
],(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({errors: errors.array()})
    return res.status(422).json({ errors: errors.array() });
  }
  const phone = req.params.phone;
  const psword = req.params.psword;
  console.log(phone + "-" + psword)
  db.one(`SELECT validarconductor($1 ,$2)`, [escape(phone), escape(psword)])
  .then(function (data) {
    console.log(`DATA:`, data.validarconductor)
    res.send(JSON.stringify(data.validarconductor))
  })
  .catch(function (error) {
    console.log(`ERROR:`, error)
    res.send(JSON.stringify("Credenciales invalidas"))
  })
})
/**
 * Valida cuando un conductor quiera manejar un taxi recibiendo telefono del conductor
 * y placa del vehiculo
 */
app.get(`/drivers/taxi/:phone/:placa`,[
  check(`phone`).isNumeric().isLength({min:15, max:15}),
  check(`placa`).isAlphanumeric().isLength({min:6, max:6})
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({errors: errors.array()})
    return res.status(422).json({ errors: errors.array() });
  }
  const phone = req.params.phone;
  const placa = req.params.placa
  console.log(phone + "-" + placa)
  db.one(`SELECT manejarTaxi($1 ,$2)`, [escape(phone), escape(placa)])
  .then(function (data) {
    console.log(`DATA:`, data.manejarTaxi)
    res.send(JSON.stringify(data.manejarTaxi))
  })
  .catch(function (error) {
    console.log(`ERROR:`, error)
    res.send(JSON.stringify("Credenciales invalidas"))
  })
})

// POST REQUESTS

/**
 * Crea un usuario recibiendo, numero de telefono, contraseña, nombre
 * apellido, fecha de nacimiento, correo y numero de tarjeta
 */
app.post(`/users/:tel/:psword/:nombre/:apellido/:fechanac/:mail/:tarjeta`, [
  check(`tel`).isNumeric().isLength({min:15, max:15}),
  check(`psword`).isLength({min:8}),
  check(`nombre`).isAlpha(),
  check(`apellido`).isAlpha(),
  check(`fechanac`).isLength({min:10}),
  check(`fechanac`).custom(value =>{
    value=value.split("-");
    console.log(value)
    if(isNaN(value[0])){
      return false
    } else if (isNaN(value[1]) || value[1].length!==2){
      return false
    } else if (isNaN(value[2]) || value[2].length!==2){
      return false
    } else {return true}
  }),
  check(`mail`).isEmail(),
  check(`tarjeta`).isNumeric(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({errors: errors.array()})
      return res.status(422).json({ errors: errors.array() });
    }
    const tel=req.params.tel;
    const psword=req.params.psword;
    const nombre=req.params.nombre;
    const apellido=req.params.apellido;
    const fechanac=req.params.fechanac;
    const mail=req.params.mail;
    const tarjeta=req.params.tarjeta;
    db.none(`INSERT INTO usuario VALUES($1,$2,$3,$4,$5,$6,$7)`,
      [escape(tel), escape(psword), escape(nombre), 
        escape(apellido), escape(fechanac), escape(mail), 
        escape(tarjeta)])
        .then((data)=>{
          console.log(`DATA: `, data)
          res.send(`Usuario creado exitosamente`)
        })
        .catch((error)=>{
          console.log(req.params)
          console.log(`ERROR`, error)
          res.send(error.detail)
        })
  })
/**
 * Crea un Conductor recibiendo, numero de telefono, contraseña, nombre
 * apellido, fecha de nacimiento, correo y numero de cuenta
 */
app.post(`/drivers/:tel/:psword/:nombre/:apellido/:fechanac/:mail/:cuenta`,[
  check(`tel`).isNumeric().isLength({min:15, max:15}),
  check(`psword`).isLength({min:8}),
  check(`nombre`).isAlpha(),
  check(`apellido`).isAlpha(),
  check(`fechanac`).isLength({min:10}),
  check(`fechanac`).custom(value =>{
    value=value.split("-");
    console.log(value)
    if(isNaN(value[0])){
      return false
    } else if (isNaN(value[1]) || value[1].length!==2){
      return false
    } else if (isNaN(value[2]) || value[2].length!==2){
      return false
    } else {return true}
  }),
  check(`mail`).isEmail(),
  check(`cuenta`).isNumeric(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({errors: errors.array()})
      return res.status(422).json({ errors: errors.array() });
    }
    const tel=req.params.tel;
    const psword=req.params.psword;
    const nombre=req.params.nombre;
    const apellido=req.params.apellido;
    const fechanac=req.params.fechanac;
    const mail=req.params.mail;
    const cuenta=req.params.cuenta;
    db.none(`INSERT INTO conductor VALUES($1,$2,$3,$4,$5,$6,$7)`,
      [escape(tel), escape(psword), escape(nombre), 
        escape(apellido), escape(fechanac), escape(mail),
        escape(cuenta)])
        .then((data)=>{
          console.log(`DATA: `, data)
          res.send(`Conductor creado exitosamente`)
        })
        .catch((error)=>{
          console.log(`ERROR`, error)
          res.send(error.detail)
        })
      })
/**
 * Crea un Taxi recibiendo, placa, marca, modelo, anio
 * baul, soat y, ocupado
 */
app.post('/taxi/:placa/:contrasenia/:marca/:modelo/:anio/:baul/:soat/:ocupado', [
  check('placa').isAlphanumeric().isLength({min:6,max:6}),
  check('contrasenia').isLength({min:8}),
  check('marca').isAlphanumeric(),
  check('modelo').isAlphanumeric(),
  check('anio').isNumeric().isLength({min:4}),
  check('baul').isAlpha(),
  check('soat').custom(value =>{
    value=value.split("-");
    console.log(value)
    if(isNaN(value[0]) || value[0].length!==2){
      return false
    } else if (isNaN(value[1]) || value[1].length!==2){
      return false
    } else if (isNaN(value[2])){
      return false
    } else {return true}
  }),
  check(`ocupado`).isBoolean(),
],(req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({errors: errors.array()})
      return res.status(422).json({ errors: errors.array() });
    }
  const placa = req.params.placa;
  const marca = req.params.marca;
  const modelo = req.params.modelo;
  const anio = req.params.anio;
  const baul = req.params.baul;
  const soat = req.params.soat;
  const ocupado = req.params.ocupado;
  const contrasenia = req.params.contrasenia;
  db.none('INSERT INTO taxi VALUES($1,$2,$3,$4,$5,$6,$7,$8)',
    [escape(placa), escape(contrasenia),escape(marca), escape(modelo), 
      escape(anio), escape(baul), escape(soat), 
      escape(ocupado)])
    .then((data)=>{
      console.log(`DATA: `, data)
      res.send(`Taxi creado exitosamente`)
    })
    .catch((error)=>{
      console.log(`ERROR`, error)
      res.send(`Error creando el taxi, por favor intentelo de nuevo`)
    })
})
/**
 * Crea una Ubicacion Favorita recibiendo, telefono del usuario y coordenadas
 */
app.post(`/users/favorites/:phone/:lat/:lng`, 
  [
    check(`phone`).isNumeric().isLength({min: 15, max: 15}),
    check(`lat`).isNumeric(),
    check(`lng`).isNumeric()
  ], (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({errors: errors.array()})
      return res.status(422).json({ errors: errors.array() });
    }
    const phone = req.params.phone;
    const lat = req.params.lat;
    const lng = req.params.lng;
    db.none(`INSERT INTO origenesfav VALUES ($1, ST_GeomFromText('POINT($2 $3)', 4326))`,
    [escape(phone), escape(lat), escape(lng)])
    .then((data)=>{
      console.log(`DATA: `, data)
      res.send(`Agergado a favoritos`)
    })
    .catch((error)=>{
      console.log(`ERROR`, error)
      res.send(`Error, por favor intentelo de nuevo`)
    })
  }
)

// PUT REQUESTS

/**
 * Actualiza un usuario recibiendo, numero de telefono, contraseña, nombre
 * apellido, fecha de nacimiento, correo y numero de tarjeta
 */
app.put(`/users/:tel/:psword/:nombre/:apellido/:mail/:tarjeta`, [
  check(`tel`).isNumeric().isLength({min:15,max:15}),
  check(`psword`).isLength({min:8}),
  check(`nombre`).isAlpha(),
  check(`apellido`).isAlpha(),
  check(`mail`).isEmail(),
  check(`tarjeta`).isNumeric(),
],(req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({errors: errors.array()})
      return res.status(422).json({ errors: errors.array() });
    }
  const tel = req.params.tel;
  const psword = req.params.psword;
  const nombre = req.params.nombre;
  const apellido = req.params.apellido;
  const mail = req.params.mail;
  const tarjeta = req.params.tarjeta;
  db.none(`UPDATE usuario SET contrasenia=$2, nombreUsuario=$3, apellidoUsuario=$4, email=$5, numTarjeta=$6 WHERE telefonoUsuario=$1`,
    [escape(tel), escape(psword), escape(nombre), 
      escape(apellido), escape(mail),  escape(tarjeta)])
      .then((data)=>{
        console.log(`DATA: `, data)
        res.send(`Usuario actualizado exitosamente`)
      })
      .catch((error)=>{
        console.log(`ERROR`, error)
        res.send(`Error actualizando el usuario, por favor intentelo de nuevo`)
      })
    })
/**
 * Actualiza un Conductor recibiendo, numero de telefono, contraseña, nombre
 * apellido, fecha de nacimiento, correo y numero de cuenta
 */
app.put(`/drivers/:phone/:psword/:nombre/:apellido/:mail/:cuenta`,[
  check(`phone`).isNumeric().isLength({min:15, max:15}),
  check(`psword`).isLength({min:8}),
  check(`nombre`).isAlpha(),
  check(`apellido`).isAlpha(),
  check(`mail`).isEmail(),
  check(`cuenta`).isNumeric(),
], (req, res) => {
  const errors = validationResult(req);
    if(!errors.isEmpty()){
      console.log({errors: errors.array()})
      return res.status(422).json({ errors: errors.array() });
    }
  const phone = req.params.phone;
  const psword = req.params.psword;
  const nombre = req.params.nombre;
  const apellido = req.params.apellido;
  const mail = req.params.mail;
  const cuenta = req.params.cuenta;
  db.none(`UPDATE usuario SET contrasenia=$2, nombreConductor=$3, apellidoConductor=$4, email=$5, numCuenta=$6 WHERE phone=$1`,
    [escape(phone), escape(psword), escape(nombre), 
      escape(apellido), escape(mail), escape(cuenta)])
      .then((data)=>{
        console.log(`DATA: `, data)
        res.send(`Conductor actualizado exitosamente`)
      })
      .catch((error)=>{
        console.log(`ERROR`, error)
        res.send(`Error actualizando el conductor, por favor intentelo de nuevo`)
      })
    })
/**
 * Actualiza un Taxi recibiendo, placa, marca, modelo, anio
 * baul, soat y, ocupado
 */
app.put(`/taxi/:placa/:soat`, [
  check(`placa`).isAlphanumeric().isLength({min:6, max:6}),
  check(`soat`).custom(value =>{
    value=value.split("-");
    console.log(value)
    if(isNaN(value[0]) || value[0].length!==2){
      return false
    } else if (isNaN(value[1]) || value[1].length!==2){
      return false
    } else if (isNaN(value[2])){
      return false
    } else {return true}
  }),
],(req, res) => {
  const errors = validationResult(req);
    if(!errors.isEmpty()){
      console.log({errors: errors.array()})
      return res.status(422).json({ errors: errors.array()});
    }
  const placa = req.params.placa;
  const soat = req.params.soat;
  db.none(`UPDATE taxi SET soat=$2 WHERE placa=$1`,
    [escape(placa), escape(soat)])
    .then((data)=>{
      console.log(`DATA: `, data)
      res.send(`Taxi creado exitosamente`)
    })
    .catch((error)=>{
      console.log(`ERROR`, error)
      res.send(`Error creando el taxi, por favor intentelo de nuevo`)
    })
})

/* OTRA FORMA DE OBTENER LOS DATOS
app.get(`/users/prueba`, (req, res) => {
  const {username, password}=req.query
  db.one(`SELECT validarUsuario($1 ,$2)`, [username, password])
  .then(function (data) {
    console.log(`DATA:`, data.validarusuario)
    res.send(JSON.stringify(data.validarusuario))
  })
  .catch(function (error) {
    console.log(`ERROR:`, error)
  })
})
*/

app.listen(port, () => console.log(`Example app listening on port ${port}!`))