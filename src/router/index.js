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
import UserManage from '../views/UserManage'
import Exam from '../views/Exam'
import GarbageAnalysis from '../views/GarbageAnalysis'
import UserAnalysis from '../views/UserAnalysis'
import ExamLog from '../views/ExamLog'

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
      redirect: '/login',
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
          path: '/register',
          name: 'Register',
          component: Register,
          meta: {
            title: '注册',
            keepAlive: false
          }
        },
        {
          path: '/sortTrash',
          name: 'SortTrash',
          component: SortTrash,
          meta: {
            title: '垃圾分类小游戏',
            keepAlive: true
          }
        },
        {
          path: '/menu',
          name: 'Menu',
          redirect: '/menu/userInfo',
          component: MenuLayout,
          meta: { permission: ['menu'] },
          children: [
            {
              path: '/menu/userInfo',
              name: 'UserInfo',
              component: UserInfo,
              meta: {
                keepAlive: true,
                permission: ['menu-userInfo']
              }
            },
            {
              path: '/menu/userManage',
              name: 'UserManage',
              component: UserManage,
              meta: {
                keepAlive: true,
                permission: ['menu-userManage']
              }
            },
            {
              path: '/menu/garbageManage',
              name: 'GarbageManage',
              component: GarbageManage,
              meta: {
                keepAlive: true,
                permission: ['menu-userManage']
              }
            },
            {
              path: '/menu/analysis',
              name: 'Analysis',
              redirect: '/menu/analysis/garbageAnalysis',
              component: Analysis,
              meta: {
                keepAlive: true,
                permission: ['menu-analysis']
              },
              children: [
                {
                  path: '/menu/analysis/garbageAnalysis',
                  name: 'GarbageAnalysis',
                  component: GarbageAnalysis,
                  meta: {
                    keepAlive: true,
                    permission: ['menu-analysis-garbage']
                  }
                },
                {
                  path: '/menu/analysis/userAnalysis',
                  name: 'UserAnalysis',
                  component: UserAnalysis,
                  meta: {
                    keepAlive: true,
                    permission: ['menu-analysis-user']
                  }
                },
                {
                  path: '/menu/analysis/examLog',
                  name: 'ExamLog',
                  component: ExamLog,
                  meta: {
                    keepAlive: true,
                    permission: ['menu-analysis-exam']
                  }
                }
              ]
            },
            {
              path: 'exam',
              name: 'Exam',
              component: Exam,
              meta: {
                keepAlive: true,
                permission: ['menu-exam']
              }
            }
          ]
        }
      ]
    }
  ]
})
