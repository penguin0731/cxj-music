import axios from '@/utils/axios';

export const enMap = {
  全部: -1,
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
  F: 'F',
  G: 'G',
  H: 'H',
  I: 'I',
  J: 'J',
  K: 'K',
  L: 'L',
  M: 'M',
  N: 'N',
  O: 'O',
  P: 'P',
  Q: 'Q',
  R: 'R',
  S: 'S',
  T: 'T',
  U: 'U',
  V: 'V',
  W: 'W',
  X: 'X',
  Y: 'Y',
  Z: 'Z',
  '#': 0
};

// 获取歌手分类列表入参type枚举
export const getListTypeMap = {
  全部: -1,
  男歌手: 1,
  女歌手: 2,
  乐队: 3
};

// 获取歌手分类列表入参area枚举
export const getListAreaMap = {
  全部: -1,
  华语: 7,
  欧美: 96,
  日本: 8,
  韩国: 16,
  其他: 0
};

export default {
  /**
   * 获取歌手分类列表
   * @param {*} initial 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传0
   * @param {*} type -1:全部，1:男歌手，2:女歌手，3:乐队
   * @param {*} area -1:全部，7:华语，96:欧美，8:日本，16:韩国，0:其他
   * @param {*} pageSize 返回数量
   * @param {*} page 页码
   */
  getList({ initial = 0, type, area, pageSize = 30, page }) {
    let params = {
      initial,
      limit: pageSize,
      offset: page - 1 ? pageSize * (page - 1) : 0
    };
    const getListTypeArr = Object.values(getListTypeMap);
    const getAreaTypeArr = Object.values(getListAreaMap);
    getListTypeArr.includes(type) ? (params.type = type) : '';
    getAreaTypeArr.includes(area) ? (params.area = area) : '';
    return axios({
      url: '/artist/list',
      params
    });
  }
};
