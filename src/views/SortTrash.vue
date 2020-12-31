<template>
  <div class="body">
    <div class="center">
      <div class="table" style="width: 800px;">
        <div class="table_row" style="width: 600px;">
          <div class="table_block" v-for="(bin, i) in bins" v-bind:key="i">
            <div class="hand_garbage">
              <div class="hand">
                <img v-if="bin.showHand" src="../img/hand.png" class="img" alt="">
              </div>
              <div class="garbage_type" @mouseenter="onMouseOver(i)" @mouseleave="onMouseOut(i)"
                   @click="choseGarbage(i)">
                <img :src="bin.imgUrl" class="img" style="cursor: pointer;" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="table_row">
          <div class="table_block">
            <div class="garbage_name" id="garbage_name">
              {{ garbage.garbageName }}
            </div>
          </div>
        </div>
        <div class="table_row" style="width: 600px;height: 50px">
          <div class="table_block">
            <div class="garbage_control" @click="control(1)">
              开始
            </div>
          </div>
          <div class="table_block">
            <div class="garbage_control" @click="control(0)">
              停止
            </div>
          </div>
        </div>
        <div class="table_row" style="height: 70px;">
          <div class="answer_state" v-if="gameInfo.answerState === 1">
            <img class="answer_image" src="../img/right.png" alt="答对了">
            <div class="answer_tips">恭喜你，答对了！</div>
          </div>
          <div class="answer_state" v-if="gameInfo.answerState === 2">
            <img class="answer_image" src="../img/wrong.png" alt="答错了">
            <div class="answer_tips">很遗憾，答错了。正确答案是：{{ garbage.garbageType }}</div>
          </div>
        </div>
        <div class="table_row">
          <span>统计数据</span>
          <div style="display: flex;flex-direction: column;margin-left: 8px;">
            <span>答题总数：{{ gameInfo.total }}</span>
            <span>未答题数：{{ gameInfo.noAnswer }}</span>
          </div>
          <div style="display: flex;flex-direction: column;margin-left: 8px;">
            <span>正确题数：{{ gameInfo.right }}</span>
            <span>错误题数：{{ gameInfo.wrong }}</span>
          </div>
        </div>
        <div class="table_row">
          <div class="return_button" @click="clearData()" style="background: red;margin-right: 16px">
            <div class="return_button_text">
              清空数据
            </div>
          </div>
          <div class="return_button" @click="goBack()">
            <div class="return_button_text">
              返回
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../utils/request'

