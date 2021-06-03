<template>
  <div class="song_wrapper contentArea">
    <div class="song_data">
      <div v-show="al.picUrl" class="song_cover">
        <img :src="al.picUrl" :alt="al.name">
      </div>
      <div v-show="name && commentTotal" class="song_cont">
        <h1 class="mt10">{{ name }}</h1>
        <div v-if="alia.length > 0" class="alia">{{ alia[0] }}</div>
        <div class="song_singer mt10">
          <cxj-icon class="icon_singer mr10" />
          <template v-for="(art, i) in ar" :key="art.id">
            {{ i == 0 ? '' : ' /' }}
            <span>{{ art.name }}</span>
          </template>
        </div>
        <ul class="song_info mt10">
          <li class="song_info__item mr10">
            专辑：
            <span>{{ al.name }}</span>
          </li>
          <li class="song_info__item mr10">
            发行时间：{{ moment(publishTime).format('YYYY-MM-DD') }}
          </li>
        </ul>
        <div class="song_actions">
          <cxj-button type="primary" icon="player" @click="play">播放</cxj-button>
          <cxj-button icon="comment">评论({{ commentTotal }})</cxj-button>
        </div>
      </div>
    </div>
    <div v-show="lyric.length > 0" class="song_lyric" :class="{'limit': lyricBtn == '展开'}">
      <h2>歌词</h2>
      <div class="song_lyric_box" ref="lyric_box">
        <div class="song_lyric_cont" :style="{marginTop: `${lyricBtn == '展开' && curMusic.id == id ? marginTop : 0}px`}">
          <p 
            v-for="(lrc, i) in lyric" 
            :key="lrc.time" 
            :class="{active: curMusic.id == id && lyricIdx == i}" 
            :ref="el => {if (el) pRefs[i] = el}"
            :style="{lineHeight: tlyric[i] && tlyric[i].words ? '20px' : '40px'}"
          >
            {{ lrc.words }}
            <template v-if="tlyric[i] && tlyric[i].words">
              <br>
              {{ tlyric[i].words }}
            </template>
          </p>
        </div>
      </div>
      
      <div class="lyricBtn" @click="openLyric">[{{ lyricBtn }}]</div>
    </div>
  </div>
</template>

<script>
import useSong from './useSong'
import cxjIcon from '@/baseComponents/cxj-icon/cxj-icon.vue'
import cxjButton from '@/baseComponents/cxj-button/cxj-button.vue'
import moment from 'moment'

export default {
  components: {
    cxjIcon, 
    cxjButton 
  },
  setup() {
    return {
      moment,
      ...useSong(),
    }
  }
}
</script>

<style lang="less" scoped>
.song_wrapper {
  box-sizing: border-box;
  padding: 0 40px;
}
.song_data {
  display: flex;
  justify-content: space-between;
  padding: 40px 0 35px;
}
.song_cover {
  width: 22.5%;
  // width: 250px;
  // height: 250px;
  img {
    width: 100%;
    height: 100%;
  }
}
.song_cont {
  width: 70%;
  position: relative;
  .alia {
    font-size: 16px;
    color: #bababa;
  }
  .song_singer {
    font-size: 18px;
    height: 25px;
    color: #666;
    line-height: 25px;
  }
  .song_info {
    width: 520px;
    display: flex;
    .song_info__item {
      width: 166px;
      &:nth-child(odd) {
        width: 250px;
      }
    }
  }
  .song_actions {
    position: absolute;
    left: 0;
    bottom: 15px;
    display: flex;
  }
}

.song_lyric {
  &.limit {
    .song_lyric_box {
      max-height: 350px;
      overflow: hidden;
      position: relative;
      .song_lyric_cont {
        transition: all .5s;
      }
    }
  }
  p {
    padding: 5px 0;
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

.song_singer span, .song_info__item span {
  cursor: pointer;
}
.icon_singer {
  width: 16px;
  height: 16px;
  background-position: -20px -240px;
}
</style>