<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'Analysis',
  data () {
    return {
    }
  },
  methods: {
    goto (val) {
      this.$router.push({name: val})
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

</style>
