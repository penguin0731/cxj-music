import { ref, onMounted } from 'vue'
import api from '@/api'

export default function() {
  let bannerList = ref([]);

  /**
   * 获取轮播图数据
   */
  const getBanner = async() => {
    const res = await api.getBanner();
    bannerList.value = res.banners;
  }

  onMounted(() => {
    getBanner();
  })

  return {
    bannerList,
  }
}