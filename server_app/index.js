const express = require('express');
const cors = require('cors')

const server = express()
const port = 40000
const router = require('./routes/router')

server.use(cors())
server.use('/', router)

server.listen(port, () => console.log(`Server listening on port ${port}`))

