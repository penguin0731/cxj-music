import { onMounted, toRefs, reactive, watchEffect } from 'vue';
import api from '@/api';
import nProgress from 'nprogress';

export default function () {
  const data = reactive({
    curMenuIdx: 0, // 当前榜单索引
    toplistMenu: [], // 榜单列表
    toplist: [] // 当前榜单歌曲
  });

  // 获取所有榜单
  const getTopList = async () => {
    const { list } = await api.toplist.getTopList();
    data.toplistMenu = list.splice(0, 4); // 只截取前四个榜单
  };

  // 获取当前榜单的歌曲列表
  const getDetail = async () => {
    let id = data.toplistMenu[data.curMenuIdx]?.id;
    if (!id) return;
    const {
      playlist: { tracks }
    } = await api.songlist.getDetail(id);
    data.toplist = tracks;
  };

  // 切换当前榜单
  const changeMenu = index => {
    data.curMenuIdx = index;
  };

  watchEffect(() => {
    getDetail();
  });

  onMounted(async () => {
    await getTopList();
    nProgress.done();
  });

  return {
    ...toRefs(data),
    changeMenu
  };
}
