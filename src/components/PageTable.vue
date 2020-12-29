<template>

  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      v-loading="loading"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        v-for="item in columns" v-bind:key="item.key"
        :prop="item.dataIndex"
        :label="item.title"
        :width="item.width">
      </el-table-column>
    </el-table>
    <div style="text-align: center;margin-top: 30px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import request from '../utils/request'

export default {
  name: 'PageTable',
  props: {
    columns: {
      type: Array,
      default: () => { return [] }
    },
    fetchData: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      tableData: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      multipleSelection: [],
      loading: false
    }
  },
  created () {
    this.handleFetch()
  },
  methods: {
    handleFetch () {
      let req = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        // sortField: '',
        // sortOrder: '',
        queryParam: JSON.stringify(this.queryParam)
      }
      this.loading = true
      const that = this
      request.postNoJSON({url: '/api/garbage/list4Table', data: req}).then(res => {
        if (res.message === 'success') {
          that.tableData = res.result.data
          that.total = res.result.totalCount
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: '查询失败'})
        }
        that.loading = false
      }).catch(err => {
        that.loading = false
        console.log(err)
      })
    },
    current_change (currentPage) {
      this.currentPage = currentPage
      this.fetchData()
    },
    handleSelectionChange () {
    }
  }
}
</script>

<style scoped>

</style>
