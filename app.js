const express = require('express');
const app = express();
const http = require('http');
const mysql = require('./models/mysql/db');
const index = require('./controllers/index');

app.set('port', process.env.PORT || 8889);
app.use(express.urlencoded());
app.use(express.json());

app.use(function (err, req, res, next) {
  if (err) {
    res.status(400).send('Invalid Request data');
  } else {
    next()
  }
});

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send({ error: 'Internal Server Error' });
});


app.use('/', index);

let server = http.createServer(app);
server.listen(app.get('port'), function () {
  console.info('Express server listening on port ' + server.address().port);
});