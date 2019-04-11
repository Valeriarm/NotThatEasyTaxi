//Crea una Solicitud recibiendo, telefono del usuario y coordenadas del usuario
//El encargado de crear una solicitud es el usuario
var createRequest =(req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(`Error`, errors.array())
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
      console.log(`DATA: del servicio `, data)
      res.send(`Solicitud de servicio creada`)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`En este momento no hay conductores disponibles, por favor intentelo de nuevo mas tarde`)
    })
  };

//Busca por solicitudes activas conductor  
var readRequestDriver = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(JSON.stringify("Credenciales invalidas"));
  }
  const phone = req.params.phone
  db.one(`SELECT buscar_solicitudes_usuario($1)`, [escape(phone)])
    .then(function (data) {
      console.log(`DATA:`, data.buscar_solicitudes)
      res.send(JSON.stringify(data.buscar_solicitudes))
    })
    .catch(function (error) {
      console.log(`ERROR:`, error)
      res.send(JSON.stringify("Credenciales invalidas"))
    })
  };

//Busca por solicitudes activas conductor
var readRequestUser =  (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(JSON.stringify("Credenciales invalidas"));
  }
  const placa = req.params.placa
  const phone = req.params.phone
  db.one(`SELECT buscar_solicitudes_conductor($1, $2)`, [escape(placa), escape(phone)])
    .then(function (data) {
      console.log(`DATA: El id de la solicitud es:`, data.buscar_solicitudes_conductor)
      res.send(JSON.stringify(data.buscar_solicitudes_conductor))
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
}