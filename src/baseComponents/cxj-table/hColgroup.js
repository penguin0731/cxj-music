import { TABLE_INJECT_KEY } from './token';

export default defineComponent({
  name: 'hColgroup',
  setup() {
    const store = inject(TABLE_INJECT_KEY);
    const columns = computed(() => store.columns.value);
    const getPropsData = column => {
      return {
        key: column.prop,
        width: column.width,
        name: column.prop
      };
    };
    return () =>
      h(
        'colgroup',
        columns.value.map(column => h('col', getPropsData(column)))
      );
  }
});
