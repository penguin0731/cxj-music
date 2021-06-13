import { ref, onMounted, reactive, toRefs } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import api from '@/api';
import nProgress from 'nprogress';

export default function () {
  const route = useRoute();
  let detail = reactive({
    name: '',
    cover: '',
    musicSize: '',
    mvSize: '',
    albumSize: '',
    desc: ''
  });

  // 获取歌手详情，包含部分热门歌曲
  const getArtists = async id => {
    const { artist, hotSongs } = await api.artist.getArtists(id);
    detail.name = artist.name;
    detail.cover = artist.img1v1Url;
    detail.musicSize = artist.musicSize;
    detail.mvSize = artist.mvSize;
    detail.albumSize = artist.albumSize;
    detail.desc = artist.briefDesc;
  };

  onMounted(async () => {
    let id = route.query.id;
    await getArtists(id);
    nProgress.done();
  });

  // 路由参数中的id变化时，重新调用接口
  onBeforeRouteUpdate(async (to, from) => {
    let toId = to.query.id;
    let fromId = from.query.id;
    if (toId !== fromId) {
      await getArtists(toId);
      nProgress.done();
    }
  });

  return {
    ...toRefs(detail)
  };
}
