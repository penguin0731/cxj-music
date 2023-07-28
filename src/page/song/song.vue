<template>
  <div class="song_wrapper contentArea">
    <div class="song_data">
      <div v-show="songInfo.id" class="song_cover">
        <img :src="songInfo.al?.picUrl" :alt="songInfo.al?.name" />
      </div>
      <div v-show="songInfo.id && comment.total" class="song_cont">
        <h1 class="mt10">{{ songInfo.name }}</h1>
        <div v-if="songInfo.alia?.length > 0" class="alia">
          {{ songInfo.alia[0] }}
        </div>
        <div class="song_singer mt10">
          <cxj-icon class="icon_singer mr10" />
          <template v-for="(art, i) in songInfo.ar" :key="art.id">
            {{ i == 0 ? '' : ' /' }}
            <a :href="`/artist?id=${art.id}`">{{ art.name }}</a>
          </template>
        </div>
        <ul class="song_info mt10">
          <li class="song_info__item mr10">
            专辑：
            <span>{{ songInfo.al?.name }}</span>
          </li>
          <li class="song_info__item mr10">
            发行时间：{{ moment(songInfo.publishTime).format('YYYY-MM-DD') }}
          </li>
        </ul>
        <div class="song_actions">
          <cxj-button type="primary" icon="player" @click="play">
            播放
          </cxj-button>
          <cxj-button icon="comment">评论({{ comment.total }})</cxj-button>
        </div>
      </div>
    </div>
    <lyric
      v-show="lyric"
      :curId="songInfo.id"
      :lyric="lyric"
      :tlyric="tlyric"
    />
    <comments
      v-show="comment.total > 0"
      class="mt40"
      :hotComments="comment.hotComments"
      :comments="comment.comments"
      :total="comment.total"
      :currentPage="currentPage"
    />
    <div class="song_page">
      <cxj-page
        v-show="comment.total > 0"
        :total="comment.total"
        :currentPage="currentPage"
        @currentChange="currentChange"
      />
    </div>
  </div>
</template>

<script>
import useSong from './useSong';
import cxjIcon from '@/baseComponents/cxj-icon/cxj-icon.vue';
import cxjButton from '@/baseComponents/cxj-button/cxj-button.vue';
import cxjPage from '@/baseComponents/cxj-page/cxj-page.vue';
import lyric from '@/components/lyric/lyric.vue';
import comments from '@/components/comments/comments.vue';
import moment from 'moment';

export default {
  components: {
    cxjIcon,
    cxjButton,
    cxjPage,
    lyric,
    comments
  },
  setup() {
    return {
      moment,
      ...useSong()
    };
  }
};
</script>

<style lang="scss" scoped>
a:hover {
  color: inherit;
}
.mt40 {
  margin-top: 40px;
}
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
.song_singer span,
.song_info__item span {
  cursor: pointer;
}
.song_page {
  display: flex;
  justify-content: flex-end;
}
</style>
