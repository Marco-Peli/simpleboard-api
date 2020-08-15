let utils = require('./utilities');
var constants = require('./constants');

exports.validateRegisterData = function(userData)
{
  let response = {
    err_stat: constants.LOGIN_SUCCESSFUL,
    err_msg: ''
  };

  console.log('validating data: ', userData);

  userData.login = userData.login.toLowerCase();
  userData.password = userData.password.toLowerCase();

  if(userData.login === '')
  {
    response.err_stat = constants.LOGIN_FAILED;
    response.err_msg += 'Email is empty <br>';
  }

  if(userData.password === '')
  {
    response.err_stat = constants.LOGIN_FAILED;
    response.err_msg += 'Password is empty <br>';
  }

  if((!utils.validateEmail(userData.login)) || (userData.login.length > constants.MAX_EMAIL_LENGTH) || (userData.password.length > constants.MAX_PASS_LENGTH))
  {
    response.err_stat = constants.LOGIN_FAILED;
    response.err_msg += 'Email/password format is not valid <br>';
  }

  if(response.err_stat === constants.LOGIN_FAILED)
  {
    response.err_msg = 'Data invalid';
  }
  else {
    response.err_msg = 'Data valid';
  }

  return response;
};
