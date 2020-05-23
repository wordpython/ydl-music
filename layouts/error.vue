<template>
  <div class="container">
    <h1>发生了一些错误喔，刷新页面试试吧亲</h1>
    <nuxt-link to="/">首 页</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  layout: 'sign' // 你可以为错误页面指定自定义的布局
}
</script>
