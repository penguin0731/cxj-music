import { ref, computed, reactive, onMounted, onBeforeUpdate, watchEffect, toRefs } from 'vue'
import { useStore } from 'vuex'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { parseLyric, syncLyric } from '@/utils/song'

export default function(props) {
  const store = useStore();
  let lyricBtn = ref('展开');
  let lyricList = ref([]); // 歌词列表
  let tlyricList = ref([]); // 翻译歌词列表
  let lyricIdx = ref(0); // 当前歌词的索引
  let pRefs = ref([]);
  let lyric_box = ref(null);
  let song_lyric_cont = ref(null);
  let cxjPlayer = computed(() => store.getters.audioDom);
  let curMusic = computed(() => store.getters.curMusic);
  let isMouseDown = computed(() => store.getters.isMouseDown);
  let marginTop = ref(0);
  

  const openLyric = () => {
    lyricBtn.value = lyricBtn.value == '展开' ? '收起' : '展开';
  }

  const getLyricList = () => {
    let lyric = props.lyric;
    let tlyric = props.tlyric;
    if(!lyric) return;
    let tempLyric = parseLyric(lyric);
    let tempTlyric = parseLyric(tlyric);
    if(tempTlyric.length > 0) { // 如果有翻译歌词，则将原歌词和翻译歌词的长度进行同步
      let lyricArr = syncLyric(tempLyric, tempTlyric);
      lyricList.value = lyricArr[0];
      tlyricList.value = lyricArr[1];
    }else {
      lyricList.value = tempLyric;
      tlyricList.value = tempTlyric;
    }
    console.log(lyricList.value, tlyricList.value);
  }

  // 获取当前歌词的索引
  const getCurrentIndex = () => {
    let playTime = cxjPlayer.value.currentTime + 0.5; // 修正值0.8
    for(let i = lyricList.value.length - 1; i >= 0; i--) {
      let lyrObj = lyricList.value[i];
      if(playTime >= lyrObj.time) {
        return i
      }
    }
    return -1
  }

  // 设置当前歌词的索引
  const setCurrent = () => {
    let index = getCurrentIndex();
    lyricIdx.value = index;
    setMarginTop();
  }

  // 通过当前歌词索引计算需要上移的偏移量
  const setMarginTop = () => {
    if(!lyric_box.value.clientHeight) return;
    let midHeight = lyric_box.value.clientHeight / 2 - pRefs.value[lyricIdx.value].clientHeight / 2;
    let top = midHeight - pRefs.value[lyricIdx.value].clientHeight * lyricIdx.value;
     // marginTop不能为正数
    if(top > 0) top = 0;
    // 当滚动的距离+容器高度>歌词内容高度时，则不再滚动
    if(lyric_box.value.clientHeight - top > song_lyric_cont.value.clientHeight) return;
    marginTop.value = top;
  }

  const getLineHeight = i => {
    if(tlyricList.value.length == 0) { // 没有翻译歌词
      return '20px';
    }else {
      return tlyricList.value[i] && tlyricList.value[i].words ? '20px' : '40px';
    }
  }

  onMounted(() => {
    cxjPlayer.value.ontimeupdate = () => {
      if (!isMouseDown.value) {
        store.commit('setCurrentTime', cxjPlayer.value.currentTime);
      }
      setCurrent();
    }
  })

  watchEffect(() => {
    getLyricList();
  })

  watchEffect(() => {
    console.log('lyric watchEffect', lyricIdx.value)
  })

  // 确保在每次更新之前重置ref
  onBeforeUpdate(() => {
    pRefs.value = []
  })

  return {
    lyricBtn,
    curMusic,
    lyricList,
    tlyricList,
    lyricIdx,
    pRefs,
    lyric_box,
    song_lyric_cont,
    marginTop,
    openLyric,
    getLineHeight
  }
}