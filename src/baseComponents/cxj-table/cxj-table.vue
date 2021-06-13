<template>
  <div class="cxjTable_box">
    <table class="cxjTable">
      <thead>
        <tr class="cxjTable_row">
          <th class="cxjTable_serial__hd"></th>
          <th
            v-for="(item, index) in columns"
            :key="item.columnKey || index"
            :title="item.lable"
            :style="{
              width: item.width,
              minWidth: item.minWidth,
              textAlign: item.align || 'left'
            }"
          >
            <slot :name="item.slotHeader" :item="{ columns, $index: index }">
              <div class="ellipsis">{{ item.lable }}</div>
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="cxjTable_row"
          v-for="(item, index) in index_dataSource"
          :key="(rowKey && item[rowKey]) || index"
        >
          <td class="cxjTable_serial__bd">
            <span class="ml10">{{ item.c_index }}</span>
          </td>
          <td
            v-for="(_item, _index) in columns"
            :key="_item.columnKey || _index"
            :style="{
              width: _item.width,
              minWidth: _item.minWidth,
              textAlign: _item.align || 'left'
            }"
          >
            <slot
              :name="_item.slot"
              :item="{ row: item, $index: index, columns }"
            >
              <div class="ellipsis" style="width: 80%">
                {{ handleProp(item, _item.prop) }}
              </div>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import useTable from './useTable';
export default {
  props: {
    /**
     * columns: [
     *  {
     *    lable: string, // 表头名
     *    key: string, // 对应dataSource中的键值
     *    width: string, // 对应列的宽度
     *    minWidth: string, // 对应列最小宽度
     *    columnKey: string, // column的key
     *    align: string, // 对齐方式
     *    slotHeader: string, // 表头插槽名
     *    slot: string, // 表体插槽名
     *  }
     * ]
     */
    columns: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    rowKey: {
      type: String
    }
  },
  setup(props, ctx) {
    return {
      ...useTable(props, ctx)
    };
  }
};
</script>

<style lang="less" scoped>
.cxjTable_box {
  box-sizing: border-box;
  font-size: 14px;
}
.cxjTable {
  width: 100%;
}
.cxjTable_row {
  height: 50px;
  line-height: 50px;
  padding-left: 46px;
}
.cxjTable_serial__hd,
.cxjTable_serial__bd {
  display: inline-block;
  width: 46px;
  color: #999;
}
</style>