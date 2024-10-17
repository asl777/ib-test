<template>
  <div class="declined-container">
    <div class="decision-txt-container">
      <h1><i>Dear</i> {{ name }}</h1>
      <p>Unfortunately, your loan was denied.</p>
      <div class="row">
        <div>In addition to your income and expenses, a number of other factors play a role in loan decisions.</div>
      </div>
      <RouterLink to="/"><button class="btn-filled-accent">Exit</button></RouterLink>
    </div>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  const route = useRoute();

  // value through router
  const name = route.query.name;
</script>

<style scoped>
  /* container styles + modified existing styles to match this page */
  .declined-container {
    width: 792px;
    height: 450px;
    display: block;
    margin: auto;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
  }

  .decision-txt-container {
    width: unset;
    padding: 80px 204px;
  }

  .row {
    padding: 16px;
    text-align: center;
    border-bottom: 1px solid rgba(33, 9, 58, 0.15);
    border-top: 1px solid rgba(33, 9, 58, 0.15);
    margin-bottom: 40px;
    font: 400 14px/20px "Inter";
  }

  .decision-txt-container p {
    margin-bottom: 40px;
  }

  /* queries */
  @media (max-width: 500px) {
    .decision-txt-container {
      width: 90%;
      padding: 16px;
    }
    .declined-container {
      width: 100%;
    }
  }
</style>
