const { DataTypes } = require('sequelize');
const db = require('../config/db.js'),
      todoModel = '../schema/list.js';
const TodolistDb = db.Todolist;

// 这里使用sequelize.import会报错，应该是sequelize版本的问题，可回退至5.x.x版本或使用下边的方法
// const User = TodolistDb.import(userModel);   // 用sequelize的import方法引入表结构，实例化了User

const Todolist = require(todoModel)(TodolistDb, DataTypes);

const getTodolistById = async function (id) {
    const todolist = await Todolist.findAll({
        where: {
            user_id: id
        },
        attributes: ['id', 'content', 'status']
    })

    return todolist;
}

const createTodolist = async function (data) {
    await Todolist.create({
        user_id: data.id,
        content: data.content,
        status: data.status
    })
    
    return true;
}

module.exports = {
    getTodolistById,
    createTodolist
}

