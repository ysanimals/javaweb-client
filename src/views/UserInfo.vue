<template>
  <div class="body">
    <div class="center">
      <el-form style="margin-top: 40px">
        <el-form-item label="用户姓名" style="display: flex; flex-direction: row">
          <el-input style="margin-left: 16px" v-model="userInfo.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号码" style="display: flex; flex-direction: row">
          <el-input style="margin-left: 16px" v-model="userInfo.phone" disabled></el-input>
        </el-form-item>
        <el-form-item label="身份证号" style="display: flex; flex-direction: row">
          <el-input style="margin-left: 16px" v-model="userInfo.idNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="答题总数" style="display: flex; flex-direction: row">
          <el-input style="margin-left: 16px" v-model="userInfo.total" disabled></el-input>
        </el-form-item>
        <el-form-item label="正确题数" style="display: flex; flex-direction: row">
          <el-input style="margin-left: 16px" v-model="userInfo.right" disabled></el-input>
        </el-form-item>
        <el-form-item label="错误题数" style="display: flex; flex-direction: row">
          <el-input style="margin-left: 16px" v-model="userInfo.wrong" disabled></el-input>
        </el-form-item>
        <el-form-item label="未答题数" style="display: flex; flex-direction: row">
          <el-input style="margin-left: 16px" v-model="userInfo.noAnswer" disabled></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from '../utils/request'

export default {
  name: 'UserInfo',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    const that = this
    request.postNoJSON({url: '/api/user/userInfo'}).then(res => {
      if (res.message === 'error') {
        that.$notify.error({
          title: '错误',
          message: res.result
        })
      } else {
        that.userInfo = res.result
        console.log(res.result)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    goto (val) {
      this.$router.push({name: val})
    },
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

.body {
  width: 100%;
  height: 100%;
}

.center {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
