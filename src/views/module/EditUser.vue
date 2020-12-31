<template>
  <el-dialog
    title="新增垃圾信息"
    :visible.sync="visible"
    width="50%">
    <el-form
      status-icon
      ref="form"
      :model="user"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm">
      <el-row>
        <el-col :span="24">
          <el-form-item label="用户名" prop="userName">
            <el-input type="text" v-model="user.userName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="手机号" prop="phone">
            <el-input type="text" v-model="user.phone" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="身份证号" prop="idNumber">
            <el-input type="text" v-model="user.phone" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="审核状态" prop="userType">
            <el-select v-model="user.userType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import request from '../../utils/request'

export default {
  name: 'EditUser',
  props: {
  },
  data () {
    return {
      visible: false,
      options: [
        {
          value: 1,
          label: '通过'
        },
        {
          value: 2,
          label: '不通过'
        }
      ],
      user: {},
      rules: {
        userType: [
          { required: true, message: '请输入审核状态', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show (record) {
      let obj = JSON.stringify(record)
      this.user = JSON.parse(obj)
      this.user.userType = null
      this.visible = true
    },
    handleSubmit () {
      const that = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          request.postNoJSON({url: '/api/user/update', data: that.user}).then(res => {
            if (res.result === 'error') {
              this.$message({
                type: 'error',
                showClose: true,
                message: res.result || '修改失败'})
            } else {
              this.$message({
                type: 'success',
                showClose: true,
                message: '修改成功'})
              that.visible = false
              that.$emit('ok')
            }
          }).catch(err => {
            this.$message({
              type: 'error',
              showClose: true,
              message: '修改失败'})
            console.log(err)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
