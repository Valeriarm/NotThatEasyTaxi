const express = require(`express`);
const cors = require(`cors`);
const pgp = require('pg-promise')(/*options*/);
const crudUser = require('./src/crudUser');
const crudDriver = require('./src/crudDriver');
const crudTaxi = require('./src/crudTaxi');
const crudRequest = require('./src/crudRequest');
const crudService = require('./src/crudService');
const crudFavorites = require('./src/crudFavorites');
const crudReport = require('./src/crudReport.js')
const validations = require('./src/customValidators.js');

const connectionAdminOptions = {
  host: 'localhost', port: 5432, database: 'ProyectoBases',
  user: 'postgres', password: 'postgres', poolSize: 20, poolIdleTimeout: 10000
};
const db = pgp(connectionAdminOptions);
/*
const connectionUserOptions = {host: 'localhost',port: 5432,database: 'ProyectoBases',
  user: 'usercrud',password: 'usercrud',poolSize: 20,poolIdleTimeout: 10000};
const dbu = pgp(connectionUserCreateOptions);

const connectionDriverOptions = {host: 'localhost',port: 5432,database: 'ProyectoBases',
  user: 'drivercrud',password: 'drivercrud',poolSize: 20,poolIdleTimeout: 10000};
const dbd = pgp(connectionUserReadOptions);
*/



const app = express();
const port = 5000;
const { check, validationResult } = require('express-validator/check');
app.use(cors())
app.use(express.json());



//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
////////////////////////////// CRUD USER ////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////



//Crea un usuario recibiendo, telefono, contrasenia, nombre
//apellido, fecha de nacimiento, correo y tarjeta de credito 
app.post(`/user/:phone/:psword/:name/:lastname/:birthday/:mail/:credcard`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`psword`).isLength({ min: 8 }),
  check(`name`).isAlpha(),
  check(`lastname`).isAlpha(),
  check(`birthday`).isLength({ min: 10 }),
  check(`birthday`).custom(value => validations.validateFecha(value)),
  check(`mail`).isEmail(),
  check(`credcard`).isNumeric(),
],(req,res)=>crudUser.createUser(req, res, validationResult, db))

//Obtiene los datos de un usuario para cargarlos en su perfil recibiendo
//el telefono
app.get(`/user/:phone/`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
], (req, res) => crudUser.readUser(req, res, validationResult, db))

//Actualiza un usuario recibiendo, telefono, contrasenia, nombre
//apellido, correo y tarjeta de credito 
app.patch(`/user/:phone/:psword/:name/:lastname/:mail/:credcard`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`psword`).isLength({ min: 8 }),
  check(`name`).isAlpha(),
  check(`lastname`).isAlpha(),
  check(`mail`).isEmail(),
  check(`credcard`).isNumeric(),
], (req, res) => crudUser.updateUser(req, res, validationResult, db))

//Borra un usuario recibiendo su telefono
app.delete(`/user/:phone`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
], (req, res) => crudUser.deleteUser(req, res, validationResult, db))

//Valida los usuario recibiendo telefono y contrasenia
app.get(`/user/:phone/:psword`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`psword`).isLength({ min: 8 })
], (req, res) => crudUser.validateUser(req, res, validationResult, db))

//Paga los servicios de un usuario recibiendo su telefono
app.patch(`/user/:phone/`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`psword`).isLength({ min: 8 })
],(req,res) => crudUser.payUser(req, res, validationResult, db))



//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
///////////////////////////// CRUD DRIVERS ///////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////



//Crea un Conductor recibiendo, telefono, contrasenia, nombre
//apellido, birthday, mail y numero de cuenta
app.post(`/driver/:phone/:psword/:name/:lastname/:birthday/:mail/:bankacc`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`psword`).isLength({ min: 8 }),
  check(`name`).isAlpha(),
  check(`lastname`).isAlpha(),
  check(`birthday`).isLength({ min: 10 }),
  check(`birthday`).custom(value => validations.validateFecha(value)),
  check(`mail`).isEmail(),
  check(`bankacc`).isNumeric(),
], (req,res) => crudDriver.createDriver(req, res, validationResult, db))

