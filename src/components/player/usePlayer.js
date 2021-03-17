import { ref, onMounted, computed, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { format } from '@/utils/util.js';

export default function() {
  let dotWidth = 10;
  let cxjPlayer = ref(null); // radio元素
  let progress = ref(null); // 进度条元素
  let store = useStore();
  let mode = computed(() => store.getters.mode);
  let voice = computed(() => store.getters.voice);
  let isPlaying = computed(() => store.getters.isPlaying); 
  let curMusic = computed(() => store.getters.curMusic);
  let duration = ref(191208); // 当前歌曲时间
  let currentTime = ref(0); // 当前播放时间
  let percent = ref(0); // 播放进度
  let loadProgress = ref(0); // 缓存进度
  watchEffect(() => {
    percent.value = currentTime.value / duration.value * 100;
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

  /**
   * 进度条点击事件
   * @param {*} e 事件源对象
   */
  const barClick = e => {
    console.log(cxjPlayer.value)
    let x = e.x; // 鼠标点击的坐标x
    let left = progress.value.getBoundingClientRect().left; // 进度条左侧到窗口左侧的距离
    let width = progress.value.clientWidth; // 进度条的宽度
    let per = (x - left) / width * 100;
    per = per < 0 ? 0 : per;
    percent.value = per;
    currentTime.value = duration.value * per / 100;
    cxjPlayer.value.currentTime = duration.value * per / 100 / 1000;
  }

  onMounted(() => {
    keyupEvent();
    cxjPlayer.value.src = 'http://m8.music.126.net/20210317224817/7fdbea015f4964dd4b526729595a0a57/ymusic/c7bc/455e/612c/0d891c5408be6d0af16c7fa64945de75.mp3'
    // 缓冲事件
    cxjPlayer.value.onprogress = () => {
      if(cxjPlayer.value.buffered.length > 0) {
        let buffered = 0;
        cxjPlayer.value.buffered.end(0);
        buffered = cxjPlayer.value.buffered.end(0) > duration.value ? cxjPlayer.value.buffered.end(0) : duration.value
        console.log(buffered, buffered / duration.value);
        loadProgress.value = buffered / duration.value * 100;
      }
    }
    // 获取当前播放时间
    cxjPlayer.value.ontimeupdate = () => {
      currentTime.value = cxjPlayer.value.currentTime * 1000
    }
    // 播放结束事件
    cxjPlayer.value.onended = () => {
      store.commit('setIsPlaying', false);
    }
  })


  return {
    cxjPlayer,
    progress,
    isPlaying,
    mode,
    voice,
    curMusic,
    duration,
    currentTime,
    currentTime,
    percent,
    loadProgress,
    play,
    changePlayStyle,
    changeVoice,
    barClick,
  }
}