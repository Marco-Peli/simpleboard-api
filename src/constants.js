const fs = require('fs');

const MAIN_CONFIG_PATH = '../configs/main_config.json';

const defaultConfig = {
  SERVER_PORT: 3001,
  REG_SUCCESSFUL: 1,
  REG_FAILED: 0,
  LOGIN_SUCCESSFUL: 1,
  LOGIN_FAILED: 0,
  DATA_VALID: 1,
  DATA_INVALID: 0,
  MAX_PASS_LENGTH: 20,
  MAX_EMAIL_LENGTH: 50,
  LOGIN_PATH: '/login',
  REGISTER_PATH: '/register',
}

exports.readConfigFile = () => {
  try
  {
    let rawData = fs.readFileSync(MAIN_CONFIG_PATH);
    exports.mainConfig = JSON.parse(rawData);
  }
  catch(err)
  {
    console.log("config file not found, generating default config");
    let data = JSON.stringify(defaultConfig);
    fs.writeFileSync(MAIN_CONFIG_PATH, data);
  }

}

exports.SERVER_PORT = 3001;
exports.REG_SUCCESSFUL = 1;
exports.REG_FAILED = 0;
exports.LOGIN_SUCCESSFUL = this.REG_SUCCESSFUL;
exports.LOGIN_FAILED = this.REG_FAILED;
exports.DATA_VALID = 1;
exports.DATA_INVALID = 0;
exports.MAX_PASS_LENGTH = 20;
exports.MAX_EMAIL_LENGTH = 50;
exports.LOGIN_PATH = '/login';
exports.REGISTER_PATH = '/register';
