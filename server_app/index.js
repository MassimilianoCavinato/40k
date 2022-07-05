const express = require('express');
const server = express()
const port = 40000
const router = require('./routes/router')

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

server.use('/', router)

