<template>
  <el-dialog
    title="图片查看"
    :visible.sync="visible"
    width="50%"
    center>
    <span v-if="url.length === 0">暂无图片</span>
    <el-image
      v-else
      :src="url"
      fit="fill"></el-image>
  </el-dialog>
</template>

<script>

export default {
  name: 'DownloadFile',
  data () {
    return {
      url: '',
      visible: false
    }
  },
  methods: {
    show (record) {
      if (record.imageUrl && record.imageUrl.length > 0) {
        this.url = record.imageUrl
      } else {
        this.url = ''
      }
      this.visible = true
    }
  }
}
</script>

<style scoped>

</style>
