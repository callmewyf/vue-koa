const { DataTypes } = require('sequelize');
const db = require('../config/db'),
      userModel = '../schema/user';   // 引入表结构
const TodolistDb = db.Todolist;   // 引入数据库

// 这里使用sequelize.import会报错，应该是sequelize版本的问题，可回退至5.x.x版本或使用下边的方法
// const User = TodolistDb.import(userModel);   // 用sequelize的import方法引入表结构，实例化了User

const User = require(userModel)(TodolistDb, DataTypes);

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

