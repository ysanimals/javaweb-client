<template>
  <div id="app">
    <div class="center">
      <div class="header"></div>
      <div class="background">
        <div class="image">
          <form method="post" name="loginForm">
            <!--class类选择器-->
            <div class="loginTable">
              <div style="width: 100%;">
                <div>
                  <h2>
                    <!--html选择器-->
                    用户登录
                    <a
                       @click="$router.push({name: 'Register'})"
                       target="_self">
                      用户注册
                    </a>
                  </h2>
                  <hr style="width: 100%; height: 1px; color:silver">
                </div>
              </div>
              <div class="tableRow">
                <div class="label">
                  <span class="registerMessage">用户名：</span>
                </div>
                <label>
                  <input class="loginText" v-model="formData.userName" type="text"
                         onfocus="this.placeholder=''" onblur="this.placeholder='请输入用户名'"
                         placeholder="请输入用户名">
                </label>
              </div>
              <div class="tableRow">
                <div class="label">
                  <span class="registerMessage">密码：</span>
                </div>
                <label>
                  <input class="loginText" v-model="formData.userPwd" type="password"
                         onfocus="this.placeholder=''" onblur="this.placeholder='请输入密码'"
                         placeholder="请输入密码">
                </label>
              </div>
              <div class="align_left">
                <div>
                  <input id="rememberMe" v-model="formData.rememberMe" type="checkbox">
                  <label id="loginCheck" for="rememberMe">两周内自动登录</label>
                </div>
              </div>
              <div class="tableRow">
                <div class="label">
                  <span class="registerMessage">验证码：</span>
                </div>
                <label>
                  <input class="loginText" style="width: 120px;"
                         v-model="formData.userCode"
                         placeholder="请输入验证码">
                </label>
                <div class="codeContainer">
                  <img class="codeImage" :src="imgInfo.src" alt="" id="codeImage" ref="codeImage"
                       @click="changeCode(this)">
                </div>
              </div>
              <div class="buttons">
                <input class="loginButton"
                       id="loginSys"
                       name="loginSys"
                       type="button"
                       :disabled="!clickType"
                       @click="handleSubmit" value="登    录">
                <input class="loginButton" id="resetForm" name="resetForm" type="reset"
                       value="重    置">
              </div>
            </div>
          </form>
        </div>
      </div>
      <br>
      <!--行内样式-->
      <span style="font-family: 微软雅黑 Light, serif; font-size: 14px; font-weight: bold; color: gray;">
                版权所有 © 浙大宁波理工学院数据分院
            </span>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import request from '../utils/request'

export default {
  name: 'Login',
  data () {
    return {
      clickType: true,
      formData: {
        userName: '',
        userPwd: '',
        rememberMe: false,
        userCode: ''
      },
      imgInfo: {
        src: '',
        imgCodeKey: ''
      }
    }
  },
  created () {
    let token = localStorage.getItem('access-token')
    if (token && token.length > 0) {
      this.$router.replace({name: 'UserInfo'})
    }
    this.changeCode()
  },
  methods: {
    changeCode () {
      const that = this
      request.get({url: 'api/code/getImgCode'}).then(res => {
        that.imgInfo.src = res.data
        that.imgInfo.imgCodeKey = res.imgCodeKey
      }).catch(err => {
        console.log(err)
      })
    },

    handleSubmit () {
      if (!this.formData.userCode || this.formData.userCode.length === 0) {
        alert('验证码为空')
        return
      }
      let formData = {
        loginName: this.formData.userName,
        loginPwd: md5(this.formData.userPwd),
        rememberMe: this.formData.rememberMe
      }
      let imgData = {
        imgCodeKey: this.imgInfo.imgCodeKey,
        imgCode: this.formData.userCode
      }
      const that = this
      this.clickType = false
      request.post({url: '/api/code/checkImgCode', data: imgData}).then(res => {
        if (res.message === 'yes') {
          request.post({url: '/api/user/login', data: formData}).then(res => {
            that.clickType = true
            if (res.status === 200) {
              localStorage.setItem('access-token', res.token)
              alert('登录成功')
              that.$router.push({name: 'UserInfo'})
            } else {
              alert(res.result)
            }
          }).catch(err => {
            that.clickType = true
            console.log(err)
          })
        } else {
          that.formData.userCode = ''
          that.clickType = true
          alert(res.result)
          that.changeCode()
        }
      }).catch(err => {
        that.clickType = true
        console.log(err)
      })
    }
  }
}
</script>

<style>
h2 {
  color: gray;
  font-family: "微软雅黑 Light", serif;
  font-size: 20px;
  font-weight: bold;
}

.center {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header {
  width: 100%;
  height: 40px;
}

.background {
  width: 100%;
  background: #020202;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.label {
  margin-left: 12px;
  width: 80px;
}

.image {
  width: 1000px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: url("../img/background.jpg");
  background-size: cover;
}

.tableRow {
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.registerMessage {
  color: gray;
  font: bold 14px 微软雅黑 Light;
}

a {
  font-size: 13px;
  cursor: pointer;
}

/*html选择器*/
a:link {
  color: #337ab7;
  text-decoration: none;
  font-family: "微软雅黑 Light", serif;
  font-size: 13px;
  font-weight: bold;
}

/*html选择器*/
a:visited {
  color: #337ab7;
  text-decoration: none;
  font-family: "微软雅黑 Light", serif;
  font-size: 13px;
  font-weight: bold;
}

/*html选择器*/
a:hover {
  color: #337ab7;
  text-decoration: underline;
  font-family: "微软雅黑 Light", serif;
  font-size: 13px;
  font-weight: bold;
}

/*html选择器*/
a:active {
  color: #337ab7;
  text-decoration: underline;
  font-family: "微软雅黑 Light", serif;
  font-size: 13px;
  font-weight: bold;
}

/*class类选择器*/
.loginTable {
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.align_left {
  align-self: flex-start;
}

/*class类选择器*/
.loginTable td {
  width: 100%;
  height: 50px;
  border: none;
}

/*class类选择器*/
.loginText {
  margin-top: 12px;
  color: #000000;
  width: 300px;
  font-family: "微软雅黑 Light", serif;
  font-weight: bold;
  font-size: 14px;
  padding: 8px 10px;
  cursor: hand;
}

.buttons {
  margin-left: 92px;
  margin-top: 12px;
  width: 330px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

/*class类选择器*/
.loginButton {
  color: white;
  width: 155px;
  height: 35px;
  font: bold 16px 微软雅黑 Light;
  padding: 1px 20px 0 20px;
  border: #337ab7 1px solid;
  background: #337ab7;
  cursor: pointer;
}

/*id选择器*/
#rememberMe {
  margin-top: 12px;
  margin-left: 135px;
}

/*id选择器*/
#loginCheck {
  color: silver;
  font: bold 14px 微软雅黑 Light;
}

::-webkit-input-placeholder {
  font-family: "微软雅黑 Light", serif;
  font-weight: bold;
  font-size: 14px;
  color: silver;
}

.codeContainer {
  background: #FFFFFF;
  width: 160px;
  height: 40px;
  margin-left: 20px;
  margin-top: 12px;
}

.codeImage {
  width: 100%;
  height: 100%;
}
</style>
