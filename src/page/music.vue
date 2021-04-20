<template>
  <nav-header></nav-header>
  <router-view></router-view>
  <player></player>
</template>

<script>
import NavHeader from '../components/nav-header/nav-header.vue'
import Player from '../components/player/player.vue'
import { useStore } from 'vuex'
import mockList from '../mock'
export default {
  components: {
    NavHeader,
    Player,
  },
  setup() {
    const store = useStore();
    store.commit('setPlayList', mockList);
  }
}
</script>

<style>

</style>