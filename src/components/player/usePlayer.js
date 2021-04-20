import { ref, onMounted, computed, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { defaultVolume, playMode } from '@/config.js';
import gsap from 'gsap';

export default function () {
  const store = useStore();
  let cxjPlayer = ref(null); // radio元素
  let volume = ref(defaultVolume);
  let mode = computed(() => store.getters.mode);
  let isMute = computed(() => store.getters.isMute);
  let isPlaying = computed(() => store.getters.isPlaying);
  let curMusic = computed(() => store.getters.curMusic);
  let currentIndex = computed(() => store.getters.currentIndex);
  let currentTime = ref(0); // 当前播放时间
  let percent = ref(0); // 播放进度
  let loadPercent = ref(0); // 缓存进度
  let isMouseDown = ref(false); // 鼠标是否在音乐进度条中按下
  let isShowList = ref(false); // 是否显示播放列表
  watchEffect(() => {
    percent.value = currentTime.value / curMusic.value.duration;
  })

  // 播放暂停功能
  const play = () => {
    if(currentIndex.value == -1) return;
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
    if(isMute.value) {
      cxjPlayer.value.volume = 0;
    }
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
    currentTime.value = per * curMusic.value.duration
  }
  // 修改音乐播放时间
  const changeProgressEnd = per => {
    // if(!curMusic.value.duration) return;
    cxjPlayer.value.currentTime = per * curMusic.value.duration
  }

  // 修改鼠标是否按下
  const changeMouseDownVal = val => {
    isMouseDown.value = val;
  }

  // 修改音量
  const changeVolume = val => {
    volume.value = val;
    cxjPlayer.value.volume = volume.value;
    store.commit('setIsMute', volume.value == 0);
  }

  // 显示/隐藏播放列表
  const showPlayList = e => {
    isShowList.value = !isShowList.value;
  }

  // 隐藏播放列表
  const hideList = () => {
    isShowList.value = false;
  }

  onMounted(() => {
    bindKeyupEvent();
    console.log(curMusic.value)
    cxjPlayer.value.src = curMusic.value.url
    cxjPlayer.value.volume = volume.value;
    // 缓冲事件
    cxjPlayer.value.onprogress = () => {
      if (cxjPlayer.value.buffered.length > 0) {
        let buffered = 0;
        cxjPlayer.value.buffered.end(0);
        buffered = cxjPlayer.value.buffered.end(0) > curMusic.value.duration ? cxjPlayer.value.buffered.end(0) : duration.value
        loadPercent.value = buffered / curMusic.value.duration;
        // 缓冲进度动画
        // let loadPer = buffered / curMusic.value.duration;
        // gsap.to(loadPercent, {
        //   value: loadPer,
        //   duration: 5
        // })
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
    currentIndex,
    currentTime,
    percent,
    loadPercent,
    isShowList,
    play,
    setMode,
    getModeEnum,
    setIsMute,
    changeMouseDownVal,
    changeProgress,
    changeProgressEnd,
    changeVolume,
    showPlayList,
    hideList,
  }
}