<template>
  <nav-header></nav-header>
  <router-view></router-view>
  <player></player>
</template>

<script>
import NavHeader from '../components/nav-header/nav-header.vue'
import Player from '../components/player/player.vue'
export default {
  components: {
    NavHeader,
    Player,
  }
}
</script>

<style>

</style>