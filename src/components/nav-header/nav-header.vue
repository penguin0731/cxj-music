<template>
  <div class="header">
    <div class="header_box">
      <div class="logo_header">cxj-music在线音乐播放器</div>
      <div class="nav_header">
        <ul>
          <li
            v-for="(item, index) in navList"
            :key="index"
            :class="{ actived: curNav == index }"
            @click="onClickNav(item.url, index)"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>
      <cxj-search style="margin: 0px 25px" />
      <div class="user_header">
        <div v-if="userInfo.userId" class="user_box">
          <img class="avatar" :src="userInfo.avatarUrl" @click="toMy" />
          <div class="username_wrapper">
            <span class="username" @click="toMy">{{ userInfo.nickname }}</span>
            <span class="logout ml10" @click="logout">退出</span>
            <!-- <svg t="1614692045908" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4022" width="16" height="16"><path d="M879.104 317.44a41.8816 41.8816 0 0 0-58.88-0.512l-307.712 304.64L203.776 317.44c-16.384-15.872-42.496-15.872-58.368 0-15.872 15.872-16.384 41.472-0.512 57.344l0.512 0.512 335.36 331.776c8.192 8.192 19.456 12.288 31.232 11.776 11.776 0.512 23.04-3.584 31.232-11.776l335.36-332.288c15.872-15.36 15.872-41.472 0.512-57.344z" fill="#ffffff" p-id="4023"></path></svg> -->
          </div>
        </div>
        <span v-else class="login" @click="showLoginModal">登录</span>
        <login-modal v-if="loginVisible" @close="closeLoginModal" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CxjSearch from '@/baseComponents/cxj-search/cxj-search.vue';
import LoginModal from '@/components/login-modal/login-modal.vue';
import { useRoute, useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';
import { computed, ref, watch, watchEffect } from 'vue';

const router = useRouter();
const route = useRoute();
const useUser = useUserStore();

const curNav = ref(0);
const loginVisible = ref(false);
const Uid = computed(() => useUser.Uid);
const userInfo = ref({});

watch(
  () => route.path,
  newPath => {
    let len = navList.value.length;
    if (newPath.includes('/music')) {
      for (let i = 0; i < len; i++) {
        if (newPath === navList.value[i].url) {
          curNav.value = i;
          break;
        }
      }
    } else {
      curNav.value = -1;
    }
  }
);

watchEffect(() => {
  if (Uid.value) {
    console.log('watchEffect');
    getUserDetail(Uid.value);
  }
});

const navList = computed(() => {
  // 从路由配置中获取导航栏信息
  const musicRoute = router.options.routes.find(item => item.path === '/music');
  return musicRoute.children.map(item => ({
    url: `${musicRoute.path}/${item.path}`,
    label: item.meta.name
  }));
});

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
    useUser.Uid = setUid(null);
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

// export default {
//   components: {
//     CxjSearch,
//     LoginModal
//   },
//   setup() {
//     return {
//       ...useHeader()
//     };
//   }
// };
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 70px;
  line-height: 70px;
  display: flex;
  box-sizing: border-box;
  background: var(--themeColor2);
  white-space: nowrap;
}
.header_box {
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 1250px;
  background: var(--themeColor2);
}
.logo_header {
  font-size: 20px;
  font-weight: bold;
  padding-left: 20px;
  color: #fff;
}
.nav_header > ul {
  display: flex;
  padding: 0;
  margin: 0;
  font-size: 18px;
  li {
    position: relative;
    padding: 0 20px;
    cursor: pointer;
    color: hsla(0, 0%, 100%, 0.6);
  }
  li.actived,
  li:hover {
    color: #fff;
  }
  li::after {
    content: '';
    position: absolute;
    top: -2px;
    left: 100%;
    width: 0;
    height: 100%;
    border-bottom: 2px solid #fff;
    transition: 0.2s all linear;
  }
  li:hover::after {
    left: 0;
    width: 100%;
    transition-delay: 0.1s;
  }
  li:hover ~ li::after {
    left: 0;
  }
}
.user_header {
  color: #fff;
  padding: 0 20px;
  .login {
    cursor: pointer;
  }
  .user_box {
    display: flex;
    align-items: center;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      padding: 5px;
      cursor: pointer;
    }
    .username_wrapper {
      .username {
        padding: 10px 3px 10px 5px;
        cursor: pointer;
      }
      .logout {
        color: hsla(0, 0%, 100%, 0.6);
        cursor: pointer;
        &:hover {
          color: #fff;
        }
      }
    }
  }
}
</style>