//Obtiene los datos de un conductor para cargarlos en su perfil recibiendo
//el telefono
app.get(`/driver/:phone/`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
], (req, res) => crudDriver.readDriver(req, res, validationResult, db))

//Actualiza un Conductor recibiendo, telefono, contrasenia, nombre
//apellido, mail y numero de cuenta
app.patch(`/driver/:phone/:psword/:name/:lastname/:mail/:bankacc`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`psword`).isLength({ min: 8 }),
  check(`name`).isAlpha(),
  check(`lastname`).isAlpha(),
  check(`mail`).isEmail(),
  check(`bankacc`).isNumeric(),
], (req, res) => crudDriver.updateDriver(req, res, validationResult, db))

//Borra un conductor recibiendo su telefono
app.delete(`/driver/:phone`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
], (req, res) => crudDriver.deleteDriver(req, res, validationResult, db))

//Valida los Conductores recibiendo telefono y contrasenia
app.get(`/driver/:phone/:psword`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`psword`).isLength({ min: 8 })
], (req, res) => crudDriver.validateDriver(req, res, validationResult, db))

//Valida cuando un conductor quiera manejar un taxi recibiendo telefono del conductor
//y placa del vehiculo
app.get(`/driver/taxi/:phone/:placa`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`placa`).custom(value => validations.validatePlaque(value)),
], (req, res) => crudDriver.validateManejar(req, res, validationResult, db))

//Redime los kilometros de un conductor recibiendo su telefono
app.patch(`/driver/:phone`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
], (req, res) => crudDriver.redeemDriver(req, res, validationResult, db))




//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
///////////////////////////// CRUD TAXIS /////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////



//Crea un Taxi recibiendo, placa, marca, modelo, anio
//baul, soat y, ocupado
app.post('/taxi/:phone/:placa/:contrasenia/:marca/:modelo/:anio/:baul/:soat/:ocupado', [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`placa`).custom(value => validations.validatePlaque(value)),
  check(`contrasenia`).isLength({ min: 8 }),
  check(`marca`).isAlphanumeric(),
  check(`modelo`).isAlphanumeric(),
  check(`anio`).isNumeric().isLength({ min: 4 }),
  check(`baul`).isAlpha(),
  check(`soat`).isLength({ min: 10 }),
  check(`soat`).custom(value => validations.validateFecha(value)),
  check(`ocupado`).isBoolean(),
], (req, res) => crudTaxi.createTaxi(req, res, validationResult, db))

//Obtiene los datos de un taxi para cargarlos en su perfil recibiendo
//la placa
app.get(`/taxi/:placa/`, [
  check(`placa`).custom(value => validations.validatePlaque(value)),
], (req, res) => crudTaxi.readTaxi(req, res, validationResult, db))

//Actualiza un Taxi recibiendo, placa, marca, modelo, anio
//baul, soat y, ocupado
app.patch(`/taxi/:placa/:soat`, [
  check(`placa`).custom(value => validations.validatePlaque(value)),
  check(`soat`).custom(value => validations.validateFecha(value)),
])

//Elimina un Taxi recibiendo su placa
app.delete(`/taxi/:placa`, [
  check(`placa`).custom(value => validations.validatePlaque(value)),
], (req, res) => crudTaxi.deleteTaxi(req, res, validationResult, db))

//Valida los Taxis recibiendo placa y password
app.get(`/taxi/:placa/:psword`, [
  check(`placa`).custom(value => validations.validatePlaque(value)),
  check(`psword`).isLength({ min: 8 })
], (req, res) => crudTaxi.validateTaxi(req, res, validationResult, db))



//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
///////////////////////////// CRUD REQUQEST //////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////



//Crea una Solicitud recibiendo, telefono del usuario y coordenadas del usuario
//El encargado de crear una solicitud es el usuario
app.post(`/request/user/:phoneuser/:latin/:lngin/:latfin/:lngfin`, [
  check(`phoneuser`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`latin`).isFloat(),
  check(`lngin`).isFloat(),
  check(`latfin`).isFloat(),
  check(`lngfin`).isFloat(),
], (req, res) => crudRequest.createRequest(req, res, validationResult, db))

