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
          <el-form-item label="垃圾名称" prop="garbageName">
            <el-input type="text" v-model="garbage.garbageName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="垃圾类别" prop="sortId">
            <el-select v-model="garbage.sortId" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="垃圾图片"  v-model="garbage.file" prop="imageUrl">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="#"
              :limit="1"
              :http-request="handleUpdate"
              :on-change="handleChange"
              :on-remove="handleRemove"
              :multiple="false"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
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
  name: 'EditGarbage',
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
          { required: false, message: '请输入垃圾种类', trigger: 'blur' }
        ],
        garbageName: [
          { required: true, message: '请输入垃圾名称', trigger: 'blur' }
        ],
        sortId: [
          { required: true, message: '请输入垃圾类别', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show (record) {
      let obj = JSON.stringify(record)
      this.garbage = JSON.parse(obj)
      // this.garbage = record
      this.visible = true
    },
    handleUpdate(obj) {
      console.log(obj.file)
      this.garbage.file = obj.file
    },
    handleSubmit () {
      const that = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let formData = new FormData
          formData.append('file', that.garbage.file)
          formData.append('garbageId',that.garbage.garbageId)
          if (this.garbage.garbageFlag == null) {
            this.garbage.garbageFlag = ''
          }
          formData.append('garbageFlag', that.garbage.garbageFlag)
          formData.append('garbageName', that.garbage.garbageName)
          formData.append('sortId', that.garbage.sortId)
          request.postFile( '/api/garbage/update', formData).then(res => {
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
    },
    handleChange (file, fileList) {
      console.log(1)
      this.fileList = fileList
      console.log(fileList)
    },
    handleRemove(file) {
      console.log(2)
      this.garbage.file = null
      this.garbage.fileList = []
    },
    handleExceed(file,fileList){
      console.log(file)
      this.fileList = fileList
    },

    handleDownload(file) {
      console.log(file);
    }
  }
}
</script>

<style scoped>

</style>
