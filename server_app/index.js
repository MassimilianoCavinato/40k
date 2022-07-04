const fs = require('fs')
const xml2js = require('xml2js')
const JSZip = require("jszip")
const ZIP = new JSZip()
const xml2json_parser =  new xml2js.Parser();
const express = require('express');
const { resolve } = require('path');
const { resolveObjectURL } = require('buffer');
const server = express()
const port = 40000

server.get('/', (req, res) => {
  res.send('In the future there\'s only war.')
})

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

server.get('/roaster', (req, res) => {
    loadRoaster()
    .then(data => res.send(data))
    .catch(e => res.status(500).send(e))
});

function loadRoaster(){
    let file_path = "./assets/example_a.rosz";

    return new Promise((resolve,reject) => {
        fs.readFile(file_path, function(err, data) {
            if (err) reject(err);
            JSZip.loadAsync(data)
            .then(zip => {
                const ros_name = Object.keys(zip.files)[0]
                return zip.file(ros_name).async("string")
            })
            .then(xml => xml2json_parser.parseStringPromise(xml))
            .then(json => resolve(json))
            .catch(e => reject(e))
        });
    })
}
