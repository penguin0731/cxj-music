import { computed } from 'vue';
import { clone } from '@/utils/util';
import { createSong } from '@/utils/song';
import useMusicStore from '@/store/modules/music';
export default function usePlayer() {
  const useMusic = useMusicStore();
  const playList = computed(() => useMusic.playList);

  // 播放指定歌曲并添加到播放队列
  const play = music => {
    let list = clone(playList.value);
    let newIdx = -1;
    let isInList = list.some((item, index) => {
      item.id == music.id && (newIdx = index);
      return item.id == music.id;
    });
    if (isInList) {
      useMusic.currentIndex = newIdx;
    } else {
      add(music);
      useMusic.currentIndex = list.length;
    }
    useMusic.isPlaying = true;
  };

  // 添加到播放队列
  const add = async music => {
    let list = clone(playList.value);
    list.push(createSong(music));
    useMusic.playList = list;
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

    useMusic.playList = _playList;
    useMusic.currentIndex = 0;
    useMusic.isPlaying = true;
  };

  return {
    play,
    add,
    playAll
  };
}
