const fs = require('fs')
const xml2js = require('xml2js')
const JSZip = require("jszip")
const ZIP = new JSZip()
const express = require('express')
const server = express()
const port = 40000

server.get('/', (req, res) => {
  res.send('In the future there\'s only war.')
})

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

server.get('/roaster', (req, res) => {
    fs.readFile("./assets/example_a.rosz", function(err, data) {
        if (err) throw err;
        JSZip.loadAsync(data)
        .then(zip => {
            console.log(data)
            zip.file(zip)
            .async("string")
            .then(function (xml) {
                let json = new xml2js.Parser().parseString(xml, function (err, json) {
                    res.send(json)
                });
            });
        });
    });
});
