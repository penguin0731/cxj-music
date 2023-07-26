<template>
  <nav-header></nav-header>
  <router-view></router-view>
  <player></player>
</template>

<script setup>
import NavHeader from './components/nav-header/nav-header.vue';
import Player from './components/player/player.vue';
import useMusicStore from '@/store/modules/music';
import mockList from './mock';

const useMusic = useMusicStore();
useMusic.playList = mockList;
// export default {
//   components: {
//     NavHeader,
//     Player
//   },
//   setup() {
//     const store = useStore();
//     store.commit('setPlayList', mockList);
//   }
// };
</script>

<style></style>
