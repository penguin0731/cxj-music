import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { onBeforeRouteUpdate } from 'vue-router';
import { createSong } from '@/utils/song';
import { clone } from '@/utils/util';
import api from '@/api';
import nProgress from 'nprogress';

export default function () {
  const store = useStore();
  let toplistMenu = ref([]);
  let curMenuIdx = ref('0');
  let toplist = ref([]);
  let playList = computed(() => store.getters.playList);

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

  // 播放指定歌曲并添加到播放队列
  const play = (music) => {
    let list = clone(playList.value);
    let newIdx = -1;
    let isInList = list.some((item, index) => {
      item.id == music.id ? newIdx = index : '';
      return item.id == music.id;
    });
    if (isInList) {
      store.commit('setCurrentIndex', newIdx);
    } else {
      add(music);
      store.commit('setCurrentIndex', list.length);
    }
    store.commit('setIsPlaying', true);
  }

  // 添加到播放队列
  const add = async (music) => {
    let list = clone(playList.value);
    list.push(createSong(music));
    store.commit('setPlayList', list);
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
    toplist,
    play,
    add
  }
}