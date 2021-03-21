import { ref, onMounted, computed, watchEffect, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { playMode } from '@/config.js';

export default function () {
  let cxjPlayer = ref(null); // radio元素
  let volume = ref(null); // 音量元素
  let store = useStore();
  let mode = computed(() => store.getters.mode);
  let isMute = computed(() => store.getters.isMute);
  let isPlaying = computed(() => store.getters.isPlaying);
  let curMusic = computed(() => store.getters.curMusic);
  let duration = ref(191.208); // 当前歌曲时间
  let currentTime = ref(0); // 当前播放时间
  let percent = ref(0); // 播放进度
  let loadPercent = ref(0); // 缓存进度
  let isMouseDown = ref(false);
  watchEffect(() => {
    percent.value = currentTime.value / duration.value;
  })

  // 播放暂停功能
  const play = () => {
    store.commit('setIsPlaying', !isPlaying.value);
    if (isPlaying.value) {
      cxjPlayer.value.play();
    } else {
      cxjPlayer.value.pause();
    }
  }
  // 切换播放模式
  const setMode = () => {
    store.commit('setMode', mode.value + 1);
  }
  // 获取播放模式枚举
  const getModeEnum = () => {
    return {
      [playMode.list]: {
        title: '列表循环',
        className: 'playMode_list'
      },
      [playMode.order]: {
        title: '顺序播放',
        className: 'playMode_order'
      },
      [playMode.random]: {
        title: '随机播放',
        className: 'playMode_random'
      },
      [playMode.single]: {
        title: '单曲循环',
        className: 'playMode_single'
      },
    }[mode.value];
  }
  // 是否静音
  const setIsMute = () => {
    store.commit('setIsMute', !isMute.value);
  }
  // 播放器键盘事件
  const bindKeyupEvent = () => {
    document.addEventListener('keyup', e => {
      let altKey = e.altKey;
      let code = e.code;
      if (altKey) { // 按下alt键
        switch (code) {
          case 'ArrowUp': // 增加音量
            break;
          case 'ArrowDown': // 减少音量
            break;
          case 'ArrowLeft': // 上一首
            break;
          case 'ArrowRight': // 下一首
            break;
        }
      } else {
        switch (code) {
          case 'Space': // 播放/暂停
            play();
            break;
          case 'KeyO': // 播放模式切换
            changePlayStyle();
            break;
          case 'KeyM': // 开启/关闭声音
            setMode();
            break;
          default:
            break;
        }
      }
    })
  }
  // 修改音乐显示时间
  const changeProgress = per => {
    console.log('changeProgress', per)
    currentTime.value = per * duration.value
  }
  // 修改音乐播放时间
  const changeProgressEnd = per => {
    console.log('changeProgressEnd', per)
    cxjPlayer.value.currentTime = per * duration.value
  }

  const changeMouseDownVal = val => {
    isMouseDown.value = val;
    console.log('changeMouseDownVal', isMouseDown.value)
  }

  onMounted(() => {
    bindKeyupEvent();
    cxjPlayer.value.src = 'http://m8.music.126.net/20210321113234/6f7651a24513101e715ed34077a9af89/ymusic/c7bc/455e/612c/0d891c5408be6d0af16c7fa64945de75.mp3'
    // 缓冲事件
    cxjPlayer.value.onprogress = () => {
      if (cxjPlayer.value.buffered.length > 0) {
        let buffered = 0;
        cxjPlayer.value.buffered.end(0);
        buffered = cxjPlayer.value.buffered.end(0) > duration.value ? cxjPlayer.value.buffered.end(0) : duration.value
        loadPercent.value = buffered / duration.value;
      }
    }
    // 获取当前播放时间
    cxjPlayer.value.ontimeupdate = () => {
      if (!isMouseDown.value) {
        currentTime.value = cxjPlayer.value.currentTime;
      }
    }
    // 播放结束事件
    cxjPlayer.value.onended = () => {
      store.commit('setIsPlaying', false);
    }
  })


  return {
    cxjPlayer,
    volume,
    isPlaying,
    mode,
    isMute,
    isMouseDown,
    curMusic,
    duration,
    currentTime,
    percent,
    loadPercent,
    play,
    setMode,
    getModeEnum,
    setIsMute,
    changeMouseDownVal,
    changeProgress,
    changeProgressEnd,
  }
}