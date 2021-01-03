// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import Antd from 'ant-design-vue'

import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false

Vue.use(Antd);

Vue.prototype.$http = Axios;

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('koa-token');
  if (token) {
    if (to.path == '/' || to.path == '/login') {
      next('/home');
    } else {
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      next();
    }
  } else {
    if (to.path == '/' || to.path == '/login') {
      next();
    } else {
      next('/');
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
