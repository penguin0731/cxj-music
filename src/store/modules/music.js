import { defineStore } from 'pinia';

const useMusicStore = defineStore('app', {
  state: () => ({
    audioDom: null, // audio元素
    mode: 0, // 播放模式 0列表循环，1顺序播放，2随机播放，3单曲循环
    isPlaying: false, // 播放状态
    playList: [], // 播放列表
    currentIndex: -1, // 当前音乐索引
    currentTime: 0, // 当前播放时间
    isMute: false, // 是否静音
    isMouseDown: false // 鼠标是否在音乐进度条中按下
  }),
  actions: {
    setMode(mode) {
      this.mode = mode >= 4 ? 0 : mode;
    }
  }
});

export default useMusicStore;
