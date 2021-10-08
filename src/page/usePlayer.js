import { computed } from 'vue';
import { useStore } from 'vuex';
import { clone } from '@/utils/util';
import { createSong } from '@/utils/song';
export default function usePlayer(props) {
  const store = useStore();
  let playList = computed(() => store.getters.playList);

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
    list.push(createSong(music));
    store.commit('setPlayList', list);
  };

  // 播放全部
  const playAll = list => {
    if (list.length == 0) return;
    let _playList = clone(playList.value);
    let newList = list.map(item => createSong(item));
    let newListIds = newList.map(item => item.id);
    // 若全部歌曲中有歌曲已存在播放列表，则过滤
    _playList = _playList.filter(l => !newListIds.includes(Number(l.id)));
    // 将全部歌曲拼接到播放列表前面
    _playList = newList.concat(_playList);
    store.commit('setPlayList', _playList);
    store.commit('setCurrentIndex', 0);
    store.commit('setIsPlaying', true);
  };

  return {
    play,
    add,
    playAll
  };
}
