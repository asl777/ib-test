<template>
  <main class="content">
      <!-- hero section -->
      <section class="hero">
          <!-- text container -->
          <div class="hero-text-container">
            <div class="hero-text">
              <p>Mini loan</p>
              <h1><i>Take charge</i> of unexpected cost</h1>
              <p class="">Finance unforeseen expenses with Inbank. A quick and easy application process with an instant credit decision.</p>
              <button @click="scrollToSection" class="btn-filled-light mt-24">Apply now</button>
            </div>
          </div>
          <!-- image container -->
          <div class="hero-image-container">
            <img src="../assets/hero-image.png" alt="Man with dog in front of the washing machine">
          </div>
      </section>
      <!-- calculator section -->
      <section ref="sectionRefEl" class="calculator-container">
        <LoanCalculator/>
      </section>
  </main>
</template>

<script setup>
  import LoanCalculator from '../components/LoanCalculator.vue';
  import { ref } from 'vue'

  // scroll function to calc (hero-section apply button takes user to the calculator section)
  const sectionRefEl = ref(null);

  function scrollToSection() {
    if (sectionRefEl.value) {
      sectionRefEl.value.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<style scoped>
.hero {
  display: flex;
  gap: 24px;
  padding: 16px 40px 80px 40px;
  max-height: 839px;
  height: 100%;
}

.hero-image-container img {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 200px;
}

.hero-text-container {
  background-color: #D9D4A7;
  width: 100%;
  max-width: 592px;
  border-radius: 200px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 80px 40px 80px 40px;
}

.hero-text p + h1,
.hero-text h1 + p {
  margin-top: 16px;
}

.hero-text + p {
  font-weight: 500;
}

.hero-text h1 {
  margin: 0 auto;
  max-width: 512px;
  width: 100%;
}

.calculator-container {
  background-color: #E3D2FF;
  padding: 80px 40px 80px 40px;
}

@media (max-width: 1400px) {
  .hero-text-container {
    padding: 24px;
  }
  .hero-text-container,
  .hero-image-container img {
    border-radius: 100px;
  }
}

/* queries */
@media (max-width: 500px) {
  .hero {
    flex-direction: column-reverse;
    padding: 16px;
    height: unset;
    width: 90%;
  }
  .hero-image-container img {
    border-radius: 100px;
  }
  .hero-text-container {
    width: 95%;
    height: 416px;
    border-radius: 100px;
    padding: 24px 14px;
    max-width: unset;
  }
  .hero-text h1 {
    width: 280px;
  }
  .calculator-container {
    padding: 40px 16px;
  }
}
</style>
