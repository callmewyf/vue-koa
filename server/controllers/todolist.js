const todolist = require('../models/todolist');

const getTodolist = async function (ctx, next) {
    const id = ctx.request.params.id;
    const status = ctx.request.params.status;
    const result = await todolist.getTodolistById(id, status);
    ctx.response.body = result;
}

const createTodolist = async function (ctx, next) {
    const data = ctx.request.body;
    const result = await todolist.createTodolist(data);
    ctx.response.body = {
        success: true
    };
}

const updateTodolist = async function (ctx, next) {
    const id = ctx.request.params.id;
    const status = ctx.request.params.status;
    const result = await todolist.updateTodolist(id, status);
    ctx.response.body = {
        success: result
    };
}

const deleteTodolist = async function (ctx, next) {
    const id = ctx.request.params.id;
    const result = await todolist.deleteTodolist(id);
    ctx.response.body = {
        success: result
    };
}

module.exports = {
    getTodolist,
    createTodolist,
    updateTodolist,
    deleteTodolist
}