<template>
  <div class="hello">
    <a-row type="flex" justify="center">
      <a-col :span="4">
        <h4>欢迎：{{username}}！你的待办事项是：</h4>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <a-col :span="4">
        <a-input v-model="todoThing" placeholder="请输入待办事项" @keydown="addTodo" />
      </a-col>
    </a-row>
    <a-row type="flex" justify="center" style="margin-top: 10px;">
      <a-col :span="4">
        <a-tabs default-active-key="1" @change="tabChange">
          <a-tab-pane key="1" tab="待办事项">
            <ul v-if="todoList.length">
              <li
                v-for="item in todoList"
                :key="item.id"
                style="text-align: left;font-size: 16px;font-weight: 600;"
                >
                <span>{{item.content}}</span>
                <a-button type="danger" size="small" style="float: right;" @click="delStep(item)">删除</a-button> 
                <a-button type="primary" size="small" style="float: right;margin-right: 10px;" @click="nextStep(item)">完成</a-button>
                <a-divider></a-divider>
              </li>
            </ul>
            <div v-if="!todoList.length">
              暂无待办事项
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="已完成事项" force-render>
              <ul v-if="finishList.length">
                <li
                  v-for="item in finishList"
                  :key="item.id"
                  style="text-align: left;font-size: 16px;font-weight: 600;"
                  >
                  <s>{{item.content}}</s>
                  <a-button type="primary" size="small" style="float: right;" @click="lastStep(item)">回退</a-button>
                  <a-divider></a-divider>
                </li>
              </ul>
              <div v-if="!finishList.length">
                暂无已完成事项
              </div>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const jwt = require('jsonwebtoken');

export default {
  name: 'Home',
  data () {
    return {
      username: '',
      id: '',
      todoThing: '',
      todoList: [],
      finishList: [],
    }
  },
  methods: {
    addTodo(e) {
      if (e.keyCode == 13) {
        if (!this.todoThing) {
          return;
        }
        const data = {
          id: this.id,
          content: this.todoThing,
          status: 0
        }
        this.todoThing = '';
        this.$http.post('/api/createTodolist', data).then(res => {
          if (res.status == 200) {
            this.getTodolist(0);
            this.$message.success('新增成功！');
          } else {
            this.$message.error('新增失败！');
          }
        }, err => {
          this.$message.error('新增失败！');
        })
      }
    },
    tabChange(val) {
      if (val == 1) {
        this.getTodolist(0);
      } else {
        this.getTodolist(1);
      }
    },
    delStep(data) {
      this.$http.get('/api/deleteTodolist/' + data.id).then(res => {
        if (res.status == 200) {
          this.getTodolist(0);
        }
      })
    },
    nextStep(data) {
      this.$http.get('/api/updateTodolist/' + data.id + '/1').then(res => {
        if (res.status == 200) {
          this.getTodolist(0);
        }
      })
    },
    lastStep(data) {
      this.$http.get('/api/updateTodolist/' + data.id + '/0').then(res => {
        if (res.status == 200) {
          this.getTodolist(1);
        }
      })
    },
    getUserInfo() {
      const token = sessionStorage.getItem('koa-token');
      if (token) {
        return jwt.decode(token);
      } else {
        return null;
      }
    },
    getTodolist(status) {
      this.$http.get('/api/getTodolist/' + this.id + '/' + status).then(res => {
        if (res.status == 200) {
          if (status == 0) {
            this.todoList = res.data;
          } else {
            this.finishList = res.data;
          }
        } else {
          this.$message.error('获取列表失败！');
        }
      })
    }
  },
  created() {
    this.$nextTick(() => {
      const userInfo = this.getUserInfo();
      this.username = userInfo && userInfo.name;
      this.id = userInfo && userInfo.id;

      this.getTodolist(0);
    })
  }
}
</script>

<style scoped>

</style>
