const fs = require('fs');
const JSZip = require('jszip')
const xml2js = require('xml2js')

const roasterController = {
    upload: (req, res) => {

    },
    load: (req, res) => {
        let file_path = "./assets/example_a.rosz";
        loadRoaster(file_path)
        .then(json => normalize_json(json))
        .then(data => res.send(data))
        .catch(error => res.send(error))
    }
}

function loadRoaster(file_path){
    return new Promise((resolve,reject) => {
        fs.readFile(file_path, function(err, data) {
            if (err) reject(err);
            JSZip.loadAsync(data)
            .then(zip => {
                const ros_name = Object.keys(zip.files)[0]
                return zip.file(ros_name).async("string")
            })
            .then(xml =>  new xml2js.Parser().parseStringPromise(xml))
            .then(json => resolve(json))
            .catch(e => reject(e))
        });
    })
}

function normalize_json(json){
    let units = json.roster.forces.map(i => i.force[0].selections[0].selection)[0].filter(j => ["model", "unit"].includes(j['$'].type)).map(x=>x['$'].name)
    return units
}

module.exports = roasterController
