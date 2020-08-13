var constants = require('./src/constants');
var dbHandler = require('./src/db_handler');
var registerUtils = require('./src/register_utils');
var express = require('express');
var app = express();
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
	dbHandler.knex.select('*').from('simpleboard-api.login').then(data => {
		console.log(data)});
});

app.post('/register', function (req, res) {
	let registerData = {
		login: req.body.email,
		password: req.body.password
	}
	console.log('registerdata:', registerData);
	dbHandler.registerUser(res, registerData);
});

app.listen(constants.SERVER_PORT, function () {
  console.log('Example app listening on port ' + constants.SERVER_PORT);
});
