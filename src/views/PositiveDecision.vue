<template>
  <div class="approved-container">
    <img src="../assets/loan-positive.png" alt="drawing of a man and a pile of furniture"/>
    <div class="decision-txt-container">
        <h1><i>Good</i> news!</h1>
        <p>Your loan has been approved.</p>
      <div class="loan-info">
        <div class="row">
          <div>Loan amount</div>
          <div>{{ loanAmount }} €</div>
        </div>
        <div class="row">
          <div>Loan period</div>
          <div>{{ period }} months</div>
        </div>
        <div class="row">
          <div>Monthly payment</div>
          <div>{{ monthlyPayment }} €</div>
        </div>
      </div>
      <RouterLink to="/"><button class="btn-filled-accent">Back to home page</button></RouterLink>
    </div>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  const route = useRoute();

  // reading the values through router
  const loanAmount = route.query.loanAmount;
  const period = route.query.period;
  const monthlyPayment = route.query.monthlyPayment;
</script>

<style scoped>
  /* container styles for positive decision */
  .approved-container {
    width: 1200px;
    margin: 40px auto 0;
    background: linear-gradient(
      to right,
      #0000000A 0%,
      #0000000A 50%,
      #ffffff 50%,
      #ffffff 100%
    );
    border-radius: 20px;
    display: flex;
  }

  .approved-container img {
    transform: translate(60px, 0px);
  }

  /* loan info */
  .loan-info {
    margin-bottom: 40px;
  }

  .loan-info .row {
    width: 100%;
    text-align: left;
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 12px 0;
  }

  .loan-info .row div:first-child {
    font: 500 16px/24px "Inter";
    width: 180px;
  }

  .loan-info .row div:last-child {
    font: 400 16px/24px "Inter";
  }

  /* dividers */
  .row:last-child {
    border-bottom: 1px solid rgba(33, 9, 58, 0.15);
  }

  .row:first-child {
    border-top: 1px solid rgba(33, 9, 58, 0.15);
  }

  .row + .row {
    border-top: 1px solid rgba(33, 9, 58, 0.15);
  }

  /* queries */
  @media (max-width: 500px) {
    .approved-container {
      flex-direction: column;
      justify-content: center;
      background: white;
      margin: 0;
      width: 100%;
    }
    .approved-container img {
      width: fit-content;
      content: url("../assets/mobileImg.png");
    }
    h1 {
      font-size: 32px;
      line-height: 36px;
    }
    .decision-txt-container {
      width: 92%;
    }
  }
</style>
