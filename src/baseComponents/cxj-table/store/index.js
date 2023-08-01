export default function useTableStore() {
  //   const state = reactive({
  //     data: null,
  //     columns: []
  //   });
  //   const readState = readonly(state);
  const data = ref(null);
  const columns = ref([]);

  const setData = d => {
    // state.data = data;
    data.value = d;
  };

  const insertColumn = column => {
    // state.columns.push(column);
    columns.value.push(column);
  };

  return {
    // ...state,
    data,
    columns,
    setData,
    insertColumn
  };
}
