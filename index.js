var constUtils = require('./src/config_handler');
var dbHandler = require('./src/db_handler');
var registerUtils = require('./src/register_utils');
var socketHandler = require('./src/socket_io_handler');
var express = require('express');
var cors = require('cors');
var app = express();

constUtils.readConfigFile();
dbHandler.dbHandlerInitVars();
socketHandler.initSocketIOvars();
registerUtils.registerUtilsInitVars();
var constants = require('./src/config_handler').mainConfig;
app.use(express.json());
app.use(cors());
socketHandler.registerSocketEvents();

app.post(constants.REGISTER_PATH, function (req, res) {
	let registerData = {
		login: req.body.email,
		password: req.body.password
	}
  console.log('REGISTER');
	dbHandler.registerUser(res, registerData);
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
