const express = require('express')
const app = express()
const port = 3000
const pgp = require('pg-promise')(/*options*/)
const db = pgp('postgres://postgres:postgres@localhost:5432/postgres')

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

db.one('SELECT $1 AS value', 123)
  .then(function (data) {
    console.log('DATA:', data.value)
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })