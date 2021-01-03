const todolist = require('../models/todolist');

const getTodolist = async function (ctx, next) {
    const id = ctx.request.params.id;
    const result = await todolist.getTodolistById(id);
    ctx.response.body = result;
}

const createTodolist = async function (ctx, next) {
    const data = ctx.request.body;
    const result = await todolist.getTodolist(data);
    ctx.response.body = {
        success: true
    };
}

module.exports = {
    getTodolist,
    createTodolist
}