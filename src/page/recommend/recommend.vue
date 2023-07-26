<template>
  <div>
    <cxj-banner :bannerList="bannerList" />
    <div class="recommend_body"></div>
  </div>
</template>

<script>
import CxjBanner from '@/baseComponents/cxj-banner/cxj-banner.vue';
import useRecommend from './useRecommend';

export default {
  components: {
    CxjBanner
  },
  setup() {
    return {
      ...useRecommend()
    };
  }
};
</script>

<style lang="scss" scoped>
.recommend_body {
  width: var(--contentWidth);
  min-height: 700px;
  margin: 0 auto;
  background-color: #fff;
}
</style>
