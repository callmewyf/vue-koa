const user = require('../models/user');

const getUserInfo = async function () {
  const id = this.params.id;
  const result = await user.getUserById(id);
  this.bodu = result;
}

module.exports = {
  getUserInfo,
}