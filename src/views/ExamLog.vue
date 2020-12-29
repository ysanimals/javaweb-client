<template>
  <div class="body">
    <div class="center">
      <el-form status-icon ref="form" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户姓名">
              <el-input
                type="text"
                v-model="queryParam.userName"
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
          <el-col :span="8">
            <el-form-item label="问卷编号">
              <el-input
                type="text"
                v-model="queryParam.examSn"
                @keyup.enter.native="fetchData"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item>
                <el-button type="primary" @click="fetchData">查询</el-button>
                <el-button @click="queryParam={}">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
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
            prop="examSn"
            label="问卷编号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="garbageName"
            label="垃圾名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="answerId"
            label="用户答案"
            width="120">
            <template slot-scope="scope">
              <el-tag
                :type="styleMap[scope.row.answerId].style"
                disable-transitions>{{ styleMap[scope.row.answerId].name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="sortId"
            label="正确答案"
            width="120">
            <template slot-scope="scope">
              <el-tag
                :type="styleMap[scope.row.sortId].style"
                disable-transitions>{{ styleMap[scope.row.sortId].name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="res"
            label="是否正确"
            width="120">
            <template slot-scope="scope">
              <el-tag
                :type="pdMap[scope.row.res].style"
                disable-transitions>{{ pdMap[scope.row.res].name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="gmtCreate"
            label="创建时间"
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
    </div>
  </div>
</template>

<script>
  import request from '../utils/request'

  export default {
    name: 'ExamLog',
    components: {},
    data () {
      return {
        styleMap: [
          {
            style: ''
          },
          {
            style: 'primary',
            name: '可回收垃圾'
          },
          {
            style: 'danger',
            name: '有害垃圾'
          },
          {
            style: 'success',
            name: '厨余垃圾'
          },
          {
            style: 'info',
            name: '其他垃圾'
          }
        ],
        pdMap: [
          {
            style: 'success',
            name: '正确'
          },
          {
            style: 'danger',
            name: '错误'
          }
        ],
        options: [
          {
            value: 1,
            label: '可回收垃圾'
          },
          {
            value: 2,
            label: '有害垃圾'
          },
          {
            value: 3,
            label: '厨余垃圾'
          },
          {
            value: 4,
            label: '其他垃圾'
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
        request.postNoJSON({url: '/api/exam/list', data: req}).then(res => {
          if (res.message === 'success') {
            that.tableData = res.result.data
            that.total = res.result.totalCount
            for (let i = 0; i < that.tableData.length; i++) {
              if (that.tableData[i].answerId === that.tableData[i].sortId) {
                that.tableData[i].res = 0
              } else {
                that.tableData[i].res = 1
              }
            }
          } else {
            this.$message.error('查询失败')
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
