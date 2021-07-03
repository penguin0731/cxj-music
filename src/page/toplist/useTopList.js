import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import api from '@/api';
import nProgress from 'nprogress';

export default function () {
  let toplistMenu = ref([]);
  let curMenuIdx = ref('0');
  let toplist = ref([]);

  // 获取所有榜单
  const getTopList = async () => {
    const { list } = await api.toplist.getTopList();
    toplistMenu.value = list.splice(0, 4); // 只截取前四个榜单
  }

  // 获取当前榜单的歌曲列表
  const getDetail = async () => {
    let id = toplistMenu.value[curMenuIdx.value].id;
    const { playlist: { tracks } } = await api.songlist.getDetail(id);
    toplist.value = tracks;
  }

  onMounted(async () => {
    await getTopList();
    await getDetail();
    nProgress.done();
  });

  onBeforeRouteUpdate(async () => {
    await getTopList();
    await getDetail();
    nProgress.done();
  })

  return {
    toplistMenu,
    curMenuIdx,
    toplist
  }
}