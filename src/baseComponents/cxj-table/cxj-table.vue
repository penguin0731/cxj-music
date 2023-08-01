<template>
  <div class="cxj-table">
    <div class="cxj-table__inner-wrapper">
      <!-- 隐藏列：容纳cxj-table-column -->
      <div class="hide-columns">
        <slot></slot>
      </div>
      <!-- 表头 -->
      <div class="cxj-table__header-wrapper">
        <table-header />
      </div>
      <!-- 表体 -->
      <div class="cxj-table__body-wrapper">
        <table-body />
      </div>
    </div>
  </div>
</template>

<script setup>
import TableHeader from './table-header';
import TableBody from './table-body';
import useTableStore from './store';
import { provide, watch } from 'vue';
import NProgress from 'nprogress';
import { TABLE_INJECT_KEY } from './token';

const props = defineProps({
  data: {
    type: Array,
    default: []
  }
});
const store = useTableStore();
provide(TABLE_INJECT_KEY, store);

watch(
  () => props.data,
  newData => {
    store.setData(newData);
  },
  {
    immediate: true
  }
);

NProgress.done();
</script>

<style lang="scss">
.cxj-table {
  width: 100%;
  overflow: hidden;
  position: relative;
  color: #606266;
  .hide-columns {
    visibility: hidden;
    position: absolute;
    z-index: -1;
  }
  table {
    width: 100%;
  }
  thead {
    color: #909399;
  }
  .cxj-table__cell {
    padding: 8px 0;
    box-sizing: border-box;
    vertical-align: middle;
    user-select: none;
    text-align: center;
  }
  .cell {
    padding: 0 12px;
  }
}

.cxj-table__inner-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* 表头 */
.cxj-table__header-wrapper {
  .cxj-table__header {
    table-layout: fixed;
    th {
      color: #515a6e;
      background-color: #f8f8f9;
      height: 40px;
      font-size: 13px;
    }
  }
}

/* 表体 */
.cxj-table__body-wrapper {
  flex: 1;
  .cxj-table__body {
    table-layout: fixed;
  }
}
</style>
