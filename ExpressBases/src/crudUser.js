//Crea un usuario recibiendo, numero de telefono, contraseña, nombre
//apellido, fecha de nacimiento, correo y numero de tarjeta
var createUser = (req, res, validationResult, db)=>{
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
}
//Obtiene los datos de un usuario para cargarlos en su perfil
var readUser = (req, res, validationResult, db) => {
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
  }
//Actualiza un usuario recibiendo, numero de telefono, contraseña, nombre
//apellido, fecha de nacimiento, correo y numero de tarjeta
var updateUser = (req, res, validationResult, db) => {
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
}
//Elimina un usuario recibiendo su numero de telefono
var deleteUser = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(`Error en Registro`);
  }
  const tel = req.params.tel;
  db.none(`DELETE usuario WHERE telefonoUsuario=$1`,
    [escape(tel)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.send(`Usuario actualizado exitosamente`)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`Error actualizando el usuario, por favor intentelo de nuevo`)
    })
}
//Valida los usuario recibiendo telefono y contraseña
var validateUser = (req, res, validationResult, db) => {
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
  };

module.exports = {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  validateUser,
}