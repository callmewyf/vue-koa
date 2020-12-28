<template>
  <div class="hello">
    <a-row type="flex" justify="center">
      <a-col :span="4">
        <h4>欢迎{{username}}!你的待办事项是：</h4>
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
            <ul v-if="hasWait">
              <li
                v-for="(item, index) in todoList"
                :key="item.id"
                style="text-align: left;font-size: 16px;font-weight: 600;"
                >
                <span>{{item.content}}</span>
                <a-button type="danger" size="small" style="float: right;" @click="delStep(index)">删除</a-button> 
                <a-button type="primary" size="small" style="float: right;margin-right: 10px;" @click="nextStep(index)">完成</a-button>
                <a-divider></a-divider>
              </li>
            </ul>
            <div v-if="!hasWait">
              暂无待办事项
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="已完成事项" force-render>
              <ul v-if="hasData">
                <li
                  v-for="(item, index) in finishList"
                  :key="item.id"
                  style="text-align: left;font-size: 16px;font-weight: 600;"
                  >
                  <s>{{item.content}}</s>
                  <a-button type="primary" size="small" style="float: right;" @click="lastStep(index)">回退</a-button>
                  <a-divider></a-divider>
                </li>
              </ul>
              <div v-if="!hasData">
                暂无已完成事项
              </div>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      username: '',
      todoThing: '',
      todoList: [],
      finishList: [],
      hasWait: true,
      hasData: false,
    }
  },
  methods: {
    addTodo(e) {
      if (e.keyCode == 13) {
        this.todoList.push({
          id: this.todoList.length + 1,
          content: this.todoThing
        })
        this.todoThing = '';
        this.hasWait = true;
      }
    },
    tabChange() {

    },
    delStep(index) {
      this.todoList.splice(index, 1);
      if (!this.todoList.length) {
        this.hasWait = false;
      }
    },
    nextStep(index) {
      let data = this.todoList.splice(index, 1);
      this.finishList.push(data[0]);
      this.hasData = true;
    },
    lastStep(index) {
      let data = this.finishList.splice(index, 1);
      this.todoList.push(data[0]);
      this.hasWait = this.todoList.length ? true : false;
      this.hasData = this.finishList.length ? true : false;
    }
  },
  created() {
    this.$nextTick(() => {
      this.hasWait = this.todoList.length ? true : false;
      this.hasData = this.finishList.length ? true : false;
    })
  }
}
</script>

<style scoped>

</style>
