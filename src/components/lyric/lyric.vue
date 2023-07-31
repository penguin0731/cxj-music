<template>
  <div class="song_lyric" :class="{ limit: lyricBtn == '展开' }">
    <h2>歌词</h2>
    <div class="song_lyric_box" ref="lyric_box">
      <div
        ref="song_lyric_cont"
        class="song_lyric_cont"
        :style="{
          marginTop: `${
            lyricBtn == '展开' && curMusic.id == curId ? marginTop : 0
          }px`
        }"
      >
        <p
          v-for="(lrc, i) in lyricList"
          :key="lrc.time"
          :class="{ active: curMusic.id == curId && lyricIdx == i }"
          :ref="
            el => {
              if (el) pRefs[i] = el;
            }
          "
          :style="{ lineHeight: getLineHeight(i) }"
        >
          {{ lrc.words }}
          <template v-if="tlyricList[i] && tlyricList[i].words">
            <br />
            {{ tlyricList[i].words }}
          </template>
        </p>
      </div>
    </div>
    <div class="lyricBtn" @click="openLyric">[{{ lyricBtn }}]</div>
  </div>
</template>

<script setup>
import useMusicStore from '@/store/modules/music';
import { ref, computed, onMounted, onBeforeUpdate, watchEffect } from 'vue';
import { parseLyric, syncLyric } from '@/utils/song';

const props = defineProps({
  curId: {
    type: [Number, String]
  },
  lyric: {
    type: String,
    default: ''
  },
  tlyric: {
    type: String,
    default: ''
  }
});

const useMusic = useMusicStore();
const lyricBtn = ref('展开');
const lyricList = ref([]); // 歌词列表
const tlyricList = ref([]); // 翻译歌词列表
const lyricIdx = ref(0); // 当前歌词的索引
const marginTop = ref(0);
const pRefs = ref([]);
const lyric_box = ref();
const song_lyric_cont = ref();
const cxjPlayer = computed(() => useMusic.audioDom);
const curMusic = computed(() => useMusic.playList[useMusic.currentIndex] || {});
const isMouseDown = computed(() => useMusic.isMouseDown);

const openLyric = () => {
  lyricBtn.value = lyricBtn.value == '展开' ? '收起' : '展开';
};

const getLyricList = () => {
  let lyric = props.lyric;
  let tlyric = props.tlyric;
  if (!lyric) return;
  let tempLyric = parseLyric(lyric);
  let tempTlyric = parseLyric(tlyric);
  if (tempTlyric.length > 0) {
    // 如果有翻译歌词，则将原歌词和翻译歌词的长度进行同步
    let lyricArr = syncLyric(tempLyric, tempTlyric);
    lyricList.value = lyricArr[0];
    tlyricList.value = lyricArr[1];
  } else {
    lyricList.value = tempLyric;
    tlyricList.value = tempTlyric;
  }
  console.log(lyricList.value, tlyricList.value);
};

// 获取当前歌词的索引
const getCurrentIndex = () => {
  let playTime = cxjPlayer.value.currentTime + 0.5; // 修正值0.8
  for (let i = lyricList.value.length - 1; i >= 0; i--) {
    let lyrObj = lyricList.value[i];
    if (playTime >= lyrObj.time) {
      return i;
    }
  }
  return -1;
};

// 设置当前歌词的索引
const setCurrent = () => {
  let index = getCurrentIndex();
  lyricIdx.value = index;
  setMarginTop();
};

// 通过当前歌词索引计算需要上移的偏移量
const setMarginTop = () => {
  if (!lyric_box.value || !lyric_box.value.clientHeight) return;
  let midHeight =
    lyric_box.value.clientHeight / 2 -
    pRefs.value[lyricIdx.value].clientHeight / 2;
  let top =
    midHeight - pRefs.value[lyricIdx.value].clientHeight * lyricIdx.value;
  // marginTop不能为正数
  if (top > 0) top = 0;
  // 当滚动的距离+容器高度>歌词内容高度时，则不再滚动
  if (lyric_box.value.clientHeight - top > song_lyric_cont.value.clientHeight)
    return;
  marginTop.value = top;
};

const getLineHeight = i => {
  if (tlyricList.value.length == 0) {
    // 没有翻译歌词
    return '20px';
  } else {
    return tlyricList.value[i] && tlyricList.value[i].words ? '20px' : '40px';
  }
};

onMounted(() => {
  cxjPlayer.value.ontimeupdate = () => {
    if (!isMouseDown.value) {
      useMusic.currentTime = cxjPlayer.value.currentTime;
    }
    setCurrent();
  };
});

watchEffect(() => {
  getLyricList();
});

// 确保在每次更新之前重置ref
onBeforeUpdate(() => {
  pRefs.value = [];
});

</script>

<style lang="scss" scoped>
.song_lyric {
  &.limit {
    .song_lyric_box {
      max-height: 450px;
      overflow: hidden;
      position: relative;
      .song_lyric_cont {
        transition: all 0.5s;
      }
    }
  }
  p {
    padding: 5px 0;
    box-sizing: border-box;
    height: 50px;
    &.active {
      font-weight: bold;
    }
  }
  .lyricBtn {
    margin-top: 5px;
    color: var(--themeColor);
    cursor: pointer;
  }
}
</style>
