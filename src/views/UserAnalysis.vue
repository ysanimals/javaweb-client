<template>
  <div class="body">
    <div class="center">
      <el-form status-icon ref="form" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户名">
              <el-input
                type="text"
                v-model="queryParam.userName"
                @keyup.enter.native="fetchData"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话">
              <el-input
                type="text"
                v-model="queryParam.phone"
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
            prop="key"
            label="序号"
            width="55">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户名"
            width="85">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话"
            width="120">
          </el-table-column>
          <el-table-column
            prop="total"
            label="答题总数"
            width="120">
          </el-table-column>
          <el-table-column
            prop="right"
            label="答对题数"
            width="120">
          </el-table-column>
          <el-table-column
            prop="wrong"
            label="答错题数"
            width="120">
          </el-table-column>
          <el-table-column
            prop="noAnswer"
            label="未答题数"
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
      <edit-user ref="editUser" :options="options" @ok="handleOK"></edit-user>
    </div>
  </div>
</template>

<script>
import request from '../utils/request'
import EditUser from './module/EditUser'
import PageTable from '../components/PageTable'

export default {
  name: 'UserManage',
  components: {
    EditUser,
    PageTable
  },
  data () {
    return {
      styleMap: [
        {
          value: 'total',
          label: '答题次数'
        },
        {
          value: 'u.right',
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
      request.postNoJSON({url: '/api/user/statistics', data: req}).then(res => {
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
    handleEdit (index, row) {
      // console.log(index, row)
      this.$refs.editUser.show(row)
    },
    addUser () {
      this.$refs.addUser.show()
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
