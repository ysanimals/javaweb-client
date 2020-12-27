<template>
  <div>
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="Tab 1">
        <a-radio-group v-model="value" @change="onChange">
          Content of Tab Pane 1
          <a-radio :style="radioStyle" :value="1">
            Option A : 厨余垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="2">
            Option B : 可回收垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="3">
            Option C : 其他垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="4">
            Option C : 有害垃圾
          </a-radio>
        </a-radio-group>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2" force-render>
        <a-radio-group v-model="value" @change="onChange">
          Content of Tab Pane 2
          <a-radio :style="radioStyle" :value="1">
            Option A : 厨余垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="2">
            Option B : 可回收垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="3">
            Option C : 其他垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="4">
            Option C : 有害垃圾
          </a-radio>
        </a-radio-group>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3">
        <a-radio-group v-model="value" @change="onChange">
          Content of Tab Pane 1
          <a-radio :style="radioStyle" :value="1">
            Option A : 厨余垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="2">
            Option B : 可回收垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="3">
            Option C : 其他垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="4">
            Option C : 有害垃圾
          </a-radio>
        </a-radio-group>
      </a-tab-pane>
      <a-tab-pane key="4" tab="Tab 4">
        <a-radio-group v-model="value" @change="onChange">
          Content of Tab Pane 4
          <a-radio :style="radioStyle" :value="1">
            Option A : 厨余垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="2">
            Option B : 可回收垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="3">
            Option C : 其他垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="4">
            Option C : 有害垃圾
          </a-radio>
        </a-radio-group>
      </a-tab-pane>
      <a-tab-pane key="5" tab="Tab 5">
        <a-radio-group v-model="value" @change="onChange">
          Content of Tab Pane 5
          <a-radio :style="radioStyle" :value="1">
            Option A : 厨余垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="2">
            Option B : 可回收垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="3">
            Option C : 其他垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="4">
            Option C : 有害垃圾
          </a-radio>
        </a-radio-group>
      </a-tab-pane>
      <a-tab-pane key="6" tab="Tab 6">
        <a-radio-group v-model="value" @change="onChange">
          Content of Tab Pane 6
          <a-radio :style="radioStyle" :value="1">
            Option A : 厨余垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="2">
            Option B : 可回收垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="3">
            Option C : 其他垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="4">
            Option C : 有害垃圾
          </a-radio>
        </a-radio-group>
      </a-tab-pane>
      <a-tab-pane key="7" tab="Tab 7">
        <a-radio-group v-model="value" @change="onChange">
          Content of Tab Pane 4
          <a-radio :style="radioStyle" :value="1">
            Option A : 厨余垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="2">
            Option B : 可回收垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="3">
            Option C : 其他垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="4">
            Option C : 有害垃圾
          </a-radio>
        </a-radio-group>
      </a-tab-pane>
      <a-tab-pane key="8" tab="Tab 8">
        <a-radio-group v-model="value" @change="onChange">
          Content of Tab Pane 8
          <a-radio :style="radioStyle" :value="1">
            Option A : 厨余垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="2">
            Option B : 可回收垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="3">
            Option C : 其他垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="4">
            Option C : 有害垃圾
          </a-radio>
        </a-radio-group>
      </a-tab-pane>
      <a-tab-pane key="9" tab="Tab 9">
        <a-radio-group v-model="value" @change="onChange">
          Content of Tab Pane 9
          <a-radio :style="radioStyle" :value="1">
            Option A : 厨余垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="2">
            Option B : 可回收垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="3">
            Option C : 其他垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="4">
            Option C : 有害垃圾
          </a-radio>
        </a-radio-group>
      </a-tab-pane>
      <a-tab-pane key="10" tab="Tab 10">
        <a-radio-group v-model="value" @change="onChange">
          Content of Tab Pane 10
          <a-radio :style="radioStyle" :value="1">
            Option A : 厨余垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="2">
            Option B : 可回收垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="3">
            Option C : 其他垃圾
          </a-radio>
          <a-radio :style="radioStyle" :value="4">
            Option C : 有害垃圾
          </a-radio>
        </a-radio-group>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: 1,
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      }
    }
  },
  methods: {
    callback (key) {
      console.log(key)
    },
    onChange (e) {
      console.log('radio checked', e.target.value)
    }
  }
}
</script>
