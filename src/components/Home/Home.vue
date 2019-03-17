<template>
  <div>
    <!--轮播-->
    <my-lunbo url="getlunbo"/>
    <div class="grid">
      <myul>
        <myli v-for="(item, index) in gridArr" :key="index">
          <router-link :to="item.router">
            <i class="iconfont" :class='item.name'></i>
            <p>{{item.con}}</p>
          </router-link>
        </myli>
      </myul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      gridArr: [
        {name: 'icon-weizhi', con: '新闻资讯', router: {name: 'news.list'}},
        {name: 'icon-fenxiang', con: '图文分享', router: {name: 'imgshare', query: {id: 0}}},
        {name: 'icon-shangpinliebiao', con: '商品展示', router: {name: 'goods.list'}},
        {name: 'icon-liuyan', con: '留言反馈', router: {name: 'news.list'}},
        {name: 'icon-sousuo1', con: '搜索资讯', router: {name: 'news.list'}},
        {name: 'icon-lianxi', con: '联系我们', router: {name: 'news.list'}}
      ]
    }
  }
}
</script>
<style scoped>
  .grid  a{display:block;}
  .grid i{margin:0 auto;display:block;width:40px;height:40px;line-height:40px;text-align:center;font-size:26px;border-radius:50%;color:#fff;}
  .icon-weizhi{background:#10c39b;}
  .icon-fenxiang{background:#ee5438;}
  .icon-lianxi{background:#e4862c;}
  .icon-shangpinliebiao{background:#2c83f4;}
  .icon-liuyan{background:#19c0ff;}
  .icon-sousuo1{background:#fe4500;}
  .grid p{line-height:24px;}
</style>
