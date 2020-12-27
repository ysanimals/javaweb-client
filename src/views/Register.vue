<template>
  <div class="body">
    <div class="center">
      <div class="header"></div>
      <div class="background">
        <div class="image">
          <form method="get" action="" name="form">
            <!--class类选择器-->
            <div class="registerTable">
              <div style="width: 100%;">
                <div>
                  <h2>
                    用户注册 <a @click="$router.push({name: 'Login'})" target="_self">用户登录</a>
                  </h2>
                  <hr style="width: 100%;height: 1px;color: silver">
                </div>
              </div>
              <div class="tableRow">
                <div class="label">
                  <span class="registerMessage">手机号码：</span>
                </div>
                <div class="input">
                  <label for="phone"></label>
                  <input class="registerText" id="phone" v-model="form.phone" type="text">
                </div>
                <div class="message">
                  <span class="registerMessage">11位有效号码，用于登录账号</span>
                </div>
              </div>
              <div class="tableRow">
                <div class="label">
                  <span class="registerMessage">用户密码：</span>
                </div>
                <div class="input">
                  <label for="password"></label>
                  <input class="registerText" id="password" v-model="form.password" type="password">
                </div>
                <div class="message">
                  <span class="registerMessage">不少于8位，由字母和数字组成</span>
                </div>
              </div>
              <div class="tableRow">
                <div class="label">
                  <span class="registerMessage">确认密码：</span>
                </div>
                <div class="input">
                  <label for="checkPwd"></label>
                  <input class="registerText" id="checkPwd" v-model="form.checkPwd" type="password">
                </div>
                <div class="message">
                  <span class="registerMessage">两次密码保持一致</span>
                </div>
              </div>
              <div class="tableRow">
                <div class="label">
                  <span class="registerMessage">用户姓名：</span>
                </div>
                <div class="input">
                  <label for="userName"></label>
                  <input class="registerText" id="userName" v-model="form.userName" type="text">
                </div>
                <div class="message">
                  <span class="registerMessage">不能为空</span>
                </div>
              </div>
              <div class="tableRow">
                <div class="label">
                  <span class="registerMessage">身份证号：</span>
                </div>
                <div class="input">
                  <label for="idNumber"></label>
                  <input class="registerText" id="idNumber" v-model="form.idNumber" type="text">
                </div>
                <div class="message">
                  <span class="registerMessage">有效的身份证号码</span>
                </div>
              </div>
              <div class="tableRow">
                <input class="registerButton"
                       id="userRegister"
                       name="userRegister"
                       :disabled="!clickType"
                       type="button"
                       @click="handleSubmit" value="立即注册">
              </div>
            </div>
          </form>
        </div>
      </div>
      <br>
      <!--行内样式-->
      <span style="font-family: 微软雅黑 Light,serif; font-size: 14px; font-weight: bold; color: gray;">
            版权所有 © 浙大宁波理工学院数据分院
        </span>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import request from '../utils/request'

export default {
  name: 'Register',
  data () {
    return {
      clickType: true,
      // 手机号正则表达式
      phoneRe: /^1([3456789])\d{9}$/,
      // 邮箱正则表达式
      // const emailRe = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+(([.\-])[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
      // 密码正则表达式，不小于8位的数字字母组合值
      pwdRe: /(?=.*\d)(?=.*[A-z])^[0-9A-z]{8,}$/,
      cardRe: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/,
      form: {}
    }
  },
  created () {
  },
  methods: {

    check () {
      const phone = this.form.phone
      const password = this.form.password
      const checkPwd = this.form.checkPwd
      const userName = this.form.userName
      const idNumber = this.form.idNumber
      let flag = phone && password && checkPwd && userName && idNumber &&
        phone.length > 0 && password.length > 0 && checkPwd.length > 0 && userName.length > 0 &&
        idNumber.length > 0
      if (!flag) {
        alert('信息填写不完整！')
        return false
      }
      if (!this.phoneRe.test(phone)) {
        alert('手机号格式不正确！')
        return false
      }
      if (password === checkPwd) {
        if (!this.pwdRe.test(checkPwd)) {
          alert('登录密码格式不正确！')
          return false
        }
      } else {
        alert('确认密码必须和输入的密码相同！')
        return false
      }
      if (!this.cardRe.test(idNumber)) {
        alert('身份证号格式不正确！')
        return false
      }
      return true
    },

    handleSubmit () {
      if (!this.check()) {
        return
      }
      let form = {
        userName: this.form.userName,
        password: md5(this.form.password),
        phone: this.form.phone,
        idNumber: this.form.idNumber
      }
      const that = this
      this.clickType = false
      request.postNoJSON({url: '/api/user/checkName', data: form.userName}).then(res => {
        if (res.message === 'ok') {
          request.postNoJSON({url: '/api/user/register', data: form}).then(res => {
            that.clickType = true
            if (res.message !== 'error') {
              alert('注册成功，欢迎登录')
              that.$router.push({name: 'Login'})
            } else {
              alert(res.result)
            }
          }).catch(err => {
            that.clickType = true
            console.log(err)
          })
        } else {
          that.clickType = true
          alert(res.result)
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
/*html选择器*/
h2 {
  color: gray;
  font: bold 20px 微软雅黑 Light;
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

.image {
  width: 1000px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: url("../img/background.jpg");
  background-size: cover;
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

.tableRow {
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.label {
  margin-left: 12px;
  width: 80px;
}

.input {
  margin-left: 8px;
}

.message {
  margin-left: 12px;
  width: 120px;
}

/*class类选择器*/
.registerTable {
  width: 550px;
}

/*class类选择器*/
.registerMessage {
  color: gray;
  font: bold 14px 微软雅黑 Light;
}

/*class类选择器*/
.registerText {
  width: 300px;
  font: bold 14px 微软雅黑 Light;
  padding: 8px 10px;
  border: silver 1px solid;
  cursor: hand;
}

/*class类选择器*/
.registerButton {
  color: white;
  width: 320px;
  height: 40px;
  font: bold 16px 微软雅黑 Light;
  border: #337ab7 1px solid;
  margin-left: 100px;
  cursor: hand;
  background: #337ab7;
}
</style>
