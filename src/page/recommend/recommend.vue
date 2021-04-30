<template>
  <div>
    <cxj-banner />
    <div class="recommend-body"></div>
  </div>
</template>

<script>
import CxjBanner from '@/baseComponents/cxj-banner/cxj-banner.vue';

export default {
  components: {
    CxjBanner
  }
}
</script>

<style lang="less" scoped>
.recommend-body {
  width: var(--contentWidth);
  min-height: 700px;
  margin: 0 auto;
  background-color: #fff;
}
</style>