<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <header>
    <img src="./assets/logo.svg" alt="Inbank logo" />
  </header>

  <RouterView />
</template>

<style scoped>
/* header styles */
header {
  padding: 24px 40px 24px 40px;
}

@media (max-width: 500px) {
  header {
    padding: 16px;
  }
  header img {
    height: 40px;
  }
}
</style>
