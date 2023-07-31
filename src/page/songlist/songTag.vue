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

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
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
});
const emit = defineEmits(['click-ouside', 'change']);

const songTagRef = ref();
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

</script>

<style lang="scss" scoped>
.songTagWrap {
  position: absolute;
  top: 82px;
  left: 40px;
  width: 60%;
  max-height: 646px;
  padding: 30px 10px 0 36px;
  background-color: #fff;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
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
