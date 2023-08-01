import hColgroup from '../hColgroup';
import { TABLE_INJECT_KEY } from '../token';

export default defineComponent({
  name: 'TableBody',
  setup() {
    const store = inject(TABLE_INJECT_KEY);
    const data = computed(() => store.data.value);
    const columns = computed(() => store.columns.value);
    return () =>
      h('table', [
        h(hColgroup),
        h(
          'tbody',
          data.value.map((row, $index) =>
            h(
              'tr',
              columns.value.map(column =>
                h('td', { class: 'cxj-table__cell' }, [
                  // 传递源数据、数据索引给渲染列函数
                  column.renderCell({ row, $index })
                ])
              )
            )
          )
        )
      ]);
  }
});