export default {
  name: 'SortTrash',
  data () {
    return {
      active: '2',
      // 循环状态：0停止，1循环中
      controlState: 0,
      gameInfo: {
        // 答题状态：-1未开始，0正在答题，1答对了，2打错了
        answerState: -1,
        total: 0,
        right: 0,
        wrong: 0,
        noAnswer: 0
      },
      garbage: {
        garbageName: ''
      },
      bins: [
        {
          imgUrl: require('../img/garbage1.png'),
          showHand: false,
          garbageType: '厨余垃圾'
        },
        {
          imgUrl: require('../img/garbage2.png'),
          showHand: false,
          garbageType: '可回收垃圾'
        },
        {
          imgUrl: require('../img/garbage3.png'),
          showHand: false,
          garbageType: '其它垃圾'
        },
        {
          imgUrl: require('../img/garbage4.png'),
          showHand: false,
          garbageType: '有害垃圾'
        }
      ],
      sortMap: [3, 1, 4, 2]
      // list: []
    }
  },
  created () {
  },
  methods: {
    goto (val) {
      this.$router.push({name: val})
    },
    // fetchData () {
    //   const _this = this
    //   request.post({url: '/api/garbage/listAll'}).then(res => {
    //     if (res.message !== 'error') {
    //       _this.list = res.result
    //     } else {
    //       this.$message.error(res.result)
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    // 控制函数，点击开始传入参数1，点击停止传入参数0，递归传入参数2
    control (value) {
      if (value > 0) {
        // 循环停止时点击开始，初始化参数，进入延时函数
        if (this.controlState === 0 && value === 1) {
          if (this.gameInfo.answerState === 0) {
            this.gameInfo.noAnswer++
          }
          this.garbage = {
            garbageName: ''
          }
          this.gameInfo.answerState = -1
          for (let i = 0; i < 4; i++) {
            this.bins[i].showHand = false
          }
          this.controlState = 1
          this.delayRandom(500)
        }
        // 循环时，递归中的函数进入下一次递归
        if (this.controlState === 1 && value === 2) {
          this.delayRandom(500)
        }
      } else {
        // 防止多次停止
        if (this.controlState > 0) {
          this.gameInfo.total++
        }
        if (this.gameInfo.answerState === -1) {
          this.gameInfo.answerState = 0
        }
        this.controlState = 0
      }
    },
    // 延时函数，递归调用控制函数，传入参数2
    delayRandom (time) {
      const _this = this
      request.post({url: '/api/garbage/queryOne'}).then(res => {
        this.garbage = res
      })
      // this.garbage = this.list[this.getRandom(0, this.list.length - 1)]
      setTimeout(() => {
        _this.control(2)
      }, time)
    },
    // getRandom (begin, end) {
    //   return Math.round(Math.random() * (end - begin) + begin)
    // },
    onMouseOver (i) {
      if (this.gameInfo.answerState === 0) {
        this.bins[i].showHand = true
      }
    },
    onMouseOut (i) {
      if (this.gameInfo.answerState === 0) {
        this.bins[i].showHand = false
      }
    },
    choseGarbage (i) {
      if (this.controlState === 1) {
        this.$message({
          type: 'error',
          showClose: true,
          message: '请点击停止'})
      } else if (this.garbage.garbageName.length === 0 || this.gameInfo.answerState > 0) {
        this.$message({
          type: 'error',
          showClose: true,
          message: '请点击开始'})
      } else {
        this.garbage.sortId = this.sortMap[i]
        const that = this
        request.postNoJSON({url: '/api/garbage/checkOne', data: this.garbage}).then(res => {
          if (res.message === 'yes') {
            that.gameInfo.right++
            that.gameInfo.answerState = 1
          } else {
            that.gameInfo.wrong++
            that.gameInfo.answerState = 2
            that.garbage.garbageType = res.result.sortName
            that.garbage.garbageInfo = res.result.sortInfo
          }
        })
        // if (this.garbage.garbageType === this.bins[i].garbageType) {
        //   this.gameInfo.right++
        //   this.gameInfo.answerState = 1
        // } else {
        //   this.gameInfo.wrong++
        //   this.gameInfo.answerState = 2
        // }
      }
    },
    clearData () {
      this.gameInfo = {
        answerState: -1,
        total: 0,
        right: 0,
        wrong: 0,
        noAnswer: 0
      }
      for (let i = 0; i < 4; i++) {
        this.bins[i].showHand = false
      }
      this.garbage = {
        garbageName: ''
      }
    },
    goBack () {
      this.$router.back()
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.table {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.table_row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 8px;
}

.table_block {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.hand_garbage {
  width: 100px;
  height: 330px;
  display: flex;
  flex-direction: column;
}

.hand {
  width: 100px;
  height: 150px;
}

.garbage_type {
  width: 100px;
  height: 180px;
}

.img {
  width: 100%;
  height: 100%;
}

.garbage_name {
  height: 24px;
  font-size: 24px;
  text-align: center;
  color: #008000;
}

.garbage_control {
  margin-top: 24px;
  width: 102px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC, serif;
  font-weight: 400;
  color: #121E2B;
  line-height: 20px;
  cursor: pointer;
}

.answer_state {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.answer_image {
  width: 50px;
  height: 40px;
}

.answer_tips {
  margin-top: 8px;
  font-size: 18px;
}

.return_button {
  margin-top: 24px;
  width: 102px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3296FA;
  cursor: pointer;
}

.return_button_text {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC, serif;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 20px;
}
</style>
