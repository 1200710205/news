<template>
  <div class="shopcart">
    <ul>
      <li v-for="(item, index) in goodsArr" :key="index">
        <input type="checkbox" v-model="item.checked" name="status">
        <div class="goods-word">
          <img :src="item.thumb_path" alt=""/>
          <div class="word">
            <p class="name">{{item.title}}</p>
            <p class="price">￥{{item.sell_price}}</p>
            <div class="number">
              购买数量：
              <div class="inner">
                <button :disabled="item.num<=1" @click="reduce(item)" ref="reduceobj">-</button>
                <input type="number" v-model="item.num"/>
                <button @click="add(item)" ref="addobj">+</button>
              </div>
            </div>
            <div class="del" @click="delTap(item, index)">删除</div>
          </div>
        </div>
      </li>
    </ul>
    <div class="total">
      总数量：<span class="big">{{total.num}}</span>
      <span class="fr">
        总价： <span class="big red">￥{{total.sum}}</span>&nbsp;
        去结算>
      </span>
    </div>
  </div>
</template>

<script>
import goodsList from '@/goodsTool'
export default {
  data () {
    return {
      goodsArr: []
    }
  },
  methods: {
    add: function (item) {
      item.num++
      let obj = goodsList.getGoods()
      obj[item.id] = item.num
      goodsList.saveGoods(obj)
      this.$emit('changeNum')
    },
    reduce: function (item) {
      item.num--
      let obj = goodsList.getGoods()
      obj[item.id] = item.num
      goodsList.saveGoods(obj)
      this.$emit('changeNum')
    },
    delTap: function (item, index) {
      this.goodsArr.splice(index, 1)
      let obj = goodsList.getGoods()
      delete obj[item.id]
      goodsList.saveGoods(obj)
      this.$emit('changeNum')
    }
  },
  computed: {
    total: function () {
      let sum = 0
      let num = 0
      this.goodsArr.forEach(item => {
        if (item.checked) {
          sum += item.num * item.sell_price
          num += item.num
        }
      })
      return {
        sum,
        num
      }
    }
  },
  created: function () {
    var ids = Object.keys(goodsList.getGoods()).join(',')
    var goods = goodsList.getGoods()
    this.$axios.get(`/goods/getshopcarlist/${ids}`).then(res => {
      this.goodsArr = res.data.message
      // 添加被选中的属性和数量
      this.goodsArr.forEach(item => {
        if (goods[item.id]) {
          this.$set(item, 'num', goods[item.id])
        }
      })
      console.log(this.goodsArr)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style scoped>
  .shopcart li{display:-webkit-box;display:box;background:#fff;border-bottom:1px solid #ddd;padding:15px;}
  .shopcart li .word{-webkit-box-flex:1;box-flex:1;}
  .shopcart li input[type='checkbox']{width:15px;height:15px;margin-right:10px;vertical-align:middle;}
  .shopcart li img{width:80px;margin-right:10px;}
  .shopcart li .goods-word{display:box;display: -webkit-box;-webkit-box-flex:1;box-flex:1;}
  .shopcart li .word{box-flex:1;-webkit-box-flex:1;position:relative;}
  .shopcart li .name{font-size:14px;margin-bottom:10px;}
  .shopcart li .price{color:red;}
  .number .inner{border-top:1px solid #ddd;border-bottom:1px solid #ddd;display:inline-block;vertical-align:middle;}
  .number button{width:30px;height:30px;background:#fff;border:0;border-left:1px solid #ddd;border-right:1px solid #ddd;font-size:18px;color:#666;vertical-align:top;outline:none;}
  .number button[disabled]{background:#f3f3f3;color:#999;}
  .number input{width:40px;height:30px;border:0;vertical-align:top;outline: none;text-align:center;}
  .total{padding:15px;border-top:1px solid #ddd;font-size:14px;background:#fff;position:fixed;left:0;right:0;bottom:55px;}
  .total .big{font-size:16px;}
  .total .red{color:red}
  .total .fr{float:right}
  .del{position:absolute;right:0;bottom:0;color:#999;}
</style>
