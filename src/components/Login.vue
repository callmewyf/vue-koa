<template>
  <div class="hello">
    <a-row type="flex" justify="center">
      <a-col :span="4">
        <h1>欢迎登录</h1>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <a-col :span="4">
        <a-form :form="form" :wrapper-col="{ span: 24 }" @submit="handleSubmit">
          <a-form-item label="">
            <a-input
              v-decorator="['username', { rules: [{ required: true, message: 'Please input your username!' }] }]"
              placeholder="账号"
            />
          </a-form-item>
          <a-form-item label="">
            <a-input
              v-decorator="['password', { rules: [{ required: true, message: 'Please input your password!' }] }]"
              placeholder="密码"
            />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 24, offset: 0 }">
            <a-button type="primary" html-type="submit" block>
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('提交值', values);
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
