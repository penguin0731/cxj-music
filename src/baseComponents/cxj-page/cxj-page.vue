<template>
  <div class="cxjPage">
    <div class="cxjPage_prev">上一页</div>
    <div class="cxjPage_pagelist"></div>
    <div class="cxjPage_next">下一页</div>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number
    }
  },
  setup() {}
};
</script>

<style lang="less" scoped>
</style>