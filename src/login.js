var constants = require('./constants');
var utils = require('./utilities');

// exports.validateLoginData = (loginData) =>
// {
//   response = {
//     err_stat: constants.LOGIN_SUCCESSFUL,
//     err_msg: ''
//   };
//
//   if(loginData.email === '')
//   {
//     response.err_stat = constants.LOGIN_FAILED;
//     response.err_msg += 'Email is empty <br>';
//   }
//
//   if(loginData.password === '')
//   {
//     response.err_stat = constants.LOGIN_FAILED;
//     response.err_msg += 'Password is empty <br>';
//   }
//
//   if(response.err_stat === constants.LOGIN_FAILED)
//   {
//     return response;
//   }
//
//   if(!utils.validateEmail(loginData.email))
//   {
//     response.err_stat = constants.LOGIN_FAILED;
//     response.err_msg += 'Email format is not valid <br>';
//   }
//
// };
