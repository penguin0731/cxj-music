import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import api from '@/api';
import nProgress from 'nprogress';

export default function () {

  const getTopList = async () => {
    const res = api.toplist.getTopList();
    console.log(res);
  }

  onMounted(async () => {
    await getTopList();
    nProgress.done();
  });

  onBeforeRouteUpdate(() => {
    await getTopList();
    nProgress.done();
  })

  return {

  }
}