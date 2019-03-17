<template>
  <div class="bar">
    <i class="iconfont icon-top_back" @click="goback"></i>
    <h1>{{title}}</h1>
  </div>
</template>
<script>
export default {
  name: 'my-bar',
  props: ['title'],
  methods: {
    goback: function () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
  .bar{height:45px;line-height:45px;text-align:center;position:relative;border-bottom:1px solid #ddd;}
  .bar h1{font-size:16px;}
  .bar i{position:absolute;left:15px;line-height:45px;}
</style>
