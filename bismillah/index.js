const fs = require("fs");
const bmkg_data = require("./src/file");
const xml = require("xml2js");
const request = require("request");
const async = require("async");
const formatDataBmkg = require("./src/formatdata")
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

let dataArray =[]

async.forEachOf(bmkg_data, (link, key, callback) => {
    request(link, function (error, response, body) {
        console.log(link);
        if (!error && response.statusCode == 200) {
            // parse XML to Json
            xml.parseString(response.body, function (err, result) {

                let data = formatDataBmkg(result);

                if (err) {
                    console.log(err)
                } else {
                    data.forEach(e => dataArray.push(e))
                }
                callback();
            });
        }
    });
}, 
(err) => {
    if (err) {
        console.log(err);
    } else {
        const file = 'view/weather.json';
        const data = JSON.stringify(dataArray);

        const jaksel = dataArray.filter((data) => data.long.toLowerCase().includes(106.856804));
        app.get('/jaksel',function(req, res){
            res.send(
                jaksel
            );
        })

        const jakbar=dataArray.filter((data) => data.long.toLowerCase().includes(106.731319))
        app.get('/jakbar',function(req, res){
            res.send(
                jakbar
            );
        })

        const jaktim=dataArray.filter((data) => data.long.toLowerCase().includes(106.901093))
        app.get('/jaktim',function(req, res){
            res.send(
                jaktim
            );
        })

        const jakut=dataArray.filter((data) => data.long.toLowerCase().includes(106.865559))
        app.get('/jakut',function(req, res){
            res.send(
                jakut
            );
        })

        const kepulauanseribu=dataArray.filter((data) => data.long.toLowerCase().includes(106.825562))
        app.get('/kepulauanseribu',function(req, res){
            res.send(
                kepulauanseribu
            );
        })

        

        app.get('/', function (req, res) {
            res.send(dataArray);
        });

        fs.writeFile(file, data, 'utf-8', (e => {
            if (e) {
                console.log(e);
            } else {
                console.log('done get weather');
            }
        }));
    }
})

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');

});
