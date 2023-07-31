<template>
  <div>
    <cxj-banner :bannerList="bannerList" />
    <div class="recommend_body"></div>
  </div>
</template>

<script setup>
import api from '@/api';
import CxjBanner from '@/baseComponents/cxj-banner/cxj-banner.vue';
import nProgress from 'nprogress';
import { ref } from 'vue';

const bannerList = ref([]);

/**
 * 获取轮播图数据
 */
const getBanner = async () => {
  const res = await api.getBanner();
  bannerList.value = res.banners;
};

onMounted(async () => {
  await getBanner();
  nProgress.done();
});
</script>

<style lang="scss" scoped>
.recommend_body {
  width: var(--contentWidth);
  min-height: 700px;
  margin: 0 auto;
  background-color: #fff;
}
</style>
