<template>
  <div class="newslist">
      <my-bar title="新闻列表"></my-bar>
      <ul>
        <li v-for="(item, index) in newsArr" :key="index">
          <router-link :to="{name:'news.detail',query: {id: item.id}}">
            <img v-lazy="item.img_url" alt=""/>
            <div class="word">
              <p class="title">65656565</p>
              <p class="tip">
                点击数:{{item.click}}
                &nbsp;&nbsp;&nbsp;
                发表时间:{{item.add_time | sliceDate}}
              </p>
            </div>
          </router-link>
        </li>
      </ul>
  </div>
</template>
<script>
import {commonMethod} from '@/assets/js/mixin'
export default {
  data () {
    return {
      newsArr: []
    }
  },
  mixins: [commonMethod],
  created () {
    this.$axios.get('getnewslist').then(res => {
      this.newsArr = res.data.message
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style scoped>
  .newslist{background:#fff;padding-bottom:55px;}
  .newslist li a{display:box;display:-webkit-box;padding:10px 15px;border-bottom:1px solid #ddd;}
  .newslist img{width:80px;height:80px;margin-right:10px;}
  .newslist .word{box-flex:1;-webkit-box-flex:1;font-size:14px;}
  .newslist .tip{margin-top:10px;}
  image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
  }
</style>
