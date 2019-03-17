<template>
  <div class="goodsinfo">
    <my-bar title="商品详情"></my-bar>
    <!--轮播-->
    <my-lunbo :url="url"/>
    <div class="info">
      <h2>{{info.title}}</h2>
      <div class="price">
        <del>市场价：￥{{info.market_price}}</del>
        销售价：<span>￥{{info.sell_price}}</span>
      </div>
      <div class="number">
        购买数量：
        <div class="inner">
          <button disabled @click="reduce" ref="reduceobj">-</button>
          <input type="number" v-model="num"/>
          <button @click="add" ref="addobj">+</button>
        </div>
      </div>
      <div class="button-wrap">
        <mt-button size="normal" type="primary">立即购买</mt-button>
        <mt-button size="normal" type="danger" @click="addCart">加入购物车</mt-button>
      </div>
      <div class="param-wrap">
        <p>商品参数</p>
        <p>商品货号：{{info.goods_no}}</p>
        <p>商品库存：{{info.stock_quantity}}</p>
        <p>上架时间：{{info.add_time}}</p>
      </div>
    </div>
    <div class="btn-wrap">
      <mt-button type="default" size="large" @click="gotoIntro">图文介绍</mt-button>
      <mt-button type="default" size="large" @click="gotoCommon">商品评论</mt-button>
    </div>
  </div>
</template>
<script>
import goodsList from '@/goodsTool'
export default {
  data: function () {
    return {
      url: '',
      info: {},
      num: 1
    }
  },
  created: function () {
    this.url = 'getthumimages/' + this.$route.params.id
    // 获取商品详情信息
    this.$axios.get(`goods/getinfo/${this.$route.params.id}`).then(res => {
      this.info = res.data.message[0]
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    reduce: function () {
      this.num--
      if (this.num === 1) {
        this.$refs.reduceobj.disabled = true
        return
      }
      this.$refs.reduceobj.disabled = false
      this.$refs.addobj.disabled = false
    },
    add: function () {
      this.num++
      if (this.num === this.info.stock_quantity) {
        this.$refs.addobj.disabled = true
        return
      }
      this.$refs.addobj.disabled = false
      this.$refs.reduceobj.disabled = false
    },
    addCart: function () {
      goodsList.setGoods({
        id: this.$route.params.id,
        num: this.num
      })
      this.$emit('cartNum', this.num)
    },
    gotoIntro: function () {
      this.$router.push({
        name: 'goods.imgintro',
        query: {id: this.$route.params.id}
      })
    },
    gotoCommon: function () {
      this.$router.push({
        name: 'goods.common',
        query: {id: this.$route.params.id}
      })
    }
  }
}
</script>
<style scoped>
  .info{padding:0 15px;background:#fff;}
  .info h2{font-size:16px;border-bottom:1px solid #ddd;padding:15px 0;}
  .price{padding:15px 0;}
  .price del{text-decoration: line-through;color:#999;margin-right:5px;}
  .price span{color:red;font-size:15px;}
  .number{padding-bottom:15px;}
  .number .inner{border-top:1px solid #ddd;border-bottom:1px solid #ddd;display:inline-block;vertical-align:middle;}
  .number button{width:30px;height:30px;background:#fff;border:0;border-left:1px solid #ddd;border-right:1px solid #ddd;font-size:18px;color:#666;vertical-align:top;outline:none;}
  .number button[disabled]{background:#f3f3f3;color:#999;}
  .number input{width:40px;height:30px;border:0;vertical-align:top;outline: none;text-align:center;}
  .button-wrap{padding-bottom:15px;border-bottom:1px solid #ddd;position:relative;}
  .param-wrap{padding:15px 0;}
  .param-wrap p{padding:5px 0;}
  .btn-wrap{padding:15px;}
  .btn-wrap button{margin-bottom:10px;}
</style>
