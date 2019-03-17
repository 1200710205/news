<template>
  <mt-swipe :auto="4000">
    <mt-swipe-item v-for='(v,index) in imgArr' :key='index'>
      <img :src='v.img || v.src'/>
    </mt-swipe-item>
  </mt-swipe>
</template>
<script>
export default {
  name: 'my-lunbo',
  props: ['url'],
  data: function () {
    return {
      imgArr: []
    }
  },
  created: function () {
    this.$axios.get(this.url).then(res => {
      this.imgArr = res.data.message
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>
<style scoped>
  .mint-swipe{height:200px;}
  img{width:100%;}
</style>
