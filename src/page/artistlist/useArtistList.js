import { onMounted, reactive, toRefs } from 'vue';
import api from '@/api';
import nProgress from 'nprogress';
import { enMap, getListTypeMap, getListAreaMap } from '@/api/artistlist';

const enEntries = Object.entries(enMap);
const getListTypeEntries = Object.entries(getListTypeMap);
const getListAreaEntries = Object.entries(getListAreaMap);
export default function useArtistList(props) {
  const data = reactive({
    enEntries,
    getListTypeEntries,
    getListAreaEntries,
    artists: [], // 歌手列表
    curEn: -1,
    curType: -1,
    curArea: -1,
    page: 1,
    pageSize: 50
  });

  const getArtistList = async () => {
    const res = await api.artistlist.getList({
      initial: data.curEn,
      type: data.curType,
      area: data.curArea,
      pageSize: data.pageSize,
      page: data.page
    });
    data.artists = res.artists;
  };

  const changeEn = en => {
    data.curEn = en;
  };

  const changeType = type => {
    data.curType = type;
  };

  const changeArea = area => {
    data.curArea = area;
  };

  onMounted(async () => {
    await getArtistList();
    nProgress.done();
  });

  return {
    ...toRefs(data),
    changeEn,
    changeType,
    changeArea
  };
}
