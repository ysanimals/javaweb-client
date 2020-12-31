<template>
  <div class="body">
    <div class="center">
      <el-form status-icon ref="form" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="垃圾类别">
              <el-select v-model="queryParam.sortId" placeholder="请选择">
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
            <el-form-item>
              <el-button type="primary" @click="fetchData">查询</el-button>
              <el-button @click="queryParam={}">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item>
            <el-col :span="8">
              <el-button type="primary" @click="addGarbage">新增</el-button>
            </el-col>
          </el-form-item>
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
            prop="sortId"
            label="垃圾类别"
            width="120">
            <template slot-scope="scope">
              <el-tag
                :type="styleMap[scope.row.sortId].style"
                disable-transitions>{{ styleMap[scope.row.sortId].name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="garbageFlag"
            label="垃圾种类"
            width="120">
          </el-table-column>
          <el-table-column
            prop="gmtCreate"
            label="创建时间"
            width="120">
          </el-table-column>
          <el-table-column label="操作"
            width="240">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleUpdate(scope.$index, scope.row)">上传图片
              </el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">修改
              </el-button>
              <el-popconfirm
                title="确定删除吗？"
                @confirm="handleDelete(scope.$index, scope.row)"
              >
                <el-button
                  size="mini"
                  type="danger"
                  slot="reference">删除
                </el-button>
              </el-popconfirm>
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
