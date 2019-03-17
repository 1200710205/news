<template>
  <div class="newsdetail">
      <my-bar :title="tit"></my-bar>
      <div class="con">
        <h2>{{detailobj.title}}</h2>
        <p class="tip">
          {{detailobj.click}}次点击&nbsp;&nbsp;
          分类：民生经济&nbsp;&nbsp;
          <span v-if="detailobj.add_time">
            添加时间:{{detailobj.add_time | sliceDate}}
          </span>
        </p>
        <p v-html = "detailobj.content" class="detail-con"></p>
      </div>
  </div>
</template>
<script>
import {commonMethod} from '@/assets/js/mixin'
export default {
  data () {
    return {
      detailobj: {},
      tit: ''
    }
  },
  mixins: [commonMethod],
  created () {
    var id = this.$route.query.id
    this.$axios.get('getnew/' + id).then(res => {
      this.detailobj = res.data.message[0]
    }).catch(err => {
      console.log(err)
    })
  },
  // 不能用this，因为进来时候组件还没实例化，只能通过next里面的vm得到实例
  beforeRouteEnter: function (to, from, next) {
    let title = ''
    if (to.name === 'goods.imgintro') {
      title = '图文介绍'
    } else {
      title = '新闻详情'
    }
    next(vm => {
      vm.tit = title
    })
  }
}
</script>
<style scoped>
.newsdetail {padding-bottom:55px;}
.newsdetail .con{padding:15px;font-size:14px;}
.newsdetail h2{font-size:16px;margin-bottom:10px;color:blue;text-align:center;margin-bottom:10px;}
.newsdetail .tip{margin-bottom:10px;}
</style>
