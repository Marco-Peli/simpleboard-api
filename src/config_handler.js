const fs = require('fs');

const MAIN_CONFIG_PATH = "/configs/main_config.json";

const defaultConfig = {
  SERVER_PORT: 3001,
  SOCKET_IO_PORT: 3002,
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
  SALT_ROUNDS: 10,
  DB_HANDLER_MODULE_PREFIX: 'DB_HANDLER:',
  SOCKET_IO_HANDLER_MODULE_PREFIX: 'SOCKET.IO_HANDLER:',
  CONFIG_HANDLER_MODULE_PREFIX: 'CONFIG_HANDLER:',
  REGISTER_UTILS_MODULE_PREFIX: 'REGISTER_UTILS:',
  MAIN_MODULE_PREFIX: 'SIMPLEBOARD_API_MAIN:'
}

exports.readConfigFile = () => {
  try
  {
    let rawData = fs.readFileSync(require('path').resolve(__dirname, '..') + MAIN_CONFIG_PATH);
    exports.mainConfig = JSON.parse(rawData);
    console.log(exports.mainConfig.CONFIG_HANDLER_MODULE_PREFIX, "config file read: ", exports.mainConfig);
  }
  catch(err)
  {
    console.log(defaultConfig.CONFIG_HANDLER_MODULE_PREFIX, "config file not found, generating default config");
    try{
      const data = JSON.stringify(defaultConfig, null, 2);
      console.log(defaultConfig.CONFIG_HANDLER_MODULE_PREFIX, "default log file to be written:", data);
      fs.writeFileSync(require('path').resolve(__dirname, '..') + MAIN_CONFIG_PATH, data);
      exports.mainConfig = JSON.parse(data);
      console.log(exports.mainConfig.CONFIG_HANDLER_MODULE_PREFIX, "config file read: ", exports.mainConfig);
    }
    catch(err)
    {
      console.log(defaultConfig.CONFIG_HANDLER_MODULE_PREFIX, "unable to write file, err", err);
    }
  }
}
