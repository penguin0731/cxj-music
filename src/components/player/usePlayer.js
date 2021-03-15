import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default function() {
  let store = useStore();
  let mode = computed(() => store.getters.mode);
  let voice = computed(() => store.getters.voice);
  let isPlaying = computed(() => store.getters.isPlaying);
  
  const play = () => {
    store.commit('setIsPlaying', !isPlaying.value);
  }
  const changePlayStyle = () => {
    store.commit('setMode', mode.value + 1);
  }
  const changeVoice = () => {
    store.commit('setVoice', !voice.value);
  }

  /**
   * 播放器键盘事件
   */
  const keyupEvent = () => {
    document.addEventListener('keyup', e => {
      let altKey = e.altKey;
      let code = e.code;
      if(altKey && code == 'ArrowLeft') { // 上一首

      }else if(altKey && code == 'ArrowRight') { // 下一首

      }else {
        switch(code) {
          case 'Space': // 播放/暂停
            play();
            break;
          case 'KeyO': // 播放模式切换
            changePlayStyle();
            break;
          case 'KeyM': // 开启/关闭声音
            changeVoice();
            break;
          default:
            break;
        }
      }
    })
  }

  onMounted(() => {
    keyupEvent();
  })


  return {
    isPlaying,
    mode,
    voice,
    play,
    changePlayStyle,
    changeVoice,
  }
}