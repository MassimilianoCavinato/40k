const fs = require('fs')
const xml2js = require('xml2js')
const express = require('express')
const server = express()
const port = 40000

server.get('/', (req, res) => {
  res.send('In the future there\'s only war.')
})

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

server.get('/roasters/:id', (req, res) => {
    
    fs.readFile('./assets/example_c.ros', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.send(e.textMessage);
        }
        xml2js.parseStringPromise(data)
        .then(result => res.send(result))
        .catch(e => res.error(e));
    });
})

function parseXmlToJson(xml) {
    const json = {};
    for (const res of xml.matchAll(/(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm)) {
        const key = res[1] || res[3];
        const value = res[2] && parseXmlToJson(res[2]);
        json[key] = ((value && Object.keys(value).length) ? value : res[2]) || null;

    }
    return json;
}