import { ref, computed, reactive, onMounted, watchEffect } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import api from '@/api';
import nProgress from 'nprogress';

export default function () {
  const route = useRoute();
  let userInfo = ref({});
  let show404 = ref(false);

  const getUserDetail = async id => {
    if (!id) return;
    const res = await api.user.getDetail(id);
    console.log(!res.code || res.code != 200);
    if (!res.code || res.code != 200) {
      show404.value = true;
      return;
    }
    show404.value = false;
    userInfo.value = res.profile;
    console.log(userInfo.value);
  };

  onMounted(async () => {
    let id = route.query.id;
    await getUserDetail(id);
    nProgress.done();
  });

  onBeforeRouteUpdate(async (to, from) => {
    let toId = to.query.id;
    console.log('onBeforeRouteUpdate', toId);
    await getUserDetail(toId);
    nProgress.done();
  });

  return {
    userInfo,
    show404
  };
}
