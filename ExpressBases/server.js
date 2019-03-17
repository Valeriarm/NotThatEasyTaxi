const express = require('express')
const app = express()
const port = 3000
const pgp = require('pg-promise')(/*options*/)
const db = pgp('postgres://postgres:postgres@localhost:5432/postgres')

// GET REQUESTS

app.get('/', (req, res) => {
  res.send('I am a get request!')
})

app.get('/users', (req, res) => {
  db.one('SELECT $1 AS value', 123)
  .then(function (data) {
    console.log('DATA:', data.value)
    res.send(JSON.stringify(data.value))
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })
})

app.get('/users/:userid', (req, res) => {
  console.log(req.params.userid)
  res.send(req.params.userid)
})

//POST REQUESTS

app.post('/', (req, res) =>{
  res.send("I am a post request!")
})

app.post('/users', (req, res) =>{
  db.one('SELECT $1 AS value', 123)
  .then(function (data) {
    console.log('DATA:', data.value)
    res.send(JSON.stringify(data.value))
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })
})

app.post('/users/:newuser', (req, res) =>{
  console.log(req.params)
  res.send(JSON.stringify(req.params.newuser))
})

//PUT REQUESTS

app.put('/', (req, res) =>{
  res.send("I am a put request!")
})

app.put('/users', (req, res) =>{
  db.one('SELECT $1 AS value', 123)
  .then(function (data) {
    console.log('DATA:', data.value)
    res.send(JSON.stringify(data.value))
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })
})

app.put('/users/:newuser', (req, res) =>{
  console.log(req.params)
  res.send(JSON.stringify(req.params.newuser))
})

//LISTENER

app.listen(port, () => console.log(`Example app listening on port ${port}!`))