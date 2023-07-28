<template>
  <div class="cxjPage">
    <button
      class="cxjPage_prev"
      :disabled="currentPage === 1"
      @click="prevClick"
    >
      上一页
    </button>
    <ul class="cxjPage_pagerList">
      <li
        class="cxjPage_firstPage"
        :class="{ active: currentPage === 1 }"
        @click="pagerClick(1)"
      >
        1
      </li>
      <li v-if="showPrevMore">...</li>
      <li
        v-for="pager in pagers"
        :key="pager"
        class="cxjPage_pager"
        :class="{ active: currentPage === pager }"
        @click="pagerClick(pager)"
      >
        {{ pager }}
      </li>
      <li v-if="showNextMore">...</li>
      <li
        class="cxjPage_lastPage"
        :class="{ active: currentPage === pageCount }"
        @click="pagerClick(pageCount)"
      >
        {{ pageCount }}
      </li>
    </ul>
    <button class="cxjPage_next" @click="nextClick">下一页</button>
  </div>
</template>

<script setup>
// import usePage from './usePage';

import { computed, ref } from "vue";

const props = defineProps({
  total: {
    type: Number,
    default: 0
  },
  pageSize: {
    type: Number,
    default: 20
  },
  currentPage: {
    type: Number,
    default: 1
  },
  // 页码按钮的数量，包括第一页和最后一页，即实际中间的按钮数为pagerCount - 2
  pagerCount: {
    type: Number,
    default: 7,
    validator(val) {
      return val % 2 === 1 && val > 4 && val < 22;
    }
  }
});
const emit = defineEmits(['currentChange', 'prevClick', 'nextClick'])

const showPrevMore = ref(false);
const showNextMore = ref(false);
const pageCount = computed(() => Math.ceil(props.total / props.pageSize));
const pagers = computed(() => {
  const currentPage = props.currentPage;
  const halfPagerCount = (props.pagerCount - 1) / 2; // 当前页码按钮左右两边的页码数量（包括第一页最后一页）
  showPrevMore.value = false;
  showNextMore.value = false;
  if (pageCount.value > props.pagerCount) {
    if (currentPage > props.pagerCount - halfPagerCount) {
      showPrevMore.value = true;
    }
    if (currentPage < pageCount.value - halfPagerCount) {
      showNextMore.value = true;
    }
  }

  const array = [];
  if (showPrevMore.value && !showNextMore.value) {
    const startPage = pageCount.value - (props.pagerCount - 2);
    for (let i = startPage; i < pageCount.value; i++) {
      array.push(i);
    }
  } else if (!showPrevMore.value && showNextMore.value) {
    for (let i = 2; i < props.pagerCount; i++) {
      array.push(i);
    }
  } else if (showPrevMore.value && showNextMore.value) {
    const offset = Math.floor(props.pagerCount / 2) - 1; // 当前页码按钮左右两边的页码数量（不包括第一页最后一页）
    for (let i = currentPage - offset; i <= currentPage + offset; i++) {
      array.push(i);
    }
  } else {
    for (let i = 2; i < pageCount.value; i++) {
      array.push(i);
    }
  }
  return array;
});

const prevClick = () => {
  if (props.currentPage === 1) return;
  const newPage = getValidNewPage(props.currentPage - 1);
  emit('currentChange', newPage);
  emit('prevClick');
};
const nextClick = () => {
  if (props.currentPage === pageCount.value) return;
  const newPage = getValidNewPage(props.currentPage + 1);
  emit('currentChange', newPage);
  emit('nextClick');
};

const getValidNewPage = page => {
  if (page <= 1 || isNaN(page)) return 1;
  if (page >= pageCount.value) return pageCount.value;
  return Number(page);
};

const pagerClick = pager => {
  if (props.currentPage === pager) return;
  emit('currentChange', pager);
};

// export default {
//   props: {
//     total: {
//       type: Number,
//       default: 0
//     },
//     pageSize: {
//       type: Number,
//       default: 20
//     },
//     currentPage: {
//       type: Number,
//       default: 1
//     },
//     // 页码按钮的数量，包括第一页和最后一页，即实际中间的按钮数为pagerCount - 2
//     pagerCount: {
//       type: Number,
//       default: 7,
//       validator(val) {
//         return val % 2 === 1 && val > 4 && val < 22;
//       }
//     }
//   },
//   setup(props, ctx) {
//     return {
//       ...usePage(props, ctx)
//     };
//   }
// };
</script>

<style lang="scss" scoped>
.cxjPage {
  display: flex;
  font-weight: 700;
  white-space: nowrap;
  font-size: 13px;
  button {
    border: none;
    background-color: #fff;
    font-weight: 700;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
      color: var(--themeColor);
    }
    &:disabled {
      cursor: default;
      &:hover {
        color: rgba(16, 16, 16, 0.3);
      }
    }
  }
}
.cxjPage_pagerList {
  li {
    display: inline-block;
    cursor: default;
  }
  li[class^='cxjPage'] {
    padding: 0 4px;
    vertical-align: top;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    margin: 0;
    &:hover,
    &.active {
      color: var(--themeColor);
    }
    &.active {
      cursor: default;
    }
  }
}
</style>
