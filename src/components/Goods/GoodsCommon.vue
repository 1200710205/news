<template>
  <div class="common-wrap">
    <my-bar :tit="商品评论" ></my-bar>
    <my-comment :id="$route.query.id"/>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>
