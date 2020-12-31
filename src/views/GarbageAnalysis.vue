<template>
  <div class="body">
    <div class="center">
      <el-form status-icon ref="form" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="垃圾种类">
              <el-input
                type="text"
                v-model="queryParam.garbageFlag"
                @keyup.enter.native="fetchData"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="垃圾名称">
              <el-input
                type="text"
                v-model="queryParam.garbageName"
                @keyup.enter.native="fetchData"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="按字段排序">
              <el-select v-model="sortField" placeholder="请选择">
                <el-option
                  v-for="item in styleMap"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="排序方式">
              <el-select v-model="sortOrder" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" @click="fetchData">查询</el-button>
              <el-button @click="clearAll">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            prop="garbageId"
            label="序号"
            width="55">
          </el-table-column>
          <el-table-column
            prop="garbageName"
            label="垃圾名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="total"
            label="答题次数"
            width="120">
          </el-table-column>
          <el-table-column
            prop="right"
            label="正确次数"
            width="120">
          </el-table-column>
          <el-table-column
            prop="wrong"
            label="错误次数"
            width="120">
          </el-table-column>
          <el-table-column
            prop="noAnswer"
            label="未答次数"
            width="120">
          </el-table-column>
          <el-table-column
            prop="accuracyShow"
            label="正确率"
            width="120">
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
      <add-garbage ref="addGarbage" :options="options" @ok="handleOK"></add-garbage>
      <edit-garbage ref="editGarbage" :options="options" @ok="handleOK"></edit-garbage>
      <upload-file ref="uploadFile"></upload-file>
    </div>
  </div>
</template>

<script>
import request from '../utils/request'
import AddGarbage from './module/AddGarbage'
import EditGarbage from './module/EditGarbage'
import UploadFile from './module/UploadFile'

export default {
  name: 'GarbageManage',
  components: {EditGarbage, AddGarbage, UploadFile},
  data () {
    return {
      styleMap: [
        {
          value: 'total',
          label: '答题次数'
        },
        {
          value: 'g.right',
          label: '正确次数'
        },
        {
          value: 'wrong',
          label: '错误次数'
        },
        {
          value: 'accuracy',
          label: '正确率'
        }
      ],
      options: [
        {
          value: 'asc',
          label: '升序'
        },
        {
          value: 'desc',
          label: '降序'
        }
      ],
      queryParam: {},
      tableData: [],
      multipleSelection: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      loading: false,
      sortField: null,
      sortOrder: null
    }
  },
  created () {
    this.fetchData()
  },
  filters: {
  },
  methods: {
    fetchData () {
      let req = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        sortField: this.sortField,
        sortOrder: this.sortOrder == null ? 'desc' : this.sortOrder,
        queryParam: JSON.stringify(this.queryParam)
      }
      this.loading = true
      const that = this
      request.postNoJSON({url: '/api/garbage/statistics', data: req}).then(res => {
        if (res.message === 'success') {
          that.tableData = res.result.data
          for (let i = 0; i < that.tableData.length; i++) {
            that.tableData[i].accuracyShow = that.tableData[i].accuracy * 100 + '%'
          }
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
    goto (val) {
      this.$router.push({name: val})
    },
    goBack () {
      this.$router.back()
    },
    clearAll () {
      this.queryParam = {}
      this.sortField = null
      this.sortOrder = null
    },
    current_change (currentPage) {
      this.currentPage = currentPage
      this.fetchData()
    },
    handleSelectionChange () {
    },
    handleUpdate (index, row) {
      this.$refs.uploadFile.show(row)
    },
    handleEdit (index, row) {
      // console.log(index, row)
      this.$refs.editGarbage.show(row)
    },
    handleDelete (index, row) {
      // console.log(index, row)
      const that = this
      request.postNoJSON({url: '/api/garbage/remove', data: row.garbageId.toString()}).then(res => {
        if (res.result === 'error') {
          this.$message({
            type: 'error',
            showClose: true,
            message: res.result || '删除失败'})
        } else {
          this.$message({
            type: 'success',
            showClose: true,
            message: '删除成功'})
          if (that.total % 10 === 0 && that.pageNo > 1) {
            that.pageNo--
          }
          that.handleOK()
          that.visible = false
        }
      }).catch(err => {
        this.$message({
          type: 'error',
          showClose: true,
          message: '删除失败'})
        console.log(err)
      })
    },
    addGarbage () {
      this.$refs.addGarbage.show()
    },
    handleOK () {
      this.$nextTick().then(() => {
        this.fetchData()
      })
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
