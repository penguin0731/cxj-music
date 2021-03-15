import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default function() {
  let store = useStore();
  let mode = computed(() => store.getters.mode);
  let voice = computed(() => store.getters.voice);
  let isPlaying = computed(() => store.getters.isPlaying); 
  let cxjPlayer = ref(null);
  
  const play = () => {
    store.commit('setIsPlaying', !isPlaying.value);
    if(isPlaying.value) {
      cxjPlayer.value.play();
    }else {
      cxjPlayer.value.pause();
    }
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
      if(altKey) {
        switch(code) {
          case 'ArrowUp': // 增加音量
            break;
          case 'ArrowDown': // 减少音量
            break;
          case 'ArrowLeft': // 上一首
            break;
          case 'ArrowRight': // 下一首
            break;
        }
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
    cxjPlayer.value.src = 'http://m8.music.126.net/20210315215042/2d1d86e2c2d46fa88a5ed298a6b0bd12/ymusic/c7bc/455e/612c/0d891c5408be6d0af16c7fa64945de75.mp3'
  })


  return {
    isPlaying,
    mode,
    voice,
    cxjPlayer,
    play,
    changePlayStyle,
    changeVoice,
  }
}