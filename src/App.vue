<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <header>
    <img src="./assets/logo.svg" alt="Inbank logo" />
  </header>

  <RouterView />
</template>

<style scoped>
header {
  width: 100%;
  padding: 24px 40px 24px 40px;
}

@media (min-width: 1024px) {
}
</style>
