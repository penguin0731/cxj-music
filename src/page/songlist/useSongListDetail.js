import { onMounted, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import api from '@/api';
import nProgress from 'nprogress';

export default function useSongListDetail(props) {
  const store = useStore();
  const route = useRoute();
  const data = reactive({
    playlist: []
  });

  const getDetail = async id => {
    const res = await api.songlist.getDetail(id);
    data.playlist = res.playlist;
  };

  onMounted(async () => {
    let id = route.query.id;
    await getDetail(id);
    nProgress.done();
  });

  // 路由参数中的id变化时，重新调用接口
  onBeforeRouteUpdate(async (to, from) => {
    let toId = to.query.id;
    let fromId = from.query.id;
    if (toId !== fromId) {
      await getDetail(toId);
      nProgress.done();
    }
  });

  return {
    ...toRefs(data)
  };
}
