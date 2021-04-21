import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { clone } from '@/utils/util.js';

export default function({emit}) {
  const store = useStore();
  let playList = computed(() => store.getters.playList);
  let currentIndex = computed(() => store.getters.currentIndex);
  let isPlaying = computed(() => store.getters.isPlaying);

  const hideList = () => {
    emit('hide');
  }

  const stopTrigger = () => {}

  const play = index => {
    store.commit('setCurrentIndex', index);
    store.commit('setIsPlaying', true);
  }

  const pause = index => {
    if(!isPlaying.value) return;
    store.commit('setIsPlaying', false);
  }

  const remove = index => {
    let list = clone(playList.value);
    list.splice(index, 1);
    store.commit('setPlayList', list);
  }

  const clearList = () => {
    store.commit('setPlayList', []);
    store.commit('setCurrentIndex', -1);
    pause();
  }

  onMounted(() => {
    document.addEventListener('click', e => {
      hideList();
    })
  });

  onUnmounted(() => {
    document.removeEventListener('click');
  })

  return {
    playList,
    currentIndex,
    isPlaying,
    hideList,
    stopTrigger,
    play,
    pause,
    remove,
    clearList,
  }
}