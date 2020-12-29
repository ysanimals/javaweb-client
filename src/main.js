import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from "@/views/Home";
import router from './router/index'
import App from './App'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui' // element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'// element-ui的css

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(ElementUI) // 使用elementUI

let flag = false
// 递归查找权限
function checkPermission (p, t) {
  if (flag) {
    return
  }
  if (p && t.menuCode && p[0] === t.menuCode) {
    flag = true
  } else {
    if (t.children && t.children.length > 0) {
      for (let child of t.children) {
        checkPermission(p, child)
      }
    }
  }
}

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  const roles = JSON.parse(localStorage.getItem('roles'))
  if (to.name !== 'Login' && to.name !== 'Register' && to.name !== 'SortTrash' && to.path.indexOf('/file') === -1) {
    flag = false
    for (let role of roles) {
      checkPermission(to.meta.permission, role)
    }
    if (flag) {
      next()
    } else {
      ElementUI.Message({
        showClose: true,
        message: '权限不足！',
        type: 'error'
      })
    }
  } else {
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next()
  }
})

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
