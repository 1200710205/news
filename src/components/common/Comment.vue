<template>
 <div>
    <div class="info">
      提交评论
      <span>返回</span>
    </div>
    <div class="write">
      <textarea v-model="mycomment">
      </textarea>
      <mt-button type="primary" size="large" @click="submitComment">发表评论</mt-button>
    </div>
    <div class="comment-wrap">
      <div class="title">评论列表</div>
      <ul>
        <li v-for="(item, index) in commentArr" :key="index">
          {{item.user_name}},{{item.content}},<span v-if="item.add_time">{{item.add_time | sliceDate}}</span>
        </li>
      </ul>
      <mt-button type="default" size="large" @click.native="moreload(index)">加载更多</mt-button>
    </div>
 </div>
</template>

<script>
import {commonMethod} from '@/assets/js/mixin'
export default{
  name: 'my-comment',
  props: ['id'],
  data: function () {
    return {
      commentArr: [],
      index: 1,
      mycomment: ''
    }
  },
  mixins: [commonMethod],
  created: function () {
    this.moreload()
  },
  methods: {
    moreload: function (page) {
      this.$axios.get(`getcomments/${this.id}?pageindex=${this.index}`).then(res => {
        if (res.data.message.length === 0) {
          this.$toast('没有更多数据')
        } else {
          if (page) {
            this.commentArr = this.commentArr.concat(res.data.message)
          } else {
            this.commentArr = res.data.message
          }
          this.index++
        }
      }).catch(err => {
        console.log(err)
      })
    },
    submitComment: function () {
      if (this.mycomment.trim() === '') {
        return this.$toast('发表评论数据不能为空')
      }
      this.$axios.post('postcomment/' + this.id, 'content=' + this.mycomment)
        .then(res => {
          // 清空列表
          this.mycomment = ''
          this.index = 1
          this.moreload()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>
.info{line-height:45px;padding:0 15px;}
.info span{float:right;}
.write{padding:0 15px;}
.write textarea{display:block;padding:5px;border:1px solid #ddd;width:100%;height:100px;margin-bottom:10px;}
.comment-wrap{padding:15px;}
.comment-wrap li{line-height:40px;}
</style>
