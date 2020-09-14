let consts = {};
const authHandler = require('./auth_handler');
const bcrypt = require('bcrypt');

let db = {};

exports.dbHandlerInitVars = function()
{
  consts = require('./config_handler').mainConfig;
  db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : consts.DB_USERNAME,
      password : consts.DB_PASSWORD,
      database : consts.DB_NAME
    }
  });
  console.log(consts.DB_HANDLER_MODULE_PREFIX, "db handler module init");
}

exports.knex = db;

exports.registerUser = async function (res, registerData)
{
  let msg = {
    err_stat: consts.REG_SUCCESSFUL,
    err_msg: 'ok',
    auth_token: ''
  }
  let validateResp =  await authHandler.validateRegisterData(registerData);
  let salt = '';

  if(validateResp.err_stat !== consts.REG_FAILED)
  {
    try
    {
      const passHash = await bcrypt.hash(registerData.password, consts.SALT_ROUNDS);
      let digestData = {
        login: registerData.email,
        password: passHash
      };
      await db.transaction(async trx => {
        await db('simpleboard-api.login').insert(digestData).transacting(trx);
        await db('simpleboard-api.users').insert({username: registerData.email, join_date: new Date()}).transacting(trx);
      })
      msg.auth_token = authHandler.generateToken(digestData);
  	}
  	catch(err)
    {
      msg = {
  			err_stat: consts.REG_FAILED,
  			err_msg: 'user already registered'
  		}
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
    err_msg: 'login success',
    auth_token: ''
  }

  try
  {
    const validateResp = await authHandler.validateLoginData(loginData);

    if(validateResp.err_stat !== consts.LOGIN_SUCCESSFUL)
    {
      throw "Err";
    }

    const passObj = await db('simpleboard-api.login').where({
                  login: loginData.email
                }).select('password');
    const passHash = passObj[0].password;
    const compareRet = await bcrypt.compare(loginData.password, passHash);

    if(!compareRet)
    {
      throw 'Username and/or password is incorrect';
    }

    msg.auth_token = authHandler.generateToken({login: loginData.email}); 

	}
	catch(e)
  {
    msg = {
			err_stat: consts.REG_FAILED,
			err_msg: 'Username and/or password is incorrect'
		}
	}

  res.json(msg);
}
