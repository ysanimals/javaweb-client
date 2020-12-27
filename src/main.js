import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from "@/views/Home";
import router from './router/index'
import App from './App'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui' // element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'// element-ui的css

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(ElementUI) // 使用elementUI

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
