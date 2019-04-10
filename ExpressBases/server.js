const express = require(`express`);
const cors = require(`cors`);
const app = express();
const port = 5000;
const { check, validationResult } = require('express-validator/check');
const pgp = require('pg-promise')(/*options*/);

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
app.use(cors())
app.use(express.json());

// GET REQUESTS

/**
 * Valida los usuario recibiendo telefono y contraseña
 */
app.get(`/users/:phone/:psword`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`psword`).isLength({ min: 8 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(JSON.stringify("Credenciales invalidas"));
  }
  const phone = req.params.phone;
  const psword = req.params.psword;
  console.log(phone + "-" + psword)
  db.one(`SELECT validar_usuario($1 ,$2)`, [escape(phone), escape(psword)])
    .then(function (data) {
      console.log(`DATA:`, data.validar_usuario)
      res.send(JSON.stringify(data.validar_usuario))
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
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`psword`).isLength({ min: 8 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(JSON.stringify("Credenciales invalidas"));
  }
  const phone = req.params.phone;
  const psword = req.params.psword;
  console.log(phone + "-" + psword)
  db.one(`SELECT validar_conductor($1 ,$2)`, [escape(phone), escape(psword)])
    .then(function (data) {
      console.log(`DATA:`, data.validar_conductor)
      res.send(JSON.stringify(data.validar_conductor))
    })
    .catch(function (error) {
      console.log(`ERROR:`, error)
      res.send(JSON.stringify("Credenciales invalidas"))
    })
})
/**
 * Valida los Taxis recibiendo placa y contraseña
 */
app.get(`/taxi/:placa/:psword`, [
  check('placa').isAlphanumeric().isLength({ min: 6, max: 6 }).custom(value => {
    console.log(value)
    value = value.split('');
    const letters = /^[A-Z]+$/;
    if (!value[0].match(letters) || !value[1].match(letters) || !value[2].match(letters)) {
      console.log("problema en letras")
      return false;
    } else if (isNaN(value[3]) || isNaN(value[4]) || isNaN(value[5])) {
      console.log("problema en numeros")
      return false;
    } else { return true }
  }),
  check(`psword`).isLength({ min: 8 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.status(422).json({ errors: errors.array() });
  }
  const placa = req.params.placa;
  const psword = req.params.psword;
  console.log(placa + "-" + psword)
  db.one(`SELECT validar_taxi($1 ,$2)`, [escape(placa), escape(psword)])
    .then(function (data) {
      console.log(`DATA:`, data.validar_taxi)
      res.send(JSON.stringify(data.validar_taxi))
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
app.get(`/drivers/taxi/:phone/:placa`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
  check('placa').isAlphanumeric().isLength({ min: 6, max: 6 }).custom(value => {
    console.log(value)
    value = value.split('');
    const letters = /^[A-Z]+$/;
    if (!value[0].match(letters) || !value[1].match(letters) || !value[2].match(letters)) {
      console.log("problema en letras")
      return false;
    } else if (isNaN(value[3]) || isNaN(value[4]) || isNaN(value[5])) {
      console.log("problema en numeros")
      return false;
    } else { return true }
  }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(`Credenciales invalidas`);
  }
  const phone = req.params.phone;
  const placa = req.params.placa
  console.log(phone + "-" + placa)
  db.one(`SELECT manejar_taxi($1 ,$2)`, [escape(phone), escape(placa)])
    .then(function (data) {
      console.log(`DATA:`, data.manejar_taxi)
      res.send(data.manejar_taxi)
    })
    .catch(function (error) {
      console.log(`ERROR:`, error)
      res.send(`Credenciales invalidas`);
    })
})

/**
 * Busca por solicitudes activas conductor
 */
app.get(`/drivers/taxi/request/:phone/:placa`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
  check('placa').isAlphanumeric().isLength({ min: 6, max: 6 }).custom(value => {
    console.log(value)
    value = value.split('');
    const letters = /^[A-Z]+$/;
    if (!value[0].match(letters) || !value[1].match(letters) || !value[2].match(letters)) {
      console.log("problema en letras")
      return false;
    } else if (isNaN(value[3]) || isNaN(value[4]) || isNaN(value[5])) {
      console.log("problema en numeros")
      return false;
    } else { return true }
  }),
], (req, res) => {
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
})
/**
 * Busca por solicitudes activas usuario
 */
app.get(`/user/request/:phone`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 })
], (req, res) => {
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
})
/**
 * Busca por servicios activos usuario
 * El usuario constantemente estara usando esta consulta para ver si el servicio que ha solicitado
 * ha sido aceptado
 */
app.get(`/services/users/:phone`, [
  check(`phone`).isNumeric().isLength({min:10, max:10})
], (req, res) => {
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
})
/**
 * Busca por servicios terminados
 */
app.get(`/services/users/finished/:idservicio`,[
  check(`idservicio`).isNumeric()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({errors: errors.array()})
    return res.send(JSON.stringify("Credenciales invalidas"));
  }
  const idservicio = req.params.idservicio
  db.one(`SELECT buscar_servicios_terminados($1)`, [escape(idservicio)])
  .then(function (data) {
    console.log(`DATA: en terminando servicio`, data.buscar_servicios_terminados)
    res.send(JSON.stringify(data.buscar_servicios_terminados))
  })
  .catch(function (error) {
    console.log(`ERROR:`, error)
    res.send(JSON.stringify("Credenciales invalidas"))
  })
})
/**
 * Obtiene los datos de un conductor para cargarlos en su perfil
 */
