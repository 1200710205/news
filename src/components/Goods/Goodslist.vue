<template>
    <div class="goods-wrap" ref="goodsbox">
      <my-bar title="商品列表"/>
      <mt-loadmore :top-method="loadTop" :autoFill="false" :bottom-all-loaded="allLoaded" :bottom-method="loadBottom"  ref="loadmore">
        <ul>
          <li v-for="item in goods" :key="item.id">
            <router-link :to="{name:'goods.info',params: {id: item.id}}">
              <div class="inner">
                <img :src="item.img_url" alt=""/>
                <div class="word">
                  <div class="name">{{item.title}}}</div>
                  <div class="price">￥{{item.sell_price}}</div>
                  <del class="before-price">￥{{item.market_price}}</del>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </mt-loadmore>
    </div>
</template>

<script>
export default {
  props: ['obj'],
  data () {
    return {
      goods: [],
      index: 1,
      allLoaded: false
    }
  },
  created: function () {
    this.loaddata()
  },
  mounted: function () {
    var h1 = this.obj.title.$el.offsetHeight
    var h2 = this.obj.bottom.$el.offsetHeight
    var h = document.body.clientHeight - h1 - h2
    this.$refs.goodsbox.style.height = h + 'px'
  },
  methods: {
    loaddata () {
      this.$axios.get('getgoods?pageindex=' + this.index)
        .then(res => {
          if (res.data.message.length === 0) {
            // 上拉结束，禁止调用上拉函数
            this.allLoaded = true
            this.$toast('没有更多数据了')
          }
          this.goods = this.goods.concat(res.data.message)
          // 通知元素重新定位
          this.$refs.loadmore.onBottomLoaded()
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadTop () {
      console.log('下拉刷新')
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      this.index++
      this.loaddata()
    }
  }
}
</script>

<style scoped>
.goods-wrap ul{clear: both;overflow: hidden;margin-top:15px;}
.goods-wrap li{padding:0 15px;width:50%;box-sizing: border-box;float:left;margin-bottom:15px;}
.goods-wrap li img{width:147px;vertical-align: middle;}
.inner{background:#fff;padding:15px 15px 0 15px;}
.goods-wrap .word{padding:15px;}
.goods-wrap .name{font-size:14px;margin-bottom:10px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;}
.goods-wrap .price{color:red;font-size:14px;margin-bottom:10px;}
.goods-wrap .before-price{color:#999;font-size:14px;}
</style>
