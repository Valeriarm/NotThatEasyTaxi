//Crea un reporte para un taxi recibiendo la placa del taxi 
//la hora actual y la coordenada en la que se encuentra
var createReport = (req, res, validationResult, db) => {
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

module.exports = {
  createReport,
}