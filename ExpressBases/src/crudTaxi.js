//Crea un Taxi recibiendo, placa, marca, modelo, anio
//baul, soat y, ocupado
var createTaxi = (req, res, validationResult, db) => {
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
	};

//Obtiene los datos de un taxi para cargarlos en su perfil
var readTaxi = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(JSON.stringify("Credenciales invalidas"));
  }
  const placa = req.params.placa;
  db.one(`SELECT * FROM taxi WHERE placa= $1`, [escape(placa)])
    .then(function (data) {
      console.log(data)
      res.send(JSON.stringify(data))
    })
    .catch(function (error) {
      console.log(`ERROR:`, error)
      res.send(JSON.stringify("Credenciales invalidas"))
    })
};

//Actualiza un Taxi recibiendo, placa, marca, modelo, anio
//baul, soat y, ocupado
var updateTaxi =(req, res, validationResult, db) => {
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
	};

//Elimina un Taxi recibiendo su placa
var deleteTaxi = (req, res, validationResult, db) => {
	const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({ errors: errors.array() })
      return res.status(422).json({ errors: errors.array() });
		}
	const placa = req.params.placa;
	db.none(`DELETE taxi WHERE placa=$1`,
    [escape(tel)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.send(`Conductor eliminado exitosamente`)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`Error eliminando el conductor, por favor intentelo de nuevo`)
    })
};

//Valida los taxis recibiendo placa y contraseña
var validateTaxi = (req, res, validationResult, db) => {
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
  };

module.exports = {
  createTaxi,
  readTaxi,
  updateTaxi,
  deleteTaxi,
  validateTaxi,
}