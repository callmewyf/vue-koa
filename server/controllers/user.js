const user = require('../models/user');
// jsonwebtoken 用于签发、解析 token
// koa-jwt 用于路由权限控制
const jwt = require('jsonwebtoken');

const getUserInfo = async function (ctx, next) {
  const id = ctx.params.id;
  const result = await user.getUserById(id);
  ctx.response.body = result;
}

// 验证用户名和密码
const postUserAuth = async function (ctx, next) {
  const data = ctx.request.body;
  const userInfo = await user.getUserByName(data.name);

  if (userInfo != null) {
    if (userInfo.password != data.password) {
      ctx.response.body = {
        success: false,
        info: '密码错误！'
      }
    } else {
      const userToken = {
        name: userInfo.user_name,
        id: userInfo.id
      }
      const secret = 'vue-koa-demo';
      const token = jwt.sign(userToken, secret);
      ctx.response.body = {
        success: true,
        token: token,
      }
    }
  } else {
    ctx.response.body = {
      success: false,
      info: '用户不存在！'
    }
  }
}

module.exports = {
  getUserInfo,
  postUserAuth,
}