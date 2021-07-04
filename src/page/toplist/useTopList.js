import { computed, onMounted, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
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
    let id = toplistMenu.value[curMenuIdx.value]?.id;
    if (!id) return;
    const { playlist: { tracks } } = await api.songlist.getDetail(id);
    toplist.value = tracks;
  }

  // 切换当前榜单
  const changeMenu = index => {
    curMenuIdx.value = index;
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

  // 播放全部
  const playAll = () => {
    if (toplist.value.length == 0) return;
    let list = clone(playList.value);
    let newList = toplist.value.map(item => createSong(item));
    let newListIds = newList.map(item => item.id);
    // 若全部歌曲中有歌曲已存在播放列表，则过滤
    list = list.filter(l => !newListIds.includes(Number(l.id)));
    // 将全部歌曲拼接到播放列表前面
    list = newList.concat(list);
    store.commit('setPlayList', list);
    store.commit('setCurrentIndex', 0);
    store.commit('setIsPlaying', true);
  }

  watchEffect(() => {
    getDetail();
  })

  onMounted(async () => {
    await getTopList();
    nProgress.done();
  });

  return {
    toplistMenu,
    curMenuIdx,
    toplist,
    changeMenu,
    play,
    add,
    playAll
  }
}