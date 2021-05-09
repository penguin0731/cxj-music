import { ref, onMounted } from 'vue'
import api from '@/api'

export default function() {
  let bannerList = ref([]);
  let curIndex = ref(0);
  let timer = null;


  /**
   * 获取轮播图数据
   */
  const getBanner = async() => {
    const res = await api.getBanner();
    bannerList.value = res.banners;
  }

  /**
   * 轮播图
   * @param {*} type
   */
  const fade = (type = 'next') => {
    if(type == 'prev') {
      --curIndex.value;
      if(curIndex.value < 0) {
        curIndex.value = bannerList.value.length - 1;
      }
    }else {
      ++curIndex.value;
      if(curIndex.value > bannerList.value.length - 1) {
        curIndex.value = 0;
      }
    }
  }

  /**
   * 轮播前一张图
   */
  const prevClick = () => {
    clearInterval(timer);
    fade('prev');
    autoPlay();
  }

  /**
   * 轮播后一张图
   */
  const nextClick = () => {
    clearInterval(timer);
    fade('next');
    autoPlay();
  }

  /**
   * 自动轮播
   */
  const autoPlay = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      fade('next');
    }, 4000);
  }

  const goTo = (dotIndex) => {
    clearInterval(timer);
    curIndex.value = dotIndex;
    autoPlay();
  }

  // mounted
  onMounted(() => {
    getBanner();
    autoPlay();
  })

  return {
    bannerList,
    curIndex,
    prevClick,
    nextClick,
    goTo
  }
}