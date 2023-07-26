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

<script>
import useLyric from './useLyric';
export default {
  props: {
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
  },
  setup(props) {
    return {
      ...useLyric(props)
    };
  }
};
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
