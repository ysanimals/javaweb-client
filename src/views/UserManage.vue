<template>
  <div class="body">
    <div class="center">
      <el-form status-icon ref="form" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="审核状态">
              <el-select v-model="queryParam.userType" placeholder="请选择">
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
            <el-form-item>
              <el-button
                type="primary"
                @click="fetchData">查询</el-button>
              <el-button @click="queryParam={}">重置</el-button>
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
            prop="userType"
            label="审核状态"
            width="85">
            <template slot-scope="scope">
              <el-tag
                :type="styleMap[scope.row.userType].style"
                disable-transitions>{{ styleMap[scope.row.userType].name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话"
            width="120">
          </el-table-column>
          <el-table-column
            prop="idNumber"
            label="身份证号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="gmtCreate"
            label="创建时间"
            width="120">
          </el-table-column>
          <el-table-column label="操作"
                           width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">审核
              </el-button>
            </template>
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
          style: 'info',
          name: '审核中'
        },
        {
          style: 'primary',
          name: '通过'
        },
        {
          style: 'danger',
          name: '未通过'
        }
      ],
      options: [
        {
          value: 0,
          label: '审核中'
        },
        {
          value: 1,
          label: '通过'
        },
        {
          value: 2,
          label: '不通过'
        }
      ],
      queryParam: {},
      tableData: [],
      multipleSelection: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      loading: false
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
        // sortField: '',
        // sortOrder: '',
        queryParam: JSON.stringify(this.queryParam)
      }
      this.loading = true
      const that = this
      request.postNoJSON({url: '/api/user/list4Table', data: req}).then(res => {
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
    goto (val) {
      this.$router.push({name: val})
    },
    goBack () {
      this.$router.back()
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
