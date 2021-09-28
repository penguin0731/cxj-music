import { onMounted, reactive, toRefs, computed } from 'vue';
import { useStore } from 'vuex';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import api from '@/api';
import { createSong } from '@/utils/song';
import { clone } from '@/utils/util';
import nProgress from 'nprogress';

// 歌手作品类型枚举
const TYPE_MAP = {
  songs: {
    key: 'songs',
    cn: '单曲'
  },
  album: {
    key: 'album',
    cn: '专辑'
  },
  MV: {
    key: 'MV',
    cn: 'MV'
  }
};

export default function () {
  const store = useStore();
  const route = useRoute();
  let data = reactive({
    artistDetail: {}, // 歌手详情
    artistSongs: [], // 单曲列表
    artistAlbum: [], // 专辑列表
    artistMV: [], // MV列表
    curType: TYPE_MAP.songs.key // 当前展示的列表key
  });
  let playList = computed(() => store.getters.playList);

  // 修改当前展示的列表类型
  const changeCurType = type => {
    data.curType = type;
  };

  // 播放全部
  const playAll = () => {
    if (data.artistSongs.length == 0) return;
    let list = clone(playList.value);
    let newList = data.artistSongs.map(item => createSong(item));
    let newListIds = newList.map(item => item.id);
    // 若全部歌曲中有歌曲已存在播放列表，则过滤
    list = list.filter(l => !newListIds.includes(Number(l.id)));
    // 将全部歌曲拼接到播放列表前面
    list = newList.concat(list);
    store.commit('setPlayList', list);
    store.commit('setCurrentIndex', 0);
    store.commit('setIsPlaying', true);
  };

  // 播放指定歌曲并添加到播放队列
  const play = music => {
    let list = clone(playList.value);
    let newIdx = -1;
    let isInList = list.some((item, index) => {
      item.id == music.id ? (newIdx = index) : '';
      return item.id == music.id;
    });
    if (isInList) {
      store.commit('setCurrentIndex', newIdx);
    } else {
      add(music);
      store.commit('setCurrentIndex', list.length);
    }
    store.commit('setIsPlaying', true);
  };

  // 添加到播放队列
  const add = async music => {
    let list = clone(playList.value);
    list.unshift(createSong(music));
    store.commit('setPlayList', list);
  };

  // 获取歌手详情，包含部分热门歌曲
  const getArtists = async id => {
    const { artist, hotSongs } = await api.artist.getArtists(id);
    data.artistDetail = artist;
    data.artistSongs = hotSongs;
  };

  // 获取歌手专辑
  const getAlbum = async id => {
    const { hotAlbums } = await api.artist.getAlbum(id);
    console.log(hotAlbums);
    data.artistAlbum = hotAlbums;
  };

  // 获取歌手MV
  const getMV = async id => {
    const { mvs } = await api.artist.getMV(id);
    console.log(mvs);
    data.artistMV = mvs;
  };

  onMounted(async () => {
    let id = route.query.id;
    await getArtists(id);
    await getAlbum(id);
    await getMV(id);
    nProgress.done();
  });

  // 路由参数中的id变化时，重新调用接口
  onBeforeRouteUpdate(async (to, from) => {
    let toId = to.query.id;
    let fromId = from.query.id;
    if (toId !== fromId) {
      await getArtists(toId);
      await getAlbum(toId);
      await getMV(toId);
      nProgress.done();
    }
  });

  return {
    ...toRefs(data),
    TYPE_MAP,
    play,
    add,
    playAll,
    changeCurType
  };
}
