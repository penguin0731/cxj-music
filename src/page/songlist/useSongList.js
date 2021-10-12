import { onMounted, reactive, toRefs, watch } from 'vue';
import api from '@/api';
import nProgress from 'nprogress';

export default function useSongList(props) {
  const data = reactive({
    categories: [], // 歌单标签分类
    sub: [], // 所有歌单标签
    showTagBox: false, // 歌单标签显示
    curOrder: 'hot', // 当前歌单列表状态（new/hot）
    curTitle: '全部歌单', // 当前选中标签
    songlist: [], // 歌单列表
    currentPage: 1, // 当前歌单页数
    total: 0 // 歌单总数
  });

  watch(
    [() => data.curOrder, () => data.curTitle, () => data.currentPage],
    ([newOrder, newCat, newPage]) => {
      const cat = newCat === '全部歌单' ? '全部' : newCat;
      const params = {
        order: newOrder,
        cat
      };
      newPage ? (params.page = newPage) : '';
      console.log(params);
      getSongList(params);
    }
  );

  // 获取歌单标签
  const getCatList = async () => {
    const res = await api.songlist.getCatList();
    data.sub = res.sub;
    const categories = res.categories;
    for (const key in categories) {
      const value = categories[key];
      data.categories[key] = value;
    }
  };

  // 获取相应歌单
  const getSongList = async ({
    order,
    cat = '全部',
    pageSize = 50,
    page
  } = {}) => {
    let params = {
      order,
      cat,
      limit: pageSize
    };
    page ? (params.page = page) : '';
    const res = await api.songlist.getSongList(params);
    console.log(res);
    data.songlist = res.playlists;
    data.total = res.total;
  };

  // 切换歌单标签状态
  const toggleOrder = newOrder => {
    if (newOrder === data.curOrder) return;
    data.curOrder = newOrder;
  };

  // 展示歌单标签盒子
  const handleShowTagBox = () => {
    data.showTagBox = !data.showTagBox;
  };

  // 歌单标签盒子外部点击
  const handleClickOutSide = () => {
    data.showTagBox = data.showTagBox && false;
  };

  // 修改歌单标签
  const handleChangeTag = tag => {
    data.curTitle = tag;
    data.showTagBox = false;
  };

  const currentChange = newPage => {
    data.currentPage = newPage;
  };

  onMounted(async () => {
    await getCatList();
    await getSongList();
    nProgress.done();
  });

  return {
    ...toRefs(data),
    toggleOrder,
    handleShowTagBox,
    handleClickOutSide,
    handleChangeTag,
    currentChange
  };
}
