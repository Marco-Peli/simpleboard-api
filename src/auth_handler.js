var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
let utils = require('./utilities');
const Joi = require('joi');
let constants = {};
let schema = {};

exports.registerUtilsInitVars = function()
{
  constants = require('./config_handler').mainConfig;
    console.log(constants.REGISTER_UTILS_MODULE_PREFIX, "register utils module init");
    schema = Joi.object().keys({
        username: Joi.string()
            .alphanum()
            .min(constants.MIN_USERNAME_LENGTH)
            .max(constants.MAX_USERNAME_LENGTH)
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(constants.MIN_PASS_LENGTH).max(constants.MAX_PASS_LENGTH).required(),

        passwordRep: Joi.ref('password'),

        email: Joi.string()
            .email({ minDomainSegments: 2 }).required()
    });
}

exports.validateToken = async function(req, res, next)
{
  console.log("validate token", req.body.auth_token);
  try
  {
    const decoded = jwt.verify(req.body.auth_token, process.env.TOKEN_SECRET);
    next();
  }
  catch (e)
  {
    res.send({resp: 'access-denied'});
  }

}

exports.validateRegisterData = async function(userData)
{
  let response = {
    err_stat: constants.REG_SUCCESSFUL,
    err_msg: ''
  };

  try
  {
    const value = await schema.validateAsync({ username: userData.username, password: userData.password, passwordRep: userData.passwordRep, email: userData.email });
  }
  catch (err)
  {
    response.err_msg = err.details[0].message;
    response.err_stat = constants.REG_FAILED;
    console.log(err);
  }

  return response;
};

exports.validateLoginData = async function(userData)
{
  let response = {
    err_stat: constants.REG_SUCCESSFUL,
    err_msg: ''
  };

  try
  {
    const value = await schema.validateAsync({email: userData.email, password: userData.password, passwordRep: userData.password, username: 'fakeuser'});
  }
  catch (err)
  {
    response.err_msg = err.details[0].message;
    response.err_stat = constants.REG_FAILED;
    console.log(err);
  }

  return response;
};

exports.generateToken = (userData) => {
  const payload = {
    login: userData.login
  }

  const token = jwt.sign(payload, process.env.TOKEN_SECRET);

  return token;
}