app.get(`/drivers/:phone/`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(JSON.stringify("Credenciales invalidas"));
  }
  const phone = req.params.phone;
  db.one(`SELECT * FROM conductor WHERE telefonoconductor= $1`, [escape(phone)])
    .then(function (data) {
      console.log(data)
      res.send(JSON.stringify(data))
    })
    .catch(function (error) {
      console.log(`ERROR:`, error)
      res.send(JSON.stringify("Credenciales invalidas"))
    })
})

/**
 * Obtiene los datos de un usuario para cargarlos en su perfil
 */
app.get(`/users/:phone/`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(JSON.stringify("Credenciales invalidas"));
  }
  const phone = req.params.phone;
  db.one(`SELECT * FROM conductor WHERE telefonousuario= $1`, [escape(phone)])
    .then(function (data) {
      console.log(data)
      res.send(JSON.stringify(data))
    })
    .catch(function (error) {
      console.log(`ERROR:`, error)
      res.send(JSON.stringify("Credenciales invalidas"))
    })
})


/**
 * Obtiene los datos de un usuario para cargarlos en su perfil
 */
app.get(`/users/:phone/`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(JSON.stringify("Credenciales invalidas"));
  }
  const phone = req.params.phone;
  db.one(`SELECT * FROM usuario WHERE telefonousuario= $1`, [escape(phone)])
    .then(function (data) {
      console.log(data)
      res.send(JSON.stringify(data))
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
  check(`tel`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`psword`).isLength({ min: 8 }),
  check(`nombre`).isAlpha(),
  check(`apellido`).isAlpha(),
  check(`fechanac`).isLength({ min: 10 }),
  check(`fechanac`).custom(value => {
    value = value.split("-");
    console.log(value)
    if (isNaN(value[0])) {
      return false
    } else if (isNaN(value[1]) || value[1].length !== 2) {
      return false
    } else if (isNaN(value[2]) || value[2].length !== 2) {
      return false
    } else { return true }
  }),
  check(`mail`).isEmail(),
  check(`tarjeta`).isNumeric(),
],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({ errors: errors.array() })
      return res.status(422).json({ errors: errors.array() });
    }
    const tel = req.params.tel;
    const psword = req.params.psword;
    const nombre = req.params.nombre;
    const apellido = req.params.apellido;
    const fechanac = req.params.fechanac;
    const mail = req.params.mail;
    const tarjeta = req.params.tarjeta;
    db.none(`INSERT INTO usuario VALUES($1,$2,$3,$4,$5,$6,$7)`,
      [escape(tel), escape(psword), escape(nombre),
      escape(apellido), escape(fechanac), escape(mail),
      escape(tarjeta)])
      .then((data) => {
        console.log(`DATA: `, data)
        res.send(JSON.stringify(`Usuario creado exitosamente`))
      })
      .catch((error) => {
        console.log(req.params)
        console.log(`ERROR`, error)
        res.send(error.detail)
      })
  })
