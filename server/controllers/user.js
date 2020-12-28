const user = require('../models/user');

const getUserInfo = async function (ctx, next) {
  const id = ctx.params.id;
  const result = await user.getUserById(id);
  ctx.response.body = result;
}

module.exports = {
  getUserInfo,
}