//Crea un Conductor recibiendo, numero de telefono, contraseña, nombre
//apellido, fecha de nacimiento, correo y numero de cuenta
var createDriver = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(`Error en registro`);
  }
  const phone = req.params.phone;
  const psword = req.params.psword;
  const name = req.params.name;
  const lastname = req.params.lastname;
  const birthday = req.params.birthday;
  const mail = req.params.mail;
  const bankacc = req.params.bankacc;
  db.none(`INSERT INTO conductor VALUES($1,$2,$3,$4,$5,$6,$7)`,
    [escape(phone), escape(psword), escape(name),
    escape(lastname), escape(birthday), escape(mail),
    escape(bankacc)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.send(`Conductor creado exitosamente`)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(error.detail)
    })
};

//Obtiene los datos de un conductor para cargarlos en su perfil
var readDriver = (req, res, validationResult, db) => {
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
};

//Actualiza un Conductor recibiendo, numero de telefono, contraseña, nombre
//apellido, fecha de nacimiento, correo y numero de cuenta
var updateDriver = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(`Error al Modificar`);
  }
  const phone = req.params.phone;
  const psword = req.params.psword;
  const name = req.params.name;
  const lastname = req.params.lastname;
  const mail = req.params.mail;
  const bankacc = req.params.bankacc;
  db.none(`UPDATE conductor SET contrasenia=$2, nombreConductor=$3, lastnameConductor=$4, email=$5, numbankacc=$6 WHERE telefonoconductor=$1`,
    [escape(phone), escape(psword), escape(name),
    escape(lastname), escape(mail), escape(bankacc)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.send(`Conductor actualizado exitosamente`)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`Error actualizando el conductor, por favor intenphoneo de nuevo`)
    })
};

//Elimina un usuario recibiendo su numero de telefono
var deleteDriver = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(`Error en Registro`);
  }
  const phone = req.params.phone;
  db.none(`DELETE conductor WHERE telefonoUsuario=$1`,
    [escape(phone)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.send(`Conductor eliminado exitosamente`)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`Error eliminando el conductor, por favor intenphoneo de nuevo`)
    })
};

//Valida los conductores recibiendo telefono y contraseña
var validateDriver =(req, res, validationResult, db) => {
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
};

//Valida si un conductor puede manejar un taxi
var validateManejar = (req, res, validationResult, db) => {
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
};

//Valida los conductores recibiendo telefono y contraseña
var redeemDriver =(req, res, validationResult, db) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log({ errors: errors.array() })
		return res.send(JSON.stringify("Credenciales invalidas"));
	}
	const phone = req.params.phone;
	db.one(`SELECT redimir_kilometros($1)`, [escape(phone)])
		.then(function (data) {
		console.log(`DATA:`, data.redimir_kilometros)
		res.send(JSON.stringify(data.redimir_kilometros))
		})
		.catch(function (error) {
		console.log(`ERROR:`, error)
		res.send(JSON.stringify("Credenciales invalidas"))
		})
};


module.exports = {
  createDriver,
  readDriver,
  updateDriver,
  deleteDriver,
  validateDriver,
  validateManejar,
  redeemDriver,
};
