<template>
  <div class="songlist_wrapper contentArea">
    <div class="songlist_hd">
      <h1 class="songlist_title" @click.stop="handleShowTagBox">
        {{ curTitle }}
        <i
          class="arrow"
          :class="{ arrow_bottom: !showTagBox, arrow_top: showTagBox }"
        ></i>
      </h1>
      <div>
        <span
          class="new"
          :class="{ active: curOrder === 'new' }"
          @click="toggleOrder('new')"
        >
          最新
        </span>
        <span
          class="hot"
          :class="{ active: curOrder === 'hot' }"
          @click="toggleOrder('hot')"
        >
          最热
        </span>
      </div>
    </div>
    <song-tag
      v-if="showTagBox"
      :categories="categories"
      :sub="sub"
      :curOrder="curTitle"
      @click-ouside="handleClickOutSide"
      @change="handleChangeTag"
    />
    <div class="songlist_bd mt20">
      <div v-for="item in songlist" class="songlist_item" :key="item.id">
        <div class="songlist_cover">
          <a :href="`/#/playlist?id=${item.id}`">
            <img :src="`${item.coverImgUrl}?param=140y140`" alt="" />
          </a>
          <div class="cover_play"></div>
        </div>
        <div class="songlist_title">
          <a
            class="ellipsis"
            :href="`/#/playlist?id=${item.id}`"
            :title="item.name"
          >
            {{ item.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useSongList from '@/page/songlist/useSongList';
import songTag from '../songlist/songTag.vue';
import CxjIcon from '@/baseComponents/cxj-icon/cxj-icon.vue';
export default {
  components: { songTag, CxjIcon },
  setup() {
    return {
      ...useSongList()
    };
  }
};
</script>

<style lang="less" scoped>
.songlist_wrapper {
  box-sizing: border-box;
  padding: 0 40px;
  position: relative;
}
.songlist_hd {
  padding: 35px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    display: inline-block;
    width: 40px;
    height: 30px;
    line-height: 30px;
    position: relative;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    cursor: pointer;
    &.active {
      color: #fff;
      font-weight: 700;
      background-color: var(--themeColor);
      &::after {
        content: '';
        position: absolute;
        width: 14px;
        height: 30px;
        z-index: -1;
        background: var(--themeColor);
        transform: skewX(-20deg);
      }
    }
    &.new {
      border-right: none;
      text-align: right;
      padding-right: 15px;
      &.active {
        padding-right: 5px;
      }
    }
    &.hot {
      border-left: none;
      padding-left: 15px;
      &.active {
        padding-left: 5px;
      }
    }
    &.hot.active {
      z-index: 2;
      &::after {
        left: -7px;
      }
    }
    &.new.active {
      z-index: 2;
      &::after {
        right: -7px;
      }
    }
  }
}
.songlist_title {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.songlist_bd {
  display: flex;
  flex-wrap: wrap;
  .songlist_item {
    display: flex;
    flex-direction: column;
  }
}
.arrow {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-size: 100% 100%;
  &.arrow_bottom {
    background-image: url('@/assets/img/arrow-bottom.png');
  }
  &.arrow_top {
    background-image: url('@/assets/img/arrow-top.png');
  }
}
</style>