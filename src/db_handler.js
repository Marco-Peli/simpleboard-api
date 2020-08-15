const consts = require('./constants');
const regHandler = require('./register_utils');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Musiamusia96!',
    database : 'simpleboard-api'
  }
});

exports.knex = db;

exports.registerUser = async function (res, registerData)
{
  let msg = {
    err_stat: consts.REG_SUCCESSFUL,
    err_msg: 'ok'
  }
  let validateResp =  regHandler.validateRegisterData(registerData);
  let dbResponse = {};
  let salt = '';
  let passHash = '';

  if(validateResp.err_stat !== consts.REG_FAILED)
  {
    try
    {
      passHash = await bcrypt.hash(registerData.password, saltRounds);
      let digestData = {
        login: registerData.login,
        password: passHash
      };
      dbResponse = await db('simpleboard-api.login').insert(digestData);
  	}
  	catch(err)
    {
      msg = {
  			err_stat: consts.REG_FAILED,
  			err_msg: 'email already registered'
  		}

      dbResponse = err;
  	}
  }
  else {
    msg.err_stat = validateResp.err_stat;
    msg.err_msg = validateResp.err_msg;
  }
  console.log('db response: ', dbResponse);
  console.log('validate_user_resp:', validateResp);
  res.json(msg);
}
