const express = require('express')
const app = express()
const fs = require('fs')
// const request = require('request')

/*setTimeout(function() {
    request('https://www.bicing.cat/availability_map/getJsonObject', function (error, response, body) {
        fs.writeFile("public/getJsonObject", JSON.stringify(response), function (err) {
            if (err) console.log(err);
        });
    });
}, 60000);*/

app.use(express.static('public'))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))