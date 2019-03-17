<template>
  <div>
    <my-bar title="图文详情"></my-bar>
    <div class="info">
      <h2>{{imginfo.title}}</h2>
      <p class="tip" v-if="imginfo.add_time">
        发起时间：{{imginfo.add_time | sliceDate}}&nbsp;&nbsp;
        {{imginfo.click}}次浏览&nbsp;&nbsp;
        分类：民生经济
      </p>
      <div class="thumimg-list">
        <vue-preview :slides="thumimages"></vue-preview>
        <!--<ul>-->
          <!--<li v-for="(item, index) in thumimages" :key="index">-->
            <!--<img :src="item.src"  alt="">-->
          <!--</li>-->
        <!--</ul>-->
      </div>
      <p class="con" v-html="imginfo.content"></p>
    </div>
    <my-comment :id="$route.query.id"/>
  </div>
</template>
<script>
import {commonMethod} from '@/assets/js/mixin'
export default {
  mixins: [commonMethod],
  data: function () {
    return {
      imginfo: {},
      thumimages: []
    }
  },
  created: function () {
    var id = this.$route.query.id
    // 获取图文信息
    this.$axios.get('getimageInfo/' + id).then(res => {
      this.imginfo = res.data.message[0]
    }).catch(err => {
      console.log(err)
    })
    // 获取缩略图
    this.$axios.get('getthumimages/' + id).then(res => {
      this.thumimages = res.data.message
      this.thumimages.forEach(item => {
        item.msrc = item.src
        item.w = 600
        item.h = 400
      })
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style scoped>
  .info{padding:15px;}
  .info h2{font-size:18px;text-align:center;margin-bottom:15px;color:#26a2ff;}
  .info .tip{color:#666;margin-bottom:10px;}
  .info .con{line-height:20px;}
  .thumimg-list{margin-bottom:10px;clear:both;overflow:hidden;}
</style>
