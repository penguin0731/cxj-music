import { computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { clone } from '@/utils/util.js';

export default function ({ emit }) {
  const store = useStore();
  let playList = computed(() => store.getters.playList);
  let currentIndex = computed(() => store.getters.currentIndex);
  let isPlaying = computed(() => store.getters.isPlaying);

  // 隐藏播放列表
  const hideList = () => {
    emit('hide');
  };

  // 播放
  const play = index => {
    store.commit('setCurrentIndex', index);
    store.commit('setIsPlaying', true);
  };

  // 暂停
  const pause = () => {
    if (!isPlaying.value) return;
    store.commit('setIsPlaying', false);
  };

  // 移除播放列表中指定歌曲
  const remove = index => {
    let list = clone(playList.value);
    list.splice(index, 1);
    store.commit('setPlayList', list);
  };

  // 清空播放列表
  const clearList = () => {
    store.commit('setPlayList', []);
    store.commit('setCurrentIndex', -1);
    pause();
  };

  onMounted(() => {
    document.addEventListener('click', hideList); // 全局点击时，关闭播放列表弹窗
  });

  onUnmounted(() => {
    document.removeEventListener('click', hideList);
  });

  return {
    playList,
    currentIndex,
    isPlaying,
    hideList,
    play,
    pause,
    remove,
    clearList
  };
}
