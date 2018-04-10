const express = require('express');
const app = express();
const path = require('path');
const cors = require('express-cors');

const Api = require('./api/api.controller');

app.use(cors({
  allowedOrigins: [
    'negre.co',
    'localhost:4200'
  ]
}));

app.use(express.static(__dirname + '/dist'));

app.get('/api/v1.0/stations', async (req, res) => {

  const api = new Api();
  const resData = await api.getCompleteStationList();

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(resData, null, 3));
});

app.get('/api/v1.0/stations-simplified', async (req, res) => {

  const api = new Api();
  const resData = await api.getSimplifiedStationList();

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(resData, null, 3));
});

app.get('*', (req, res) => {
  res.redirect(404, 'http://negre.co');
});

module.exports = app;