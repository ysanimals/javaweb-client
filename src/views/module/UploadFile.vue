<template>
  <el-dialog
    title="图片上传"
    :visible.sync="visible"
    width="50%">
    <el-upload
      class="upload-demo"
      :http-request="handleUpload"
      :before-upload="beforeUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :limit="1"
      :on-exceed="handleExceed"
      list-type="picture"
      action="">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传不超过10mb的jpg/png文件，最多上传一张</div>
    </el-upload>
  </el-dialog>
</template>

<script>
import request from '../../utils/request'

export default {
  name: 'UploadFile',
  data () {
    return {
      fileList: [],
      garbage: {},
      visible: false,
      headers: {
        'Content-Type': 'application/json;',
        'Access-Token': localStorage.getItem('access-token')
      }
    }
  },
  methods: {
    handleRemove (file, fileList) {
      let data = {
        garbageId: this.garbage.garbageId,
        imageUrl: file.url
      }
      const that = this
      request.postNoJSON({url: '/api/garbage/removeFile', data}).then(res => {
        if (res.message === 'error') {
          that.$message({
            type: 'error',
            showClose: true,
            message: res.result || '删除失败'
          })
        } else {
          that.$message({
            type: 'success',
            showClose: true,
            message: '删除成功'
          })
        }
      })
    },
    handlePreview (file) {
    },
    show (record) {
      this.garbage = record
      this.fileList = []
      if (record.imageUrl && record.imageUrl.length > 0) {
        this.fileList.push({
          url: record.imageUrl,
          name: record.originalName
        })
      }
      console.log(this.fileList)
      this.visible = true
    },
    beforeUpload (file) {
      let isLt2M = file.size / 1024 / 1024 < 10
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        })
        return false
      }
    },
    handleUpload (obj) {
      let formData = new FormData()
      formData.append('file', obj.file)
      formData.append('garbageId', this.garbage.garbageId)
      const that = this
      request.postFile('/api/garbage/uploadFile', formData).then(res => {
        if (res.message === 'error') {
          that.$message({
            type: 'error',
            showClose: true,
            message: res.result || '上传失败'
          })
          that.fileList.splice(0, 1)
        } else {
          that.$message({
            type: 'success',
            showClose: true,
            message: '上传成功'
          })
          that.fileList = [{
            url: res.result,
            name: obj.file.fileName
          }]
        }
      }).catch(err => {
        that.fileList.splice(0, 1)
        console.log(err)
      })
    },
    handleExceed (files, fileList) {
      this.$message({
        type: 'error',
        showClose: true,
        message: '仅支持上传一张垃圾图片'
      })
    }
  }
}
</script>

<style scoped>

</style>
