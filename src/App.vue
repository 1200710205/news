<template>
  <div>
    <mt-header title="信息管理系统" ref="title"></mt-header>
    <div>
      存储的num的值：{{numshow}}
      <button @click="changeCommon">改变公共数据</button>
    </div>
    <router-view class="pb55" v-on:cartNum="showNum" v-on:changeNum="changeNum" :obj="$refs"/>
    <mt-tabbar v-model="selected" fixed ref="bottom">
      <mt-tab-item id="home">
        <i slot="icon" class="iconfont icon-shouye" @click="changeHash"></i>
        首页
      </mt-tab-item>
      <mt-tab-item id="member">
        <i slot="icon" class="iconfont icon-wode" @click="changeHash"></i>
        会员
      </mt-tab-item>
      <mt-tab-item id="shopcart">
        <i slot="icon" class="iconfont icon-shangpin_gouwuche" @click="changeHash"></i>
        购物车
        <mt-badge type="error">{{cartNum}}</mt-badge>
      </mt-tab-item>
      <mt-tab-item id="search">
        <i slot="icon" class="iconfont icon-sousuo" @click="changeHash"></i>
        查找
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import goodsList from '@/goodsTool'
export default {
  created: function () {
    this.cartNum = goodsList.totalNum()
  },
  data () {
    return {
      selected: 'home',
      cartNum: 0
    }
  },
  methods: {
    changeHash: function () {
      this.$nextTick(function () {
        this.$router.push({name: this.selected})
      })
    },
    showNum: function (num) {
      this.cartNum += num
    },
    changeNum: function () {
      this.cartNum = goodsList.totalNum()
    },
    changeCommon: function () {
      // 改变公共数据state的值也可以通过this.$store.state.num，但是最好别这么做
      // 通过this.$store.commit触发mutations中changeNum改变数据，如果是同步的没有后台请求可以直接这么触发
      // this.$store.commit('changeNum', 5)
      // 最好的方式是这样做,调用actions中的addNumbyServer，然后触发mutation
      this.$store.dispatch('addNumbyServer', 5)
    }
  },
  computed: {
    // 监听公共数据，如果变化改变
    numshow () {
      return this.$store.getters.getNum
    }
  }
}
</script>

<style>
  .mint-tabbar{background:#fff;border-top:1px solid #ddd;}
  .mint-tabbar i{font-size:22px;}
  .pb55{padding-bottom:55px;}
  .mint-tab-item{position:relative;}
  .mint-badge{position:absolute;right:10%;top:0;}
</style>
