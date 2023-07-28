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
      <div v-for="item in songlist" class="songlist_item mb20" :key="item.id">
        <div class="songlist_cover">
          <a :href="`/songlist?id=${item.id}`">
            <img :src="`${item.coverImgUrl}?param=164y164`" alt="" />
          </a>
          <div class="cover_play"></div>
        </div>
        <div class="songlist_name mt10">
          <a
            class="ellipsis"
            :href="`/songlist?id=${item.id}`"
            :title="item.name"
          >
            {{ item.name }}
          </a>
        </div>
        <div class="songlist_creator">
          <a class="ellipsis" :href="`/`" :title="item.creator.nickname">
            {{ item.creator.nickname }}
          </a>
        </div>
        <div class="songlist_playCount">
          播放量：{{ toggleUnits(item.playCount) }}
        </div>
      </div>
    </div>
    <div class="songlist_page">
      <cxj-page
        v-show="total > 0"
        :total="total"
        :currentPage="currentPage"
        @currentChange="currentChange"
      />
    </div>
  </div>
</template>

<script setup>
import useSongList from '@/page/songlist/useSongList';
import songTag from '../songlist/songTag.vue';
import CxjIcon from '@/baseComponents/cxj-icon/cxj-icon.vue';
import cxjPage from '@/baseComponents/cxj-page/cxj-page.vue';
import { toggleUnits } from '@/utils/util';
import nProgress from 'nprogress';
import api from '@/api';
import { ref } from 'vue';

const categories = ref([]); // 歌单标签分类
const sub = ref([]); // 所有歌单标签
const showTagBox = ref(false); // 歌单标签显示
const curOrder = ref('hot'); // 当前歌单列表状态（new/hot）
const curTitle = ref('全部歌单'); // 当前选中标签
const songlist = ref([]); // 歌单列表
const currentPage = ref(1); // 当前歌单页数
const total = ref(0); // 歌单总数

watch([curOrder, curTitle, currentPage], ([newOrder, newCat, newPage]) => {
  const cat = newCat === '全部歌单' ? '全部' : newCat;
  const params = {
    order: newOrder,
    cat
  };
  newPage && (params.page = newPage);
  getSongList(params);
});

// 获取歌单标签
const getCatList = async () => {
  const res = await api.songlist.getCatList();
  sub.value = res.sub;
  const cate = res.categories;
  for (const key in cate) {
    const value = cate[key];
    categories.value[key] = value;
  }
};

// 获取相应歌单
const getSongList = async ({
  order,
  cat = '全部',
  pageSize = 50,
  page
} = {}) => {
  let params = {
    order,
    cat,
    limit: pageSize
  };
  page && (params.page = page);
  const res = await api.songlist.getSongList(params);
  songlist.value = res.playlists;
  total.value = res.total;
};

// 切换歌单标签状态
const toggleOrder = newOrder => {
  if (newOrder === data.curOrder) return;
  curOrder.value = newOrder;
};

// 展示歌单标签盒子
const handleShowTagBox = () => {
  showTagBox.value = !showTagBox.value;
};

// 歌单标签盒子外部点击
const handleClickOutSide = () => {
  showTagBox.value = false;
};

// 修改歌单标签
const handleChangeTag = tag => {
  curTitle.value = tag;
  showTagBox.value = false;
};

const currentChange = newPage => {
  currentPage.value = newPage;
};

onMounted(async () => {
  await getCatList();
  await getSongList();
  nProgress.done();
});

// export default {
//   components: { songTag, CxjIcon, cxjPage },
//   setup() {
//     return {
//       toggleUnits,
//       ...useSongList()
//     };
//   }
// };
</script>

<style lang="scss" scoped>
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
      &.disabled {
        color: #999;
        cursor: no-drop;
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
  display: grid;
  row-gap: 20px;
  column-gap: 20px;
  grid-template-columns: repeat(5, 164px);
  .songlist_item {
    display: flex;
    flex-direction: column;
  }
}
.songlist_cover {
  width: 164px;
  height: 164px;
}
.songlist_name {
  width: 164px;
  a {
    display: block;
    &:hover {
      color: var(--themeColor);
    }
  }
}
.songlist_creator {
  width: 164px;
  color: #999;
  a {
    display: block;
    &:hover {
      color: var(--themeColor);
    }
  }
}
.songlist_playCount {
  color: #999;
}
.songlist_page {
  display: flex;
  justify-content: flex-end;
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
