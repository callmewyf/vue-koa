const todolist = require('../controllers/todolist');
const router = require('koa-router')();

router.get('/getTodolist/:id/:status', todolist.getTodolist);
router.post('/createTodolist', todolist.createTodolist);
router.get('/updateTodolist/:id/:status', todolist.updateTodolist);
router.get('/deleteTodolist/:id', todolist.deleteTodolist);

module.exports = router;
