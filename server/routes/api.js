const todolist = require('../controllers/todolist');
const router = require('koa-router')();

router.get('/getTodolist/:id', todolist.getTodolist);
router.post('/createTodolist', todolist.createTodolist);

module.exports = router;
