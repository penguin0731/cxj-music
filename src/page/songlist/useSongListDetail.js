import { onMounted, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import api from '@/api';
import nProgress from 'nprogress';

export default function useSongListDetail(props) {
  const store = useStore();
  const route = useRoute();
  const data = reactive({
    playlist: [],
    songlist: [],
    commentPage: 1,
    commentPageSize: 20,
    comment: {}
  });

  // 获取歌单详情
  const getDetail = async id => {
    const res = await api.songlist.getDetail(id);
    data.playlist = res.playlist;
    const ids = data.playlist.trackIds.map(item => item.id).join();
    await getSongList(ids);
    await getComment();
  };

  // 获取歌单中的歌曲
  const getSongList = async ids => {
    const res = await api.song.getDetail(ids);
    data.songlist = res.songs;
  };

  const getComment = async () => {
    let params = {
      id: data.playlist.id,
      pageSize: data.commentPageSize,
      page: data.commentPage
    };
    const res = await api.songlist.getComment(params);
    console.log(res);
    data.comment = res;
  };

  const changeCommentPage = async newPage => {
    data.commentPage = newPage;
    await getComment();
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
    ...toRefs(data),
    changeCommentPage
  };
}
