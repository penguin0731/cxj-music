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
      v-show="lyricData"
      :curId="songInfo.id"
      :lyric="lyricData"
      :tlyric="tlyricData"
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

<script setup>
import cxjIcon from '@/baseComponents/cxj-icon/cxj-icon.vue';
import cxjButton from '@/baseComponents/cxj-button/cxj-button.vue';
import cxjPage from '@/baseComponents/cxj-page/cxj-page.vue';
import lyric from '@/components/lyric/lyric.vue';
import comments from '@/components/comments/comments.vue';
import moment from 'moment';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import useMusicStore from '@/store/modules/music';
import api from '@/api';
import { createSong } from '@/utils/song';
import { clone } from '@/utils/util';
import nProgress from 'nprogress';

const useMusic = useMusicStore();
const route = useRoute();

const songInfo = ref({}); // 歌曲详情
const lyricData = ref(''); // 歌词
const tlyricData = ref(''); // 歌词翻译
const comment = ref({}); // 评论
const currentPage = ref(1); // 当前评论页码

const play = () => {
  let index = -1;
  let isInList = useMusic.playList.some((item, idx) => {
    if (item.id == songInfo.value.id) {
      index = idx;
    }
    return item.id == songInfo.value.id;
  });
  if (isInList) {
    // 如果该歌曲已存在播放列表，则将该歌曲的索引设置为当前音乐索引
    useMusic.currentIndex = index;
  } else {
    // 不存在则将该歌曲插入到播放列表最前面
    let list = clone(playList.value);
    list.unshift(createSong(songInfo.value));
    useMusic.playList = list;
    useMusic.currentIndex = 0;
  }
  useMusic.audioDom.currentTime = 0; // 重头播放
  useMusic.isPlaying = true;
};

// 获取歌曲基本信息
const getDetailCallBack = res => {
  if (res.songs.length > 0) {
    songInfo.value = res.songs[0];
  }
};

// 获取歌曲歌词
const getLyricCallBack = res => {
  lyricData.value = res.lrc.lyric;
  tlyricData.value = res.tlyric.lyric;
};

// 获取歌曲评论
const getCommentCallBack = res => {
  comment.value = res;
};

// 获取歌曲详情
const getSongDetail = async id => {
  let promiseArr = [
    api.song.getDetail(id),
    api.song.getLyric(id),
    api.song.getComment({ id })
  ];
  let cbArr = [getDetailCallBack, getLyricCallBack, getCommentCallBack];
  const resArr = await Promise.all(promiseArr);
  resArr.forEach((res, index) => {
    cbArr[index](res);
  });
};

const currentChange = newPage => {
  currentPage.value = newPage;
  let id = route.query.id;
  let getComment =
    currentPage.value === 1
      ? api.song.getComment({ id })
      : api.song.getComment({ id, page: newPage });
  getComment.then(getCommentCallBack);
};

onMounted(async () => {
  let id = route.query.id;
  await getSongDetail(id);
  nProgress.done();
});

// 路由参数中的id变化时，重新调用接口
onBeforeRouteUpdate(async (to, from) => {
  let toId = to.query.id;
  let fromId = from.query.id;
  if (toId !== fromId) {
    await getSongDetail(toId);
    nProgress.done();
  }
});

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
