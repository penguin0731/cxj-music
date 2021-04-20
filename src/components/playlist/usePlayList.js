import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

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
  }

  const pause = () => {
    store.commit('setIsPlaying', !isPlaying.value);
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
  }
}