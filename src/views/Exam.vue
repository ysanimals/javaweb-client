<template>
  <div class="body">
    <div class="center">
      <el-form status-icon ref="form" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="15">
            <el-form-item label="题目数量">
              <el-input
                type="number"
                v-model="num"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          v-loading="loading"
          element-loading-text="试卷加载中"
          v-loading.fullscreen.lock=true
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            prop="key"
            label="序号"
            width="55">
          </el-table-column>
          <el-table-column
            prop="garbageName"
            label="垃圾名称"
            width="160">
          </el-table-column>
          <!--          <el-table-column-->
          <!--            prop="garbageFlag"-->
          <!--            label="垃圾种类"-->
          <!--            width="120">-->
          <!--          </el-table-column>-->
          <el-table-column
            prop="imageUrl"

            label="查看图片"
            width="120">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-picture-outline"
                @click="checkImage(scope.$index, scope.row)">image
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="answerId"
            label="我的答案"
            width="180">
            <template slot-scope="scope">
              <el-radio-group
                :disabled="uploaded"
                @change="onChange(scope)"
                v-model="scope.row.answerId"
              >
                <el-radio
                  v-model="radio"
                  v-for="item in options"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                  {{item.Text}}
                </el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column
            prop="sortId"
            label="正确答案"
            width="120">
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.sortId"
                :type="styleMap[scope.row.sortId].style"
                disable-transitions>{{ styleMap[scope.row.sortId].name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="answerState"
            label=""
            width="85">
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.answerState !== null"
                :type="styleMap2[scope.row.answerState].style"
                disable-transitions>{{ styleMap2[scope.row.answerState].name }}</el-tag>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <el-form status-icon ref="form" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" @click="handleSubmit">提交</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button
                :disabled="loading"
                @click="resetData"
                icon = "el-icon-refresh">重置题目</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="答对题数">
              <el-input
                style="width: 80px;"
                type="text"
                v-model="dataInfo.right"
                disabled>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="答错题数">
              <el-input
                style="width: 80px;"
                type="text"
                v-model="dataInfo.wrong"
                disabled>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="未答题数">
              <el-input
                style="width: 80px;"
                type="text"
                v-model="dataInfo.noAnswer"
                disabled>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <download-file ref="downloadFile"></download-file>
    </div>
  </div>

</template>

<script>
  import request from '../utils/request'
  import DownloadFile from './module/DownloadFile'

  export default {
    name: 'Exam',
    components: {DownloadFile},
    data () {
      return {
        radio:0,
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
        styleMap2: [
          {
            style: 'info',
            name: '未答题'
          },
          {
            style: 'success',
            name: '答对了'
          },
          {
            style: 'danger',
            name: '答错了'
          }
        ],
        options: [
          {
            value:  1,
            Text: '可回收垃圾'
          },
          {
            value: 2,
            Text: '有害垃圾'
          },
          {
            value: 3,
            Text: '厨余垃圾'
          },
          {
            value: 4,
            Text: '其他垃圾'
          }
        ],
        examSn: '',
        queryParam: {},
        tableData: [],
        dataInfo: {
        },
        uploaded: false,
        num: 10,
        loading: false
      }
    },
    created () {
      this.fetchData()
    },
    filters: {
    },
    methods: {
      resetData () {
        if (!this.uploaded) {
          for (let data of this.tableData) {
            if (data.answerId) {
              const that = this
              this.$confirm('你有未提交的答案，确定要重置吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                that.fetchData()
              }).catch(() => {
              })
              return
            }
          }
        }
        this.fetchData()
      },
      fetchData () {
        if (this.num > 100) {
          this.$message({
            type: 'error',
            showClose: true,
            message: '题目数量过大'})
          return
        }
        let numStr = this.num.toString()
        if (numStr === null || numStr.length === 0) {
          this.$message({
            type: 'error',
            showClose: true,
            message: '题目数量有误'})
          return
        }
        this.loading = true
        const that = this
        request.postNoJSON({url: '/api/exam/getList', data: numStr}).then(res => {
          if (res.message === 'error') {
            that.$message({
              type: 'error',
              showClose: true,
              message: res.result || '获取失败'
            })
          } else {
            that.clearData()
            that.uploaded = false
            that.tableData = res.result
            that.examSn = that.tableData[0].examSn
          }
          that.loading = false
        }).catch(err => {
          that.loading = false
          console.log(err)
        })
      },
      onChange (scope) {
        // console.log(scope.row)
      },
      clearData () {
        this.dataInfo = {
          total: null,
          right: null,
          wrong: null,
          noAnswer: null
        }
      },
      handleOK () {
        this.$nextTick().then(() => {
          this.fetchData()
        })
      },
      handleSubmit () {
        if (this.uploaded) {
          this.$message({
            type: 'error',
            showClose: true,
            message: '题目已提交'
          })
          return
        }
        const that = this
        this.$confirm('确定要提交你的答案吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this.tableData)

          request.postNoJSON({url: '/api/exam/addList', data: this.tableData}).then(res => {
            if (res.message === 'error') {
              that.$message({
                type: 'error',
                showClose: true,
                message: res.result || '获取失败'
              })
            } else {
              const r = res.result
              that.tableData = r.data
              that.dataInfo = {
                total: r.total,
                right: r.right,
                wrong: r.wrong,
                noAnswer: r.total - r.right - r.wrong
              }
              that.uploaded = true
            }
            that.loading = false
          }).catch(err => {
            that.loading = false
            console.log(err)
          })
        }).catch(() => {
        })
      },
      checkImage (index, row) {
        this.$refs.downloadFile.show(row)
      }
    }
  }
</script>

<style scoped>

  .body {
    width: 100%;
    height: 100%;
    background-image: url("../img/photo.jpg");
  }

  .center {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .demo-ruleForm{
    font-weight: bold;
  }
</style>