/**
 * Crea un Conductor recibiendo, numero de telefono, contraseña, nombre
 * apellido, fecha de nacimiento, correo y numero de cuenta
 */
app.post(`/drivers/:tel/:psword/:nombre/:apellido/:fechanac/:mail/:cuenta`, [
  check(`tel`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`psword`).isLength({ min: 8 }),
  check(`nombre`).isAlpha(),
  check(`apellido`).isAlpha(),
  check(`fechanac`).isLength({ min: 10 }),
  check(`fechanac`).custom(value => {
    value = value.split("-");
    console.log(value)
    if (isNaN(value[0])) {
      return false
    } else if (isNaN(value[1]) || value[1].length !== 2) {
      return false
    } else if (isNaN(value[2]) || value[2].length !== 2) {
      return false
    } else { return true }
  }),
  check(`mail`).isEmail(),
  check(`cuenta`).isNumeric(),
],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({ errors: errors.array() })
      return res.send(`Error en registro`);
    }
    const tel = req.params.tel;
    const psword = req.params.psword;
    const nombre = req.params.nombre;
    const apellido = req.params.apellido;
    const fechanac = req.params.fechanac;
    const mail = req.params.mail;
    const cuenta = req.params.cuenta;
    db.none(`INSERT INTO conductor VALUES($1,$2,$3,$4,$5,$6,$7)`,
      [escape(tel), escape(psword), escape(nombre),
      escape(apellido), escape(fechanac), escape(mail),
      escape(cuenta)])
      .then((data) => {
        console.log(`DATA: `, data)
        res.send(`Conductor creado exitosamente`)
      })
      .catch((error) => {
        console.log(`ERROR`, error)
        res.send(error.detail)
      })
  })
/**
 * Crea un Taxi recibiendo, placa, marca, modelo, anio
 * baul, soat y, ocupado
 */
app.post('/taxi/:phone/:placa/:contrasenia/:marca/:modelo/:anio/:baul/:soat/:ocupado', [
  check('phone').isNumeric().isLength({ min: 10, max: 10 }),
  check('placa').isAlphanumeric().isLength({ min: 6, max: 6 }).custom(value => {
    console.log(value)
    value = value.split('');
    const letters = /^[A-Z]+$/;
    if (!value[0].match(letters) || !value[1].match(letters) || !value[2].match(letters)) {
      console.log("problema en letras")
      return false;
    } else if (isNaN(value[3]) || isNaN(value[4]) || isNaN(value[5])) {
      console.log("problema en numeros")
      return false;
    } else { return true }
  }),
  check('contrasenia').isLength({ min: 8 }),
  check('marca').isAlphanumeric(),
  check('modelo').isAlphanumeric(),
  check('anio').isNumeric().isLength({ min: 4 }),
  check('baul').isAlpha(),
  check(`soat`).isLength({ min: 10 }),
  check(`soat`).custom(value => {
    value = value.split("-");
    console.log(value)
    if (isNaN(value[0])) {
      return false
    } else if (isNaN(value[1]) || value[1].length !== 2) {
      return false
    } else if (isNaN(value[2]) || value[2].length !== 2) {
      return false
    } else { return true }
  }),
  check(`ocupado`).isBoolean(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(`Error en Registro`);
  }
  const phone = req.params.phone;
  const placa = req.params.placa;
  const contrasenia = req.params.contrasenia;
  const marca = req.params.marca;
  const modelo = req.params.modelo;
  const anio = req.params.anio;
  const baul = req.params.baul;
  const soat = req.params.soat;
  db.one('SELECT insert_taxi($1,$2,$3,$4,$5,$6,$7,$8)',
    [escape(phone), escape(placa), escape(contrasenia), escape(marca),
    escape(modelo), escape(anio), escape(baul), escape(soat)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.send(`Taxi creado exitosamente`)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`Error creando el taxi, por favor intentelo de nuevo`)
    })
})
/**
 * Crea una Ubicacion Favorita recibiendo, telefono del usuario y coordenadas
 */
