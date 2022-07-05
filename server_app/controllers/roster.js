const fs = require('fs');
const JSZip = require('jszip')
const xml2js = require('xml2js')

const rosterController = {
    
    upload: (req, res) => {

        let file_path = req.file.path;
        loadRoaster(file_path)
        .then(json => normalize_json(json))
        .then(data => {
            res.send(data)
        })
        .catch(error => res.send(error))
    },
    
    load: (req, res) => {

        let file_path = "./assets/example_a.rosz";
        loadRoaster(file_path)
        .then(json => normalize_json(json))
        .then(data => res.send(data))
        .catch(error => {
            console.log(error)
            res.send(error)
        })
    }
}

function loadRoaster(file_path){

    console.log('*** LOADING ROSTER ***')

    return new Promise((resolve,reject) => {
        fs.readFile(file_path, function(err, data) {
            if (err) reject(err);
            JSZip.loadAsync(data)
            .then(zip => {
                const ros_name = Object.keys(zip.files)[0]
                return zip.file(ros_name).async("string")
            })
            .then(xml =>  new xml2js.Parser().parseStringPromise(xml))
            .then(json => {
                let data = JSON.stringify(json);
                fs.writeFileSync('tmp/json_outputs/output.json', data);
                resolve(json)
                console.log('*** ROSTER OK ***')
            })
            .catch(e => reject(e))
        });
    })
}

function normalize_json(json){
    
    let unit_names = json.roster.forces.map(i => i.force[0].selections[0].selection)[0].filter(j => ["model", "unit"].includes(j['$'].type)).map(x=>x['$'].name)
    
    return unit_names
}


function test_roaster_json(json) {
    json.roster.forces.forEach(i0 => {
        i0.force.forEach(i1 => {
            i1.selections.forEach(i2 => {
                i2.selection.forEach(i3 => {
                    if(["model", "unit"].includes(i3['$'].type)){
                        i3.selections.forEach(i4 => {
                           i4.selection.forEach(i5 => {
                            console.log(i5?.profiles[0].profile)
                            // [
                            //     {
                                //     '$': {
                                //         id: '3226-028f-1769-6950::2421-be83-cf22-3395',
                                //         name: 'Black Staff of Ahriman',
                                //         hidden: 'false',
                                //         typeId: 'd5f97c0b-9fc9-478d-aa34-a7c414d3ea48',
                                //         typeName: 'Weapon'
                                //     },
                                //     characteristics: [ [Object] ]
                            //     }
                            // ]
                           })
                        })
                    }
                }) 
            })
        })
    })
}


module.exports = rosterController
