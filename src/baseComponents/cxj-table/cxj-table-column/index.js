import { TABLE_INJECT_KEY } from '../token';
import { isVNode } from 'vue';
export default defineComponent({
  name: 'CxjTableColumn',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    prop: {
      type: String
    },
    label: {
      type: String
    },
    width: {
      type: [String, Number]
    }
  },
  setup(props, { slots }) {
    const store = inject(TABLE_INJECT_KEY);
    let column = {
      ...props,
      renderCell: null,
      defaultWidth: 80
    };
    onMounted(() => {
      // 接受一个对象，里面存储了源数据和数据索引
      column.renderCell = data => {
        let _renderCell = null;
        // 每一个slots对象中的插槽都是返回vnodes数组的函数
        if (slots.default) {
          // 将data传递给默认插槽
          // 相当于<slot name="default" :row="data.row" :$index="data.$index"></slot>
          _renderCell = () => slots.default(data);
        } else {
          _renderCell = () => {
            const { row } = data;
            return row[column.prop];
          };
        }
        return h('div', { class: 'cell' }, _renderCell());
      };
      if (column.width !== undefined) {
        column.width = Number.parseInt(column.width, 10);
        if (Number.isNaN(column.width)) {
          column.width = column.defaultWidth;
        }
      } else {
        column.width = column.defaultWidth;
      }
      store.insertColumn(column);
    });
  },
  render() {
    return h('div');
  }
});
