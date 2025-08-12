const bodyParser = require('body-parser');
let express=require('express');
let app=express();
let routes=require('../src/routes/endpoints.js');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", routes);
module.exports = app;
