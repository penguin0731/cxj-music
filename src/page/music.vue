<template>
  <nav-header></nav-header>
  <router-view></router-view>
</template>

<script>
import navHeader from '@/components/nav-header/nav-header.vue'
export default {
  components: {
    navHeader
  }
}
</script>

<style>

</style>