app.post(`/users/favorites/:phone/:lat/:lng`,
  [
    check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
    check(`lat`).isFloat(),
    check(`lng`).isFloat(),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({ errors: errors.array() })
      return res.status(422).json({ errors: errors.array() });
    }
    const phone = req.params.phone;
    const lat = req.params.lat;
    const lng = req.params.lng;
    db.none(`INSERT INTO origenesfav VALUES ($1, ST_GeomFromText('POINT($2 $3)', 4326))`,
      [escape(phone), escape(lat), escape(lng)])
      .then((data) => {
        console.log(`DATA: `, data)
        res.send(`Agergado a favoritos`)
      })
      .catch((error) => {
        console.log(`ERROR`, error)
        res.send(`Error, por favor intentelo de nuevo`)
      })
  }
)
/**
 * Crea una Solicitud recibiendo, telefono del usuario y coordenadas del usuario
 * El encargado de crear una solicitud es el usuario
 */
app.post(`/users/request/:phoneuser/:latin/:lngin/:latfin/:lngfin`,
  [
    check(`phoneuser`).isNumeric().isLength({ min: 10, max: 10 }),
    check(`latin`).isFloat(),
    check(`lngin`).isFloat(),
    check(`latfin`).isFloat(),
    check(`lngfin`).isFloat(),
  ], (req, res) => {
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
  }
)
/**
 * Crea un Servicio recibiendo, telefono del usuario, telefono del conductor,
 * placa del taxi, hora de inicio, hora de llegada, comprobante de pago usuario y 
 * comprobante de pago conductor
 * El encargado de crear un servicio es el conductor
 */
app.post(`/users/add/services/:idsolicitud`,
  [
    check(`idsolicitud`).isNumeric(),
  ], (req, res) => {
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
  }
)
/**
 * Crea un reporte para un taxi recibiendo la placa del taxi 
 * la hora actual y la coordenada en la que se encuentra
 */
app.post(`/users/taxi/report/:placa/:lat/:lng`,
  [
    check('placa').isAlphanumeric().isLength({ min: 6, max: 6 }).custom(value => {
      console.log(value)
      value = value.split('');
      const letters = /^[A-Z]+$/;
      if (!value[0].match(letters) || !value[1].match(letters) || !value[2].match(letters)) {
        console.log("problema en letras")
        return false;
      } else if (isNaN(value[3]) || isNaN(value[4]) || isNaN(value[5])) {
        console.log("problema en numeros")
        return false;
      } else { return true }
    }),
    check(`lat`).isFloat(),
    check(`lng`).isFloat()
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({ errors: errors.array() })
      return res.status(422).json({ errors: errors.array() });
    }
    const placa = req.params.placa;
    const lat = req.params.lat;
    const lng = req.params.lng;
    const coordenada = `ST_GeomFromText('POINT(${lat} ${lng})', 4326)`;
    const hora = new Date();
    db.none(`INSERT INTO reporte VALUES (Default, $1, $2, ${coordenada})`,
      [escape(placa), hora, escape(lat), escape(lng)])
      .then((data) => {
        console.log(`DATA: `, data)
        res.send(`Solicitud de servicio creada`)
      })
      .catch((error) => {
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
  check(`tel`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`psword`).isLength({ min: 8 }),
  check(`nombre`).isAlpha(),
  check(`apellido`).isAlpha(),
  check(`mail`).isEmail(),
  check(`tarjeta`).isNumeric(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(`Error en Registro`);
  }
  const tel = req.params.tel;
  const psword = req.params.psword;
  const nombre = req.params.nombre;
  const apellido = req.params.apellido;
  const mail = req.params.mail;
  const tarjeta = req.params.tarjeta;
  db.none(`UPDATE usuario SET contrasenia=$2, nombreUsuario=$3, apellidoUsuario=$4, email=$5, numTarjeta=$6 WHERE telefonoUsuario=$1`,
    [escape(tel), escape(psword), escape(nombre),
    escape(apellido), escape(mail), escape(tarjeta)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.send(`Usuario actualizado exitosamente`)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`Error actualizando el usuario, por favor intentelo de nuevo`)
    })
})
/**
 * Actualiza un Conductor recibiendo, numero de telefono, contraseña, nombre
 * apellido, fecha de nacimiento, correo y numero de cuenta
 */
