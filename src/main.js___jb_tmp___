// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import MintUI from 'mint-ui'
import Vuex from 'vuex'
import 'mint-ui/lib/style.css'
import './assets/css/public.css'
import './assets/iconfont/iconfont.css'
import Myul from '@/components/common/Myul'
import Myli from '@/components/common/Myli'
import Navbar from '@/components/common/Navbar'
import Mylunbo from '@/components/common/Mylunbo'
import Comment from '@/components/common/Comment'
import Vuepreview from 'vue-preview'
// 配置公共请求url
Axios.defaults.baseURL = 'http://www.sinya.online/api'
Vue.prototype.$axios = Axios
// 配置拦截器，显示loading图标
Axios.interceptors.request.use(config => {
  MintUI.Indicator.open({
    text: '加载中'
  })
  return config
})
// 配置拦截器，关闭loading图标
Axios.interceptors.response.use(response => {
  MintUI.Indicator.close()
  return response
})
// 配置mint-ui
Vue.use(MintUI)
// 配置全局组件
Vue.component(Myul.name, Myul)
Vue.component(Myli.name, Myli)
Vue.component(Navbar.name, Navbar)
Vue.component(Comment.name, Comment)
Vue.component(Mylunbo.name, Mylunbo)
// 配置图片预览插件
Vue.use(Vuepreview)
Vue.config.productionTip = false
// 使用vuex
Vue.use(Vuex)
let store = new Vuex.Store({
  // 配置store中的数据
  state: {
    num: 0
  },
  // 取数据
  getters: {
    getNum: function (state) {
      return state.num
    }
  },
  // 操作数据，里面只能是同步的
  mutations: {
    changeNum: function (state, count) {
      state.num += count
    }
  },
  // 行为，可以有异步操作，但最终还要通知mutations操作数据,可以这么说如果你要改数据通过后台请求的，就用actions
  actions: {
    addNumbyServer: function (store, count) {
      setTimeout(function () {
        store.commit('changeNum', count)
      }, 1000)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
