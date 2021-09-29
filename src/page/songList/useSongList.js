import { onMounted, reactive, toRefs } from 'vue';
import api from '@/api';
import nProgress from 'nprogress';

export default function useSongList(props) {
  const data = reactive({
    categories: [],
    sub: []
  });

  const getCatList = async () => {
    const res = await api.songlist.getCatList();
    data.sub = res.sub;
    const categories = res.categories;
    for (const key in categories) {
      const value = categories[key];
      data.categories[key] = value;
    }
  };

  const getSongList = async ({
    order = 'hot',
    cat = '全部',
    pageSize = 50,
    page
  } = {}) => {
    let params = {
      order,
      cat,
      limit: pageSize
    };
    page ? (params.offset = pageSize * page) : '';
    const res = await api.songlist.getSongList(params);
    console.log(res);
  };

  onMounted(async () => {
    await getCatList();
    await getSongList();
    nProgress.done();
  });

  return {
    ...toRefs(data)
  };
}
