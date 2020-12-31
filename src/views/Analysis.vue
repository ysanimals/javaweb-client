<template>
  <div class="body">
    <div class="center">
          <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Analysis',
  components: {},
  data () {
    return {
      activeName: '',
      menus: [],
      nameMap: {
        1: 'garbageAnalysis',
        2: 'userAnalysis',
        3: 'examLog'
      }
    }
  },
  created () {
  },
  filters: {
  },
  methods: {
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
