import { ref, computed, watchEffect, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import api from '@/api';
import { setUid } from '@/utils/storage';

export default function useNavHeader() {
  const router = useRouter();
  const route = useRoute();
  const store = useStore();
  const navList = computed(() => {
    // 从路由配置中获取导航栏信息
    let _navList = router.options.routes.filter(
      item => item.path === '/music'
    )[0];
    return _navList.children.map(item => ({
      url: `${_navList.path}/${item.path}`,
      label: item.meta.name
    }));
  });
  let curNav = ref(0);
  let loginVisible = ref(false);
  let Uid = computed(() => store.getters.Uid);
  let userInfo = ref({});

  const onClickNav = (url, index) => {
    console.log(url, router);
    curNav.value = index;
    router.push(url);
  };

  const showLoginModal = () => {
    loginVisible.value = true;
  };

  const closeLoginModal = () => {
    loginVisible.value = false;
  };

  const getUserDetail = Uid => {
    if (!Uid) return;
    api.user.getDetail(Uid).then(res => {
      userInfo.value = res.profile;
    });
  };

  const toMy = () => {
    curNav.value = -1;
    router.push({ path: '/my', query: { id: Uid.value } });
  };

  const logout = () => {
    api.login.logout().then(() => {
      store.commit('setUid', setUid(null));
      userInfo.value = {};
      localStorage.removeItem('cxjMusic_cookie');
    });
  };

  const watchPath = () => {
    let len = navList.value.length;
    let path = route.path;
    if (path.includes('/music')) {
      for (let i = 0; i < len; i++) {
        if (path === navList.value[i].url) {
          curNav.value = i;
          break;
        }
      }
    } else {
      curNav.value = -1;
    }
  };

  watchEffect(() => {
    watchPath();
  });

  watchEffect(() => {
    if (Uid.value) {
      console.log('watchEffect');
      getUserDetail(Uid.value);
    }
  });

  return {
    navList,
    curNav,
    loginVisible,
    Uid,
    userInfo,
    onClickNav,
    showLoginModal,
    closeLoginModal,
    toMy,
    logout
  };
}
