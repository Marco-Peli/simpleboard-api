import {SERVER_PORT} from './src/constants.js'

var express = require('express');
var app = express();

const prova = {
	ciao: "diocan"
}
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/register', function (req, res) {
  console.log(req.body.ciao);
  res.json(prova);
});

app.listen(3001, function () {
  console.log('Example app listening on port 3000!');
});
