import hColgroup from '../hColgroup';
import { TABLE_INJECT_KEY } from '../token';

export default defineComponent({
  name: 'TableHeader',
  setup() {
    const store = inject(TABLE_INJECT_KEY);
    const columns = computed(() => store.columns.value);

    return () =>
      h('table', { class: 'cxj-table__header' }, [
        h(hColgroup),
        h(
          'thead',
          {},
          columns.value.map((column, cellIndex) =>
            h('th', { class: 'cxj-table__cell' }, [
              h('div', { class: 'cell' }, column.label)
            ])
          )
        )
      ]);
  }
});
