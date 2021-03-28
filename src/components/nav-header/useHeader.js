import { ref, computed, reactive } from 'vue';
import { mapState } from 'vuex'
import { useRouter, useRoute } from 'vue-router';

export default function useNavHeader() {
  const router = useRouter();
  const navList = ref([
    {
      label: '推荐',
      url: '/music/recommend',
    },
    {
      label: '排行榜',
      url: '/music/topList',
    },
    {
      label: '歌单',
      url: '/music/songList',
    },
    {
      label: '主播电台',
      url: '/music/djRadio',
    },
    {
      label: '歌手',
      url: '/music/artist',
    },
    {
      label: '新碟上架',
      url: '/music/album',
    },
  ]);
  let curNav = ref('0');
  let loginVisible = ref(false)

  const onClickNav = (url, index) => {
    curNav.value = index;
    router.push(url);
  }

  const login = () => {
    loginVisible.value = true;
  }

  const closeModal = () => {
    loginVisible.value = false;
  }

  return {
    navList,
    curNav,
    loginVisible,
    onClickNav,
    login,
    closeModal
  }
}