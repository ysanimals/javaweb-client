<template>
  <el-container>
    <el-header class = "elheader">
      <div class="header">
        <div style="margin-top: 16px;">
          <div class="theme">
            <el-page-header
              @back="goBack" content="垃圾分类管理系统">
            </el-page-header>
          </div>
        </div>


        <div class="menu_right">
          <el-tag
            type="danger"
            size="medium"
            style="margin-left: 16px; font-size: 16px"
            @click="logout">退出登录</el-tag>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu style="border: none"
                 align="center"
                 @select="handleSelect"
                 :default-active="$route.path"
                 class="el-menu-vertical-demo"
                 background-color="beige"
                 text-color="black"
                 active-text-color="#ffd04b"
                 router>
          <el-menu-item
            v-for="menu in menuList"
            v-bind:key="menu.menuId"
            :index="nameMap[menu.menuSort]">{{ menu.menuName }}</el-menu-item>
          <el-submenu
            v-for="menu in menuList2"
            v-bind:key="menu.menuId"
            :index="nameMap[menu.menuSort]">
            <template slot="title">{{ menu.menuName }}</template>
            <el-menu-item
              v-for="subMenu in menu.children"
              v-bind:key="subMenu.menuSort"
              :index="subNameMap[subMenu.menuSort]">{{ subMenu.menuName }}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

    <el-main>
      <router-view/>
    </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'MenuLayout',
    data () {
      return {
        menuList: [],
        menuList2: [],
        active: '',
        nameMap: {
          1: '/menu/userInfo',
          2: '/menu/userManage',
          3: '/menu/garbageManage',
          4: '/menu/analysis',
          5: '/menu/exam'
        },
        subNameMap: {
          1: '/menu/analysis/garbageAnalysis',
          2: '/menu/analysis/userAnalysis',
          3: '/menu/analysis/examLog'
        }
      }
    },
    created () {
      const list = JSON.parse(localStorage.getItem('roles'))
      console.log(list)
      this.menuList = []
      this.menuList2 = []
      for (let item of list) {
        if (item.menuCode === 'menu') {
          for (let menu of item.children) {
            if (menu.children.length > 0) {
              this.menuList2.push(menu)
            } else {
              this.menuList.push(menu)
            }
          }
        }
      }
    },
    methods: {
      changeActive () {
        let path = this.$route.path
        this.active = path.substr(path.lastIndexOf('/') + 1)
        this.active = this.active.substr(0, 1).toUpperCase() + this.active.substr(1)
      },
      handleSelect (key, keyPath) {
        // console.log(key, keyPath)
        // if (key !== this.active) {
        //   const that = this
        //   this.$router.push({name: key}).then(
        //     that.active = key
        //   )
        // }
      },
      goBack () {
        this.$router.back()
        this.changeActive()
      },
      logout () {
        this.$confirm('确定要退出登录吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {//退出的时候把token从localStorage中移除
          localStorage.removeItem('access-token')
          window.location.href = '/'
        }).catch(() => {
        })
      }
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height:120px;
  }

  .elheader{
    background-image: url("../img/back1.jpg");
  }
  .header {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-content: center;
    border-bottom: 1px solid lightgrey;
  }

  .theme {
    width: 310px;
    display: flex;
  }

  .menu {
    width: 80%;
    display: flex;
    flex-direction: row;
    align-content: center;
  }

  .menu_right {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    margin-left: auto;
    cursor: pointer;
    font-family: 'Hiragino Sans GB', serif;
  }
</style>
