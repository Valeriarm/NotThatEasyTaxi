//Crea un Servicio recibiendo, telefono del usuario, telefono del conductor,
//placa del taxi, hora de inicio, hora de llegada, comprobante de pago usuario y 
//comprobante de pago conductor
//El encargado de crear un servicio es el conductor
var createService = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  console.log(req.params)
  if (!errors.isEmpty()) {
    console.log(`Error`, errors.array())
    return res.send(`Error en Crear servicio`);
  }
  const idSolicitud = parseInt(req.params.idsolicitud);
  const horaInicio = new Date();
  console.log(idSolicitud)
  db.one(`SELECT insertar_servicio($1, $2)`,
    [idSolicitud, horaInicio])
    .then((data) => {
      console.log(`DATA: estoy creando el servicio`, data)
      res.send(`Servicio creado`)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`Error en creacion del servicio`)
    })
};

//Busca por servicios activos usuario
//El usuario constantemente estara usando esta consulta para ver si el servicio que ha solicitado
//ha sido aceptado
var readServiceUser = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(JSON.stringify("Credenciales invalidas"));
  }
  const phone = req.params.phone
  db.one(`SELECT buscar_servicios($1)`, [escape(phone)])
    .then(function (data) {
      console.log(`DATA:`, data.buscar_servicios)
      res.send(JSON.stringify(data.buscar_servicios))
    })
    .catch(function (error) {
      console.log(`ERROR:`, error)
      res.send(JSON.stringify("Credenciales invalidas"))
    })
};

//Busca por servicios terminados
var readServiceFinished = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({errors: errors.array()})
    return res.send(JSON.stringify("Credenciales invalidas"));
  }
  const idservicio = req.params.idservicio
  db.one(`SELECT buscar_servicios_terminados($1)`, 
    [escape(idservicio)])
    .then(function (data) {
      console.log(`DATA: en terminando servicio`, data.buscar_servicios_terminados)
      res.send(JSON.stringify(data.buscar_servicios_terminados))
    })
    .catch(function (error) {
      console.log(`ERROR:`, error)
      res.send(JSON.stringify("Credenciales invalidas"))
    })
};

//Obtiene todos los servicios pedidos por el usuario
var readServicesUser = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.status(422).json({ errors: errors.array() });
  }
  const phone = req.params.phone;
  db.any(`SELECT * FROM servicio WHERE usuario=$1 AND terminado=false`,
    [escape(phone)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.send(data)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`no se pudo realizar la consulta`)
    })
}

//Obtiene todos los servicios pedidos por el usuario
var readServicesDriver = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.status(422).json({ errors: errors.array() });
  }
  const phone = req.params.phone;
  db.any(`SELECT * FROM servicio WHERE conductor=$1 AND terminado=false`,
    [escape(phone)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.send(data)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`no se pudo realizar la consulta`)
    })
}

//El Usuario modifica el servicio para ponerle la calificacion al conductor
var updateServiceUserScore = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.status(422).json({ errors: errors.array() });
  }
  const phone = req.params.phone;
  const score = req.params.score;
  db.none(`SELECT calificar_conductor ($1, $2)`,
    [escape(phone), escape(score)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.send(`El servicio ha sido calificado`)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`Error calificando el servicio`)
    })
};

//El Conductor modifica el servicio para ponerle la calificacion al usuario
var updateServiceDriverScore = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.status(422).json({ errors: errors.array() });
  }
  const phone = req.params.phone;
  const score = req.params.score;
  db.none(`SELECT calificar_usuario ($1, $2)`,
    [escape(phone), escape(score)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.send(`El servicio ha sido calificado`)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`Error calificando el servicio`)
    })
};

var updateServiceFinshed = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.status(422).json({ errors: errors.array() });
  }
  const phone = req.params.phone;
  db.none(`UPDATE servicio SET terminado=true WHERE conductor=$1 AND terminado=false`,
    [escape(phone)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.send(`El servicio ha terminado`)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`no se pudo terminar el servicio`)
    })
};


module.exports = {
  createService,
  readServiceUser,
  readServiceFinished,
  readServicesUser,
  readServicesDriver,
  updateServiceUserScore,
  updateServiceDriverScore,
  updateServiceFinshed,
}