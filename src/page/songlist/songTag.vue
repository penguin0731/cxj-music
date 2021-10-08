<template>
  <div ref="songTagRef" class="songTagWrap scrollbar">
    <div class="songTags">
      <h3>默认</h3>
      <ul class="songTagList mt10">
        <li
          :class="{ active: curOrder === '全部歌单' }"
          @click="handleChangeTag('全部歌单')"
        >
          全部歌单
        </li>
      </ul>
    </div>
    <div class="songTags mt20" v-for="(cat, index) in categories" :key="cat">
      <h3>{{ cat }}</h3>
      <ul class="songTagList mt10">
        <template v-for="tag in sub">
          <li
            :class="{ active: curOrder === tag.name }"
            :key="tag.name"
            v-if="tag.category == index"
            @click="handleChangeTag(tag.name)"
          >
            {{ tag.name }}
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
export default {
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    sub: {
      type: Array,
      default: () => []
    },
    curOrder: {
      type: String
    }
  },
  setup(props, { emit }) {
    const songTagRef = ref(null);
    const handleClickOutSide = e => {
      // 如果点击的目标元素不存在songTagRef，则视为点击外部元素，触发监听
      if (!songTagRef.value.contains(e.target)) {
        emit('click-ouside');
      }
    };
    const handleChangeTag = tagName => {
      emit('change', tagName);
    };
    onMounted(() => {
      document.addEventListener('click', handleClickOutSide, false);
    });
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutSide, false);
    });
    return {
      songTagRef,
      handleChangeTag
    };
  }
};
</script>

<style lang="less" scoped>
.songTagWrap {
  position: absolute;
  top: 82px;
  left: 40px;
  width: 60%;
  max-height: 646px;
  padding: 30px 10px 0 36px;
  background-color: #fff;
  box-shadow: 0 4px 20px 0 rgb(65 67 70 / 8%);
  overflow-y: scroll;
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
  }
}
.songTagList {
  display: flex;
  flex-wrap: wrap;
  li {
    padding: 6px 18px;
    background: #f7f7f7;
    border-radius: 16px;
    margin: 0 10px 10px 0;
    cursor: pointer;
  }
  li.active,
  li:hover {
    background-color: var(--themeColor);
    color: #fff;
  }
}
</style>
