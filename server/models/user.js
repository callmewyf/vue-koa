const db = require('../config/db'),
      userModel = '../schema/user';   // 引入表结构
const TodolistDb = db.Todolist;   // 引入数据库

Object.keys(TodolistDb).forEach(i=>{console.log(i)})

const User = TodolistDb.import(userModel);   // 用sequelize的import方法引入表结构，实例化了User

const getUserById = async function (id) {
  const userInfo = await User.findOne({
    where: {
      id: id
    }
  })

  return userInfo;
}

module.exports = {
  getUserById,
}

