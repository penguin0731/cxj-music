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

<script>
import usePage from './usePage';
export default {
  props: {
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
  },
  setup(props, ctx) {
    return {
      ...usePage(props, ctx)
    };
  }
};
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
