<template>
  <div class="body">
    <div class="center">
      <el-form ref="form" label-width="200px">
        <el-row>
          <el-col :span="12">
            <el-form-item label=" " >
<!--              <el-input  v-model="userInfo.userName" disabled></el-input>-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
<!--            <el-form-item label="正确率">-->
<!--              <el-input  v-model="userInfo.accuracy" disabled></el-input>-->
<!--            </el-form-item>-->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户姓名" >
              <el-input  v-model="userInfo.userName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="正确率">
              <el-input  v-model="userInfo.accuracy" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户权限" >
              <el-input  v-model="userInfo.roleName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="答题总数" >
              <el-input  v-model="userInfo.total" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码">
              <el-input  v-model="userInfo.phone" disabled></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="12">
            <el-form-item label="答对题数">
              <el-input v-model="userInfo.right" disabled></el-input>
            </el-form-item>
            </el-col>
          </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="身份证号" >
              <el-input  v-model="userInfo.idNumber" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="答错题数" >
              <el-input  v-model="userInfo.wrong" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--        <el-form-item label="未答题数" style="display: flex; flex-direction: row">-->
        <!--          <el-input style="margin-left: 16px" v-model="userInfo.noAnswer" disabled></el-input>-->
        <!--        </el-form-item>-->
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
        // console.log(res)
        if (res.message === 'error') {
          that.$notify.error({
            title: '错误',
            message: res.result
          })
        } else {
          that.userInfo = res.result
          that.userInfo.noAnswer = res.result.total - res.result.right - res.result.wrong
          that.userInfo.accuracy = (res.result.total === 0 ? 0 : res.result.right / res.result.total * 100) + '%'
          if (res.result.roleId === 1) {
            that.userInfo.roleName = '管理员'
          } else {
            that.userInfo.roleName = '普通用户'
          }
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
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-image: url("../img/back1.jpg");
  }

  .center {
    height: 800px;
    width: 100%;
    margin:auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
