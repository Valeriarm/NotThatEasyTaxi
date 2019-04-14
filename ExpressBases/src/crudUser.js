//Crea un usuario recibiendo, numero de telefono, contraseña, name
//apellido, fecha de nacimiento, correo y numero de tarjeta
var createUser = (req, res, validationResult, db)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(JSON.stringify(`Credenciales invalidas`));
  }
  const phone = req.params.phone;
  const psword = req.params.psword;
  const name = req.params.name;
  const lastname = req.params.lastname;
  const birthday = req.params.birthday;
  const mail = req.params.mail;
  const credcard = req.params.credcard;
  db.none(`INSERT INTO usuario VALUES($1,$2,$3,$4,$5,$6,$7)`,
    [escape(phone), escape(psword), escape(name),
    escape(lastname), escape(birthday), escape(mail),
    escape(credcard)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.send(JSON.stringify(`Usuario creado exitosamente`))
    })
    .catch((error) => {
      console.log(req.params)
      console.log(`ERROR`, error)
      res.send(error.detail)
    })
};

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
  };

//Actualiza un usuario recibiendo, numero de telefono, contraseña, name
//apellido, fecha de nacimiento, correo y numero de tarjeta
var updateUser = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(`Error en Registro`);
  }
  const phone = req.params.phone;
  const psword = req.params.psword;
  const name = req.params.name;
  const lastname = req.params.lastname;
  const mail = req.params.mail;
  const credcard = req.params.credcard;
  db.none(`UPDATE usuario SET contrasenia=$2, nameUsuario=$3, lastnameUsuario=$4, email=$5, numcredcard=$6 WHERE telefonoUsuario=$1`,
    [escape(phone), escape(psword), escape(name),
    escape(lastname), escape(mail), escape(credcard)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.send(`Usuario actualizado exitosamente`)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`Error actualizando el usuario, por favor intenphoneo de nuevo`)
    })
};

//Elimina un usuario recibiendo su numero de telefono
var deleteUser = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(`Error en Registro`);
  }
  const phone = req.params.phone;
  db.none(`DELETE usuario WHERE telefonoUsuario=$1`,
    [escape(phone)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.send(`Usuario actualizado exitosamente`)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`Error actualizando el usuario, por favor intenphoneo de nuevo`)
    })
};

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

//Valida los usuario recibiendo su telefono
var payUser = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(JSON.stringify("Credenciales invalidas"));
  }
  const phone = req.params.phone;
  console.log(phone + "-" + psword)
  db.one(`SELECT pagar_kilometros($1)`, [escape(phone)])
    .then(function (data) {
      console.log(`DATA:`, data.pagar_kilometros)
      res.send(JSON.stringify(data.pagar_kilometros))
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
  payUser,
}