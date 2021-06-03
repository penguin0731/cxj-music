export default {
  setAudioDom(state, dom) {
    state.audioDom = dom;
  },
  setMode(state, mode) {
    mode >= 4 ? state.mode = 0 : state.mode = mode;
  },
  setIsPlaying(state, isPlaying) {
    state.isPlaying = isPlaying;
  },
  setPlayList(state, playList) {
    state.playList = playList;
  },
  setCurrentIndex(state, index) {
    state.currentIndex = index;
  },
  setCurrentTime(state, time) {
    state.currentTime = time;
  },
  setIsMute(state, isMute) {
    state.isMute = isMute;
  },
  setIsMouseDown(state, boolean) {
    state.isMouseDown = boolean;
  },
  setUid(state, Uid) {
    state.Uid = Uid;
  }
}