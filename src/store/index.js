import { createStore } from "vuex";
import common from './common';
import recommend from '@/page/recommend/store';

export default createStore({
  modules: {
    common,
    recommend,
  }
})