//Crea una Solicitud recibiendo, telefono del usuario y coordenadas del usuario
//El encargado de crear una solicitud es el usuario
var createRequest =(req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(`Error createRequest`, errors.array())
    return res.send(`Error en Crear solicitud`);
  }
  const phone = req.params.phoneuser;
  const latIn = req.params.latin;
  const lngIn = req.params.lngin;
  const origen = `ST_GeomFromText('POINT(${latIn} ${lngIn})', 4326)`;
  const latFin = req.params.latfin;
  const lngFin = req.params.lngfin;
  const destino = `ST_GeomFromText('POINT(${latFin} ${lngFin})', 4326)`;
  db.none(`INSERT INTO solicitud VALUES (DEFAULT,$1,${origen},${destino})`,
    [escape(phone)])
    .then((data) => {
      console.log(`crudRequest createRequest `, data)
      res.send(`Solicitud de servicio creada`)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`En este momento no hay conductores disponibles, por favor intentelo de nuevo mas tarde`)
    })
  };

//Busca por solicitudes activas usuario  
var readRequestUser = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(`Error readRequestUser`, errors.array())
    return res.send(JSON.stringify("Credenciales invalidas"));
  }
  const phone = req.params.phone
  db.one(`SELECT buscar_solicitudes_usuario($1)`, [escape(phone)])
    .then(function (data) {
      console.log(`crudRequest readRequestUser `, data.buscar_solicitudes_usuario)
      res.send(JSON.stringify(data.buscar_solicitudes_usuario))
    })
    .catch(function (error) {
      console.log(`ERROR:`, error)
      res.send(JSON.stringify("Credenciales invalidas"))
    })
  };

//Busca por solicitudes canceladas usuario  
var readCanceledRequestUser = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(`Error readCanceledRequestUser`, errors.array())
    return res.send(JSON.stringify("Credenciales invalidas"));
  }
  const idrequest = req.params.idrequest
  db.one(`SELECT buscar_solicitudes_canceladas_usuario($1)`, escape(idrequest))
    .then(function (data) {
      console.log(`crudRequest readRequestUser `, data.buscar_solicitudes_canceladas_usuario)
      res.send(JSON.stringify(data.buscar_solicitudes_canceladas_usuario))
    })
    .catch(function (error) {
      console.log(`ERROR:`, error)
      res.send(JSON.stringify("Credenciales invalidas"))
    })
  };

//Busca por solicitudes activas conductor
var readRequestDriver =  (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(`Error readRequestDriver `, errors.array())
    return res.send(JSON.stringify("Credenciales invalidas"));
  }
  const phone = req.params.phone
  const placa = req.params.placa
  db.one(`SELECT buscar_solicitudes_conductor($1, $2)`, [escape(placa), escape(phone)])
    .then(function (data) {
      console.log(`crudRequest readRequestDriver `, data.buscar_solicitudes_conductor)
      res.send(JSON.stringify(data.buscar_solicitudes_conductor))
    })
    .catch(function (error) {
      console.log(`ERROR:`, error)
      res.send(JSON.stringify("Credenciales invalidas"))
    })
  };

//cancela solicitudes conductor
var cancelRequest =  (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(`Error cancelRequest `, errors.array())
    return res.send(JSON.stringify("Credenciales invalidas"));
  }
  const phone = req.params.phone
  db.one(`SELECT cancelar_solicitud($1)`, [escape(phone)])
    .then(function (data) {
      console.log(`crudRequest cancelRequest `, data.cancelar_solicitud)
      res.send(JSON.stringify(data.cancelar_solicitud))
    })
    .catch(function (error) {
      console.log(`ERROR:`, error)
      res.send(JSON.stringify("Credenciales invalidas"))
    })
  };


module.exports = {
  createRequest,
  readRequestUser,
  readRequestDriver,
  readCanceledRequestUser,
  cancelRequest,
}