app.put(`/drivers/:phone/:psword/:nombre/:apellido/:mail/:cuenta`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`psword`).isLength({ min: 8 }),
  check(`nombre`).isAlpha(),
  check(`apellido`).isAlpha(),
  check(`mail`).isEmail(),
  check(`cuenta`).isNumeric(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(`Error al Modificar`);
  }
  const phone = req.params.phone;
  const psword = req.params.psword;
  const nombre = req.params.nombre;
  const apellido = req.params.apellido;
  const mail = req.params.mail;
  const cuenta = req.params.cuenta;
  db.none(`UPDATE conductor SET contrasenia=$2, nombreConductor=$3, apellidoConductor=$4, email=$5, numCuenta=$6 WHERE telefonoconductor=$1`,
    [escape(phone), escape(psword), escape(nombre),
    escape(apellido), escape(mail), escape(cuenta)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.send(`Conductor actualizado exitosamente`)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`Error actualizando el conductor, por favor intentelo de nuevo`)
    })
})

/**
 * Actualiza un Taxi recibiendo, placa, marca, modelo, anio
 * baul, soat y, ocupado
 */
app.put(`/taxi/:placa/:soat`, [
  check('placa').isAlphanumeric().isLength({ min: 6, max: 6 }).custom(value => {
    console.log(value)
    value = value.split('');
    const letters = /^[A-Z]+$/;
    if (!value[0].match(letters) || !value[1].match(letters) || !value[2].match(letters)) {
      console.log("problema en letras")
      return false;
    } else if (isNaN(value[3]) || isNaN(value[4]) || isNaN(value[5])) {
      console.log("problema en numeros")
      return false;
    } else { return true }
  }),
  check(`soat`).custom(value => {
    value = value.split("-");
    console.log(value)
    if (isNaN(value[0]) || value[0].length !== 2) {
      return false
    } else if (isNaN(value[1]) || value[1].length !== 2) {
      return false
    } else if (isNaN(value[2])) {
      return false
    } else { return true }
  }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.status(422).json({ errors: errors.array() });
  }
  const placa = req.params.placa;
  const soat = req.params.soat;
  db.none(`UPDATE taxi SET soat=$2 WHERE placa=$1`,
    [escape(placa), escape(soat)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.send(`Taxi creado exitosamente`)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`Error creando el taxi, por favor intentelo de nuevo`)
    })
})
/**El Usuario modifica el servicio para ponerle la calificacion al conductor
 */
app.put(`/users/services/:phone/:calificacion`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`calificacion`).isFloat(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.status(422).json({ errors: errors.array() });
  }
  const placa = req.params.placa;
  const soat = req.params.soat;
  db.none(`UPDATE servicio SET soat=$2 WHERE placa=$1`,
    [escape(placa), escape(soat)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.send(`Taxi creado exitosamente`)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`Error creando el taxi, por favor intentelo de nuevo`)
    })
})
/**El Conductor modifica el servicio para ponerle la calificacion al usuario */
app.put(`/drivers/services/:phone/:calificacion`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
  check(`calificacion`).isFloat(),

], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.status(422).json({ errors: errors.array() });
  }
  const placa = req.params.placa;
  const soat = req.params.soat;
  db.none(`UPDATE taxi SET soat=$2 WHERE placa=$1`,
    [escape(placa), escape(soat)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.send(`Taxi creado exitosamente`)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`Error creando el taxi, por favor intentelo de nuevo`)
    })
})
/**Terminar un servicio */
app.put(`/services/drivers/end/:phone`, [
  check(`phone`).isNumeric().isLength({ min: 10, max: 10 }),
], (req, res) => {
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
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))