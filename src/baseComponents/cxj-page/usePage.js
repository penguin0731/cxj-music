import { reactive, computed, toRefs } from 'vue';

export default function usePage(props, { emit }) {
  let data = reactive({
    showPrevMore: false,
    showNextMore: false
  });
  const pageCount = computed(() => Math.ceil(props.total / props.pageSize));
  const pagers = computed(() => {
    const currentPage = props.currentPage;
    const halfPagerCount = (props.pagerCount - 1) / 2; // 当前页码按钮左右两边的页码数量（包括第一页最后一页）
    data.showPrevMore = false;
    data.showNextMore = false;
    if (pageCount.value > props.pagerCount) {
      if (currentPage > props.pagerCount - halfPagerCount) {
        data.showPrevMore = true;
      }
      if (currentPage < pageCount.value - halfPagerCount) {
        data.showNextMore = true;
      }
    }

    const array = [];
    if (data.showPrevMore && !data.showNextMore) {
      const startPage = pageCount.value - (props.pagerCount - 2);
      for (let i = startPage; i < pageCount.value; i++) {
        array.push(i);
      }
    } else if (!data.showPrevMore && data.showNextMore) {
      for (let i = 2; i < props.pagerCount; i++) {
        array.push(i);
      }
    } else if (data.showPrevMore && data.showNextMore) {
      const offset = Math.floor(props.pagerCount / 2) - 1; // 当前页码按钮左右两边的页码数量（不包括第一页最后一页）
      for (let i = currentPage - offset; i <= currentPage + offset; i++) {
        array.push(i);
      }
    } else {
      for (let i = 2; i < pageCount; i++) {
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

  return {
    ...toRefs(data),
    pageCount,
    pagers,
    prevClick,
    nextClick,
    pagerClick
  };
}
