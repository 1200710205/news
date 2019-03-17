import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/components/Home/Home')
const Member = () => import('@/components/Member/Member')
const Search = () => import('@/components/Search/Search')
const Shopcart = () => import('@/components/Shopcart/Shopcart')
const Newslist = () => import('@/components/News/Newslist')
const Newsdetail = () => import('@/components/News/Newsdetail')
const Imgshare = () => import('@/components/Imgshare/Imgshare')
const ImgDetail = () => import('@/components/Imgshare/ImgDetail')
const Goodslist = () => import('@/components/Goods/Goodslist')
const GoodsInfo = () => import('@/components/Goods/GoodsInfo')
const GoodsCommon = () => import('@/components/Goods/GoodsCommon')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // 也可以 redirect: {name: 'home'}
      redirect: '/home'
    },
    // 首页
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    // 会员
    {
      path: '/member',
      name: 'member',
      component: Member
    },
    // 查找
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    // 购物车
    {
      path: '/shopcart',
      name: 'shopcart',
      component: Shopcart
    },
    // 新闻列表
    {
      path: '/news/list',
      name: 'news.list',
      component: Newslist
    },
    // 新闻详情
    {
      path: '/news/detail',
      name: 'news.detail',
      component: Newsdetail
    },
    // 图文分享
    {
      path: '/imgshare',
      name: 'imgshare',
      component: Imgshare
    },
    // 图文详情
    {
      path: '/imgdetail',
      name: 'imgshare.detail',
      component: ImgDetail
    },
    // 商品列表
    {
      path: '/goodslist',
      name: 'goods.list',
      component: Goodslist
    },
    // 商品详情
    {
      path: '/goodslist/goodsInfo/:id',
      name: 'goods.info',
      component: GoodsInfo
    },
    // 商品-图文介绍
    {
      path: '/imgintro',
      name: 'goods.imgintro',
      component: Newsdetail
    },
    // 商品-评论goods.common
    {
      path: '/goods/common',
      name: 'goods.common',
      component: GoodsCommon
    }
  ]
})
