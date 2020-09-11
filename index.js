var constUtils = require('./src/config_handler');
var dbHandler = require('./src/db_handler');
var authHandler = require('./src/auth_handler');
var socketHandler = require('./src/socket_io_handler');
var express = require('express');
var cors = require('cors');
var app = express();

constUtils.readConfigFile();
dbHandler.dbHandlerInitVars();
socketHandler.initSocketIOvars();
authHandler.registerUtilsInitVars();
var constants = require('./src/config_handler').mainConfig;
app.use(express.json());
app.use(cors());
socketHandler.registerSocketEvents();

app.post(constants.REGISTER_PATH, async function (req, res) {
	let registerData = {
		email: req.body.email,
		password: req.body.password,
		passwordRep: req.body.passwordRep,
		username: req.body.username
	}
  console.log('REGISTER');
	await dbHandler.registerUser(res, registerData);
});

app.post(constants.LOGIN_PATH, function (req, res) {
	let loginData = {
		login: req.body.email,
		password: req.body.password
	}
  console.log('LOGIN');
	dbHandler.loginUser(res, loginData);
});

app.listen(constants.SERVER_PORT, function () {
  console.log(constants.MAIN_MODULE_PREFIX, 'Simpleboard-api running on port ' + constants.SERVER_PORT);
});
