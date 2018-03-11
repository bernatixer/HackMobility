const express = require('express')
const app = express()
const fs = require('fs')
const execSync = require('child_process').execSync

setInterval(function() {
    execSync("wget https://www.bicing.cat/availability_map/getJsonObject -O public/getJsonObject", { encoding: 'utf8' });
}, 5000);

app.use(express.static('public'))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))