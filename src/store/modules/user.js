import { defineStore } from 'pinia';
import { getUid } from '@/utils/storage';

const useUserStore = defineStore('app', {
  state: () => ({
    Uid: getUid() || '' // 用户id
  }),
  actions: {}
});

export default useUserStore;
