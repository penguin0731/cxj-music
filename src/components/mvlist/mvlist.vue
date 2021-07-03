<template>
  <div class="mvlist">
    <div v-for="(item, index) in list" class="mvlist_item mb20" :key="item.id">
      <div class="mvlist_cover">
        <a :href="`/#/mv?id=${item.id}`">
          <img :src="`${item.imgurl}?param=286y164`" alt="" />
        </a>
        <div class="cover_play"></div>
      </div>
      <div class="mvlist_title mt10">
        <a :href="`/#/mv?id=${item.id}`">{{ item.name }}</a>
      </div>
      <div class="mvlist_playCount">
        <cxj-icon class="icon_listen" />
        <span class="ml10">{{ toggleUnits(item.playCount) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import cxjIcon from '@/baseComponents/cxj-icon/cxj-icon.vue';
import moment from 'moment';
import { toggleUnits } from '@/utils/util';
export default {
  components: {
    cxjIcon
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {
      moment,
      toggleUnits
    };
  }
};
</script>

<style lang="less" scoped>
.mvlist {
  display: flex;
  flex-wrap: wrap;
}
.mvlist_item {
  margin-right: 20px;
  &:nth-of-type(3n) {
    margin-right: 0;
  }
}
.mvlist_cover {
  width: 286px;
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
.mvlist_title a {
  &:hover {
    color: var(--themeColor);
  }
}
.mvlist_playCount {
  color: #999;
  display: flex;
  align-items: center;
}
.icon_listen {
  width: 19px;
  height: 12px;
  background-position: -180px -20px;
}
</style>