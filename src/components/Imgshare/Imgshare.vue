<template>
  <div class="imgshare">
    <my-bar title="图文列表"></my-bar>
    <div class="navlist">
      <ul>
        <li v-for="(item, index) in categorys" :key="index" @click="getimages(item.id)">{{item.title}}</li>
      </ul>
    </div>
    <div class="imglist">
      <ul>
        <li v-for="(item, index) in imgArr" :key="index">
          <router-link :to="{name: 'imgshare.detail', query: {id: item.id}}">
            <img :src="item.img_url" alt=""/>
            <div class="word">
              <p class="title">{{item.title}}</p>
              <p class="desc">{{item.zhaiyao}}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgArr: [],
      categorys: []
    }
  },
  created () {
    var id = this.$route.query.id
    this.getData(id)

    this.$axios.get('getimgcategory').then(res => {
      this.categorys = res.data.message
      this.categorys.unshift({
        id: 0,
        title: '全部'
      })
    }).then(err => {
      console.log(err)
    })
  },
  beforeRouteUpdate: function (to, from, next) {
    this.getData(to.query.id)
    next()
  },
  methods: {
    getimages (id) {
      this.$router.push({
        name: 'imgshare',
        query: {id: id}
      })
    },
    getData: function (id) {
      this.$axios.get('getimages/' + id).then((res) => {
        this.imgArr = res.data.message
        if (this.imgArr.length === 0) {
          this.$toast({
            message: '暂无数据',
            position: 'middle',
            duration: 1000
          })
        }
      }).then((err) => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>
  .navlist{overflow:auto;background:#fff;}
  .navlist ul{height:50px;white-space:nowrap;}
  .navlist li{margin:0 10px;display:inline-block;line-height:50px;}
  .imglist li{position:relative;}
  .imglist img{width:100%;vertical-align:middle;}
  .imglist .word{position:absolute;bottom:0;left:0;width:100%;color:#fff;padding:15px;box-sizing:border-box;}
  .imglist .title{font-size:16px;margin-bottom:10px;}
  .imglist .desc{text-indent:15px;}
</style>
