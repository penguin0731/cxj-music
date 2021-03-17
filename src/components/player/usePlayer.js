import { ref, onMounted, computed, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { format } from '@/utils/util.js';

export default function() {
  let cxjPlayer = ref(null); // radio元素
  
  let store = useStore();
  let mode = computed(() => store.getters.mode);
  let voice = computed(() => store.getters.voice);
  let isPlaying = computed(() => store.getters.isPlaying); 
  let curMusic = computed(() => store.getters.curMusic);
  let duration = computed(() => format(191208)); // 当前歌曲时间
  let currentTimeRef = ref(0);
  // let currentTime = computed(() => format(currentTimeRef.value));
  let currentTime = ref('00:00');
  let percent = ref(0);
  watchEffect(() => {
    currentTime.value = format(currentTimeRef.value);
    percent.value = Math.floor(currentTimeRef.value / 191208 * 100);
    console.log(currentTime.value, percent.value)
  })

  
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
    cxjPlayer.value.src = 'http://m7.music.126.net/20210316225500/322570ab2ec5e5091f2a09a5478fc5fb/ymusic/c7bc/455e/612c/0d891c5408be6d0af16c7fa64945de75.mp3'
    cxjPlayer.value.onprogress = () => {
      
    }
    cxjPlayer.value.ontimeupdate = () => {
      currentTimeRef.value = cxjPlayer.value.currentTime * 1000
    }
  })


  return {
    cxjPlayer,
    isPlaying,
    mode,
    voice,
    curMusic,
    duration,
    currentTime,
    percent,
    play,
    changePlayStyle,
    changeVoice,
  }
}