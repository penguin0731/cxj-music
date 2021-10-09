<template>
  <div class="cxjMusicTable_box">
    <table class="cxjMusicTable">
      <thead>
        <tr class="cxjMusicTable_row">
          <th class="cxjMusicTable_serial__hd"></th>
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
          class="cxjMusicTable_row"
          v-for="(item, index) in index_dataSource"
          :key="(rowKey && item[rowKey]) || index"
        >
          <td class="cxjMusicTable_serial__bd">
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
          <div class="cxjMusicTable_list_menu" :style="{ ...menuStyle }">
            <slot
              name="list_menu"
              :item="{ row: item, $index: index, columns }"
            ></slot>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import useMusicTable from './useMusicTable';
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
    },
    menuStyle: {
      type: Object
    }
  },
  setup(props, ctx) {
    return {
      ...useMusicTable(props, ctx)
    };
  }
};
</script>

<style lang="less" scoped>
@serialWidth: 46px; // 序号的宽度
.cxjTable_box {
  box-sizing: border-box;
  font-size: 14px;
}
.cxjMusicTable {
  width: 100%;
  table-layout: fixed;
}
.cxjMusicTable_row {
  position: relative;
  height: 50px;
  line-height: 50px;
  display: flex;
  padding-left: @serialWidth;
  &:hover .cxjMusicTable_list_menu {
    display: flex;
  }
  .cxjMusicTable_list_menu {
    display: none;
    position: absolute;
    left: 40%;
    height: 50px;
    align-items: center;
  }
}
.cxjMusicTable_serial__hd,
.cxjMusicTable_serial__bd {
  position: absolute;
  left: 0;
  display: inline-block;
  width: @serialWidth;
  color: #999;
}
</style>
