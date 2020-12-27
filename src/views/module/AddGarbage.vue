<template>
  <el-dialog
    title="新增垃圾信息"
    :visible.sync="visible"
    width="50%">
    <el-form
      status-icon
      ref="form"
      :model="garbage"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm">
      <el-row>
        <el-col :span="24">
          <el-form-item label="垃圾种类" prop="garbageFlag">
            <el-input type="text" v-model="garbage.garbageFlag"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="处理方式" prop="garbageInfo">
            <el-input type="text" v-model="garbage.garbageInfo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="垃圾名称" prop="garbageName">
            <el-input type="text" v-model="garbage.garbageName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="垃圾类别" prop="garbageType">
            <el-select v-model="garbage.garbageType" placeholder="请选择">
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
  name: 'AddGarbage',
  props: {
    options: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      visible: false,
      garbage: {},
      rules: {
        garbageFlag: [
          { required: true, message: '请输入垃圾种类', trigger: 'blur' }
        ],
        garbageInfo: [
          { required: true, message: '请输入处理方式', trigger: 'blur' }
        ],
        garbageName: [
          { required: true, message: '请输入垃圾名称', trigger: 'blur' }
        ],
        garbageType: [
          { required: true, message: '请输入垃圾类别', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show () {
      this.visible = true
    },
    handleSubmit () {
      const that = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          request.postNoJSON({url: '/api/garbage/add', data: that.garbage}).then(res => {
            if (res.result === 'error') {
              that.$message.error(res.result)
            } else {
              that.$message.success('添加成功')
              that.visible = false
              that.$emit('ok')
            }
          }).catch(err => {
            that.$message.error('添加失败')
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
