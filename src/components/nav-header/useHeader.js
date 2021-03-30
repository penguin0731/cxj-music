import { ref, computed, reactive, onMounted, watchEffect, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import api from '@/api';

export default function useNavHeader() {
  const router = useRouter();
  const store = useStore();
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
  let loginVisible = ref(false);
  let Uid = computed(() => store.getters.Uid);
  let userInfo = ref({});


  const onClickNav = (url, index) => {
    curNav.value = index;
    router.push(url);
  }

  const showLoginModal = () => {
    loginVisible.value = true;
  }

  const closeLoginModal = () => {
    loginVisible.value = false;
  }

  const getUserDetail = (Uid) => {
    if(!Uid) return;
    api.user.getDetail(Uid).then(res => {
      userInfo.value = res.profile;
      console.log(userInfo.value)
    })
  }

  watchEffect(() => {
    getUserDetail(Uid.value);
  })

  return {
    navList,
    curNav,
    loginVisible,
    Uid,
    userInfo,
    onClickNav,
    showLoginModal,
    closeLoginModal
  }
}