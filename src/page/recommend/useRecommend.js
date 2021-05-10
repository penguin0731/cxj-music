import { ref, onMounted } from 'vue'
import api from '@/api'
import nProgress from 'nprogress'

export default function() {
  let bannerList = ref([]);

  /**
   * 获取轮播图数据
   */
  const getBanner = async() => {
    const res = await api.getBanner();
    bannerList.value = res.banners;
  }

  onMounted(async () => {
    await getBanner();
    nProgress.done();
  })

  return {
    bannerList,
  }
}