//Busca por solicitudes activas usuario
app.get(`/request/user/:phone`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 })
], (req, res) => crudRequest.readRequestUser(req, res, validationResult, db))

//Busca por solicitudes activas conductor
app.get(`/request/drivers/taxi/:phone/:placa`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`placa`).custom(value => validations.validateFecha(value)),
], (req, res) => crudRequest.readRequesDriver(req, res, validationResult, db))



//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
///////////////////////////// CRUD SERVICE //////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////



//Crea un Servicio recibiendo, telefono del usuario, telefono del conductor,
//placa del taxi, hora de inicio, hora de llegada, comprobante de pago usuario y 
//comprobante de pago conductor
//El encargado de crear un servicio es el conductor
app.post(`/service/user/add/:idsolicitud`, [
  check(`idsolicitud`).isNumeric(),
], (req, res) => crudService.createService(req, res, validationResult, db))

//Busca por servicios activos usuario
//El usuario constantemente estara usando esta consulta para ver si el servicio que ha solicitado
//ha sido aceptado
app.get(`/service/user/:phone`, [
  check(`phone`).isNumeric().isLength({min:10, max:10})
], (req, res) => crudService.readServiceUser(req, res, validationResult, db))

//Busca por servicios terminados
app.get(`/service/finished/:idservicio`, [
  check(`idservicio`).isNumeric()
], (req, res) => crudService.readServiceFinished(req, res, validationResult, db))

//El Usuario modifica el servicio para ponerle la calificacion al conductor
app.patch(`/service/user/:phone/:calificacion`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`calificacion`).isFloat().custom(value => validations.validateScore(value)),
], (req, res ) => crudService.updateServiceUsercore(req, res, validationResult, db))

//El Conductor modifica el servicio para ponerle la calificacion al usuario
app.patch(`/service/drivers/:phone/:calificacion`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`calificacion`).isFloat().custom(value => validations.validateScore(value)),
])

//Terminar un servicio
app.put(`/service/drivers/end/:phone`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
], (req, res) => crudService.updateServiceFinsh(req, res, validationResult, db))

//Obtiene todos los servicios que ha tenido un usuario
app.get(`/services/user/all/:phone`,[
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
], (req, res) => crudService.readServicesUser(req, res, validationResult, db))

//Obtiene todos los servicios que ha tenido un conductor
app.get(`/services/driver/all/:phone`,[
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
], (req, res) => crudService.readServicesDriver(req, res, validationResult, db))



//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
///////////////////////////// CRUD FAVORITES /////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////



//Crea una Ubicacion Favorita recibiendo, telefono del usuario y coordenadas
app.post(`/favorites/user/:phone/:name/:lat/:lng`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`lat`).isFloat(),
  check(`lng`).isFloat(),
  check(`name`).isAlphanumeric(),
], (req, res) => crudFavorites.createFavorites(req, res, validationResult, db))

//Obtiene las ubicaciones favoritas de un usuario
app.get(`/favorites/user/:phone`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
], (req, res) => crudFavorites.readFavorites(req, res, validationResult, db))

//Borra una ubicacion favorita de un usuario recibiendo
app.delete(`/favorites/user/:phone/:name`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`name`).isAlphanumeric(),
], (req, res) => crudFavorites.deleteFavorites(req, res, validationResult, db))



//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
///////////////////////////// CRUD REPORTS ///////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////



//Crea un reporte para un taxi recibiendo la placa del taxi 
//la hora actual y la coordenada en la que se encuentra
app.post(`/report/user/taxi/:placa/:lat/:lng`,
  [
    check('placa').custom(value => validations.validatePlaque(value)),
    check(`lat`).isFloat(),
    check(`lng`).isFloat()
  ], (req, res) => crudReport.createReport(req, res, validationResult, db))



//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
///////////////////////////// CONECTION //////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////



app.listen(port, () => console.log(`Example app listening on port ${port}!`))