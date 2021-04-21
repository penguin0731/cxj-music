import { ref, onMounted, computed, watchEffect, watch } from 'vue';
import { useStore } from 'vuex';
import { defaultVolume, playMode } from '@/config.js';
import { randomIndex } from '@/utils/util.js';
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
  let playList = computed(() => store.getters.playList);
  let currentTime = ref(0); // 当前播放时间
  let percent = ref(0); // 播放进度
  let loadPercent = ref(0); // 缓存进度
  let isMouseDown = ref(false); // 鼠标是否在音乐进度条中按下
  let isShowList = ref(false); // 是否显示播放列表
  watchEffect(() => {
    percent.value = currentTime.value / curMusic.value.duration;
  })
  watch(isPlaying, (isPlaying, oldVal) => {
    isPlaying ? cxjPlayer.value.play() : cxjPlayer.value.pause();
  })
  watch(curMusic, (newMusic, oldMusic) => {
    console.log(newMusic)
    if(!newMusic.id) return;
    if(newMusic.id == oldMusic.id) return;
    cxjPlayer.value.src = newMusic.url;
    cxjPlayer.value.currentTime = loadPercent.value = 0;
    cxjPlayer.value.play();
  })

  // 播放暂停功能
  const play = () => {
    if(currentIndex.value == -1) return;
    store.commit('setIsPlaying', !isPlaying.value);
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
  // 下一首
  const next = () => {
    if(currentIndex.value == playList.value.length - 1) {
      store.commit('setCurrentIndex', 0);
    }else {
      store.commit('setCurrentIndex', currentIndex.value + 1);
    }
  }
  // 上一首
  const prev = () => {
    if(currentIndex.value == 0) {
      store.commit('setCurrentIndex', playList.value.length - 1);
    }else {
      store.commit('setCurrentIndex', currentIndex.value -1);
    }
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
            addVolume();
            break;
          case 'ArrowDown': // 减少音量
            reduceVolume();
            break;
          case 'ArrowLeft': // 上一首
            prev();
            break;
          case 'ArrowRight': // 下一首
            next();
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
  // 增加音量
  const addVolume = () => {
    let vol = volume.value += 0.1;
    if(vol >= 1) {
      vol = 1;
    }
    changeVolume(vol);
  }
  // 降低音量
  const reduceVolume = () => {
    let vol = volume.value -= 0.1;
    if(vol <= 0) {
      vol = 0;
    }
    changeVolume(vol);
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

    cxjPlayer.value.volume = volume.value;
    // 缓冲事件
    cxjPlayer.value.onprogress = () => {
      if (cxjPlayer.value.buffered.length > 0) {
        let buffered = 0;
        cxjPlayer.value.buffered.end(0);
        buffered = cxjPlayer.value.buffered.end(0) > curMusic.value.duration ? cxjPlayer.value.buffered.end(0) : curMusic.value.duration
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
      switch(mode.value) {
        case playMode.list:
          next();
          break;
        case playMode.order:
          if(currentIndex.value == playList.value.length - 1) {
            store.commit('setIsPlaying', false);
            store.commit('setCurrentIndex', -1);
          }else {
            store.commit('setCurrentIndex', currentIndex.value + 1);
          }
          break;
        case playMode.random:
          let index = randomIndex(playList.value.length);
          store.commit('setCurrentIndex', index);
          break;
        case playMode.single:
          cxjPlayer.value.currentTime = loadPercent.value = 0;
          cxjPlayer.value.play();
          break;
      }
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
    next,
    prev,
    setIsMute,
    changeMouseDownVal,
    changeProgress,
    changeProgressEnd,
    changeVolume,
    showPlayList,
    hideList,
  }
}