//Crea una Ubicacion Favorita recibiendo, telefono del usuario y coordenadas
var createFavorites = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.status(422).json({ errors: errors.array() });
  }
  const phone = req.params.phone;
  const name = req.params.name;
  const lat = req.params.lat;
  const lng = req.params.lng;
  const origen = `ST_GeomFromText('POINT(${lat} ${lng})', 4326)`
  db.none(`INSERT INTO origenesfav VALUES ($1, $2, ${origen})`,
    [escape(phone), escape(name)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.send(`Agergado a favoritos`)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`Error, por favor intentelo de nuevo`)
    })
};

//Crea una Ubicacion Favorita recibiendo, telefono del usuario y coordenadas
var readFavorites = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.status(422).json({ errors: errors.array() });
  }
  const phone = req.params.phone;
  db.any(`SELECT * FROM origenesfav WHERE telefonousuario=$1`,
    [escape(phone)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.json(data)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`Error, por favor intentelo de nuevo`)
    })
};

//Borra una Ubicacion Favorita recibiendo, telefono del usuario y coordenadas
var deleteFavorites = (req, res, validationResult, db) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.status(422).json({ errors: errors.array() });
  }
  const phone = req.params.phone;
  db.any(`DELETE FROM origenesfav WHERE telefonousuario=$1 AND nombre=$2`,
    [escape(phone), escape(name)])
    .then((data) => {
      console.log(`DATA: `, data)
      res.json(data)
    })
    .catch((error) => {
      console.log(`ERROR`, error)
      res.send(`Error, por favor intentelo de nuevo`)
    })
};

module.exports = {
  createFavorites,
  readFavorites,
  deleteFavorites,
};