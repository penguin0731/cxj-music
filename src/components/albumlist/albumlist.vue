<template>
  <div class="albumlist">
    <div
      v-for="(item, index) in list"
      class="albumlist_item mb20"
      :key="item.id"
    >
      <div class="albumlist_cover">
        <a :href="`/#/album?id=${item.id}`">
          <img :src="`${item.picUrl}?param=164y164`" alt="" />
        </a>
        <div class="cover_play"></div>
      </div>
      <div class="albumlist_title mt10">
        <a :href="`/#/album?id=${item.id}`">{{ item.name }}</a>
      </div>
      <div v-if="showName" class="albumlist_artist">
        <template v-for="(art, i) in item.artists" :key="art.id">
          {{ i == 0 ? '' : ' /' }}
          <a :href="`/#/artist?id=${art.id}`">{{ art.name }}</a>
        </template>
      </div>
      <div v-if="showPublishTime" class="albumlist_publish">
        {{ moment(item.publishTime).format('YYYY-MM-DD') }}
      </div>
    </div>
  </div>
</template>

<script>
import useAlbumList from './useAlbumList';
import moment from 'moment';
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    showName: {
      type: Boolean,
      default: true
    },
    showPublishTime: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {
      moment,
      ...useAlbumList()
    };
  }
};
</script>

<style lang="less" scoped>
.albumlist {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.albumlist_cover {
  width: 164px;
  height: 164px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  &:hover {
    img {
      transform: scale(1.05);
    }
    .cover_play {
      opacity: 1;
      width: 60px;
      height: 60px;
    }
  }
  img {
    transition: all 0.5s;
  }
  .cover_play {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url('@/assets/img/cover_play.png');
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0;
    transition: all 0.5s;
  }
}
.albumlist_title a {
  &:hover {
    color: var(--themeColor);
  }
}
.albumlist_artist a {
  &:hover {
    color: var(--themeColor);
  }
}
.albumlist_publish {
  color: #999;
}
</style>