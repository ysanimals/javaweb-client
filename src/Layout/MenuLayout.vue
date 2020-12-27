<template>
  <el-container>
    <el-header>
      <div class="header">
        <div style="margin-top: 16px;">
          <div class="theme">
            <el-page-header
              @back="goBack" content="垃圾分类小游戏管理系统">
            </el-page-header>
          </div>
        </div>
        <div class="menu">
          <el-menu style="border: none"
                   @select="handleSelect"
                   :default-active="$route.path.substr($route.path.lastIndexOf('/') + 1)"
                   class="el-menu-demo"
                   mode="horizontal"
                   router>
            <el-menu-item index="userInfo">用户信息</el-menu-item>
            <el-menu-item index="sortTrash">开始游戏</el-menu-item>
            <el-menu-item index="garbageManage">题库管理</el-menu-item>
            <el-menu-item index="analysis">数据统计</el-menu-item>
          </el-menu>
        </div>
        <div class="logout" @click="logout">
          <span style="font-family: 'Hiragino Sans GB', serif;">退出登录</span>
        </div>
      </div>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'MenuLayout',
  data () {
    return {
      active: ''
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
      }).then(() => {
        localStorage.removeItem('access-token')
        window.location.href = '/'
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped>
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
  width: 100%;
  margin-left: 32px;
  display: flex;
  flex-direction: row;
  align-content: center;
}

.logout {
  width: 136px;
  display: flex;
  justify-content: center;
  margin-left: auto;
  line-height: 60px;
  cursor: pointer;
}
</style>
