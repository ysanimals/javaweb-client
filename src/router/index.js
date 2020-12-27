import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Register from '../views/Register'
import UserInfo from '../views/UserInfo'
import SortTrash from '../views/SortTrash'
import GarbageManage from '../views/GarbageManage'
import Analysis from '../views/Analysis'
import PageView from '../Layout/PageView'
import MenuLayout from '../Layout/MenuLayout'

Vue.use(Router)

// const VueRouterPush = Router.prototype.push
// Router.prototype.push = function push (to) {
//     return VueRouterPush.call(this, to).catch(err => err)
// }
//
// const VueRouterReplace = Router.prototype.replace
// Router.prototype.replace = function replace (to) {
//     return VueRouterReplace.call(this, to).catch(err => err)
// }
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'login',
      component: PageView,
      children: [
        {
          path: '/login',
          name: 'Login',
          component: Login,
          meta: {
            title: '登录',
            keepAlive: false
          }
        },
        {
          path: 'register',
          name: 'Register',
          component: Register,
          meta: {
            title: '注册',
            keepAlive: false
          }
        },
        {
          path: '/menu',
          redirect: 'userInfo',
          component: MenuLayout,
          children: [
            {
              path: 'userInfo',
              name: 'UserInfo',
              component: UserInfo,
              meta: {
                title: '垃圾分类小游戏',
                keepAlive: true
              }
            },
            {
              path: 'sortTrash',
              name: 'SortTrash',
              component: SortTrash,
              meta: {
                title: '垃圾分类小游戏',
                keepAlive: true
              }
            },
            {
              path: 'garbageManage',
              name: 'GarbageManage',
              component: GarbageManage,
              meta: {
                title: '垃圾分类小游戏',
                keepAlive: true
              }
            },
            {
              path: 'analysis',
              name: 'Analysis',
              component: Analysis,
              meta: {
                title: '垃圾分类小游戏',
                keepAlive: true
              }
            }
          ]
        }
      ]
    }
  ]
})
