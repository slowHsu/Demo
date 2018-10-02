const express = require('express');
const app = express();
const http = require('http');
const bodyparser = require('body-parser');
const mysql = require('./models/mysql/db');

    app.set('port', process.env.PORT || 8889);
    app.use(bodyparser.json());

    app.use(function (req, res, next) {
        next();
    });
    app.use(function (err, req, res, next) {
        console.log(err.stack);
        res.status(500).send({ error: 'Internal Server Error' });
    });


    let server = http.createServer(app);
    server.listen(app.get('port'));