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
  console.log('response: ', msg);
  res.json(msg);
}

exports.loginUser = async function (res, loginData)
{
  let msg = {
    err_stat: consts.LOGIN_SUCCESSFUL,
    err_msg: 'login success'
  }

  let compareRet = false;
  let validateResp =  regHandler.validateRegisterData(loginData);

  if(validateResp.err_stat === consts.DATA_VALID)
  {
    try
    {
      let passObj = await db('simpleboard-api.login').where({
                    login: loginData.login
                  }).select('password');
      let passHash = passObj[0].password;
      let compareRet = await bcrypt.compare(loginData.password, passHash);
      if(!compareRet)
      {
        throw 'Username and/or password is incorrect';
      }
  	}
  	catch(e)
    {
      msg = {
  			err_stat: consts.REG_FAILED,
  			err_msg: 'Username and/or password is incorrect'
  		}
  	}
  }
  else {
    msg.err_stat = validateResp.err_stat;
    msg.err_msg = validateResp.err_msg;
  }
  res.json(msg);
}
