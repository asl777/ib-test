<template>
  <div class="payment-calculator">
    <!-- calculator text container -->
    <div class="calc-txt-container">
      <div class="calc-txt">
        <p class="text-big">Calculate <i>your monthly payment</i></p>
        <p>Estimate your monthly payments based on the chosen loan amount and time period.</p>
      </div>
    </div>
    <div id="divider"></div>
    <!-- calculator slider container -->
    <div class="calc-sldr-container">
      <!-- amount slider -->
      <div class="range-slider">
        <div class="slider-container">
          <input
            type="range"
            id="amount"
            min="300"
            max="7200"
            v-model="amount"
            :style="{
              '--val': ((amount - 300) / (7200 - 300)) * 100 + '%'
            }"
          />
          <div class="slider-values">
            <span class="min">{{ formatCurrency(300) }}</span>
            <span class="max">{{ formatCurrency(7200) }}</span>
          </div>
        </div>
        <div class="input-container">
          <label for="amount">Amount</label>
          <input id="amount" type="number" min="300" max="7200" v-model="amount" placeholder="500"/>
        </div>
      </div>
      <!-- period slider -->
      <div class="range-slider">
        <div class="slider-container">
            <input
              type="range"
              id="period"
              min="2"
              max="72"
              v-model="period"
              :style="{
              '--val': ((period - 2) / (72 - 2)) * 100 + '%'
              }"
            />
          <div class="slider-values">
            <span class="min">2 months</span>
            <span class="max">72 months</span>
          </div>
        </div>
        <div class="input-container">
          <label for="period">Period</label>
          <select id="period" class="slider-input" v-model="period">
            <option v-for="month in months" :key="month" :value="month">
              {{ month }} months
            </option>
          </select>
        </div>
      </div>

      <div class="payment-display">
        <p>Monthly payment</p>
        <p class="text-big">{{ calculateMonthlyPayment() }}</p>
      </div>

      <button id="applyNow" class="btn-filled-accent" @click="openModal">Apply now</button>

      <p class="disclaimer">
        The calculation is approximate and may differ from the conditions offered to you. Please submit a loan application to receive a personal offer. Financial services are provided by AS Inbank Finance.
      </p>
    </div>
  </div>
  <!-- modal with form -->
  <Modal :mainText="'Personal details'" :isVisible="isModalVisible" @close="closeModal">
    <form @submit.prevent="validateAndSubmit" class="personal-details-form">
      <div class="input-group">
        <input
          type="text"
          placeholder="First name"
          v-model="firstName"
        />
        <span v-if="errors.firstName" class="error">{{ errors.firstName }}</span>
      </div>
      <div class="input-group">
        <input
          type="text"
          placeholder="Last name"
          v-model="lastName"
        />
        <span v-if="errors.lastName" class="error">{{ errors.lastName }}</span>
      </div>
      <div class="input-group">
        <input
          type="tel"
          placeholder="Mobile"
          v-model="mobile"
        />
        <span v-if="errors.mobile" class="error">{{ errors.mobile }}</span>
      </div>
      <div class="input-group">
        <input
          type="email"
          placeholder="E-mail"
          v-model="email"
        />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </div>
      <div class="input-group">
        <input
          type="number"
          placeholder="Monthly income"
          v-model="monthlyIncome"
        />
        <span v-if="errors.monthlyIncome" class="error">{{ errors.monthlyIncome }}</span>
      </div>

      <button type="submit" class="btn-filled-accent">Submit</button>
    </form>
  </Modal>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Modal from '../components/ModalTemplate.vue';

  // modal properties
  const isModalVisible = ref(false);
  // loan calculation
  const amount = ref(500); // default amount
  const period = ref(48); // default period
  const months = Array.from({ length: 71 }, (_, i) => i + 2); // range from 2 to 72 months

  // calculate monthly amount
  const calculateMonthlyPayment = () => {
    const interestRate = 1.3; // hypothetical interest rate for this loan
    // formula: (amount * interest) / months
    return ((amount.value * interestRate) / (period.value)).toFixed(2) + '€';
  };

  // format the number, add currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US').format(value) + '€';
  };

  // open and close modal
  const openModal = () => {
    isModalVisible.value = true;
  };

  const closeModal = () => {
    isModalVisible.value = false;
  };

  // form state
  const firstName = ref('');
  const lastName = ref('');
  const mobile = ref('');
  const email = ref('');
  const monthlyIncome = ref('');

  // error state
  const errors = ref({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    monthlyIncome: '',
  });

  // for redirect
  const router = useRouter();

  //form validation
  const validateAndSubmit = () => {
    // Reset errors
    errors.value = {
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      monthlyIncome: '',
    };

    let hasErrors = false;

    // first name validation
    if (!firstName.value) {
      errors.value.firstName = 'First name is required';
      hasErrors = true;
    }

    // last name validation
    if (!lastName.value) {
      errors.value.lastName = 'Last name is required';
      hasErrors = true;
    }

    // mobile number validation
    const mobileRegex = /^55\d{5,6}$/;
    if (!mobileRegex.test(mobile.value)) {
      errors.value.mobile = 'Mobile number must start with "55" and be 7 or 8 digits long';
      hasErrors = true;
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      errors.value.email = 'Please enter a valid email address';
      hasErrors = true;
    }

    // monthly income validation
    if (monthlyIncome.value <= 100) {
      errors.value.monthlyIncome = 'Monthly income must be greater than 100';
      hasErrors = true;
    }

    if (!hasErrors) {
      const monthlyPayment = calculateMonthlyPayment();

      const targetRoute = monthlyIncome.value > 1000 ? '/positive-decision' : '/negative-decision';

      // pass data to next page
      router.push({
        path: targetRoute,
        query: {
          loanAmount: amount.value,
          period: period.value,
          monthlyPayment: monthlyPayment,
          name: firstName.value
        },
      });
    }
  };

</script>

<style scoped>
  .payment-calculator {
    display: flex;
    gap: 40px;
    max-width: 1536px;
    margin: auto;
  }

  #divider {
    height: 424px;
    width: 1px;
    background-color: rgba(33, 9, 58, 0.15);
  }

  .calc-txt-container {
    margin: auto auto;
    text-align: center;
    padding: 40px;
    width: 607px;
  }

  .calc-sldr-container {
    width: 680px;
  }

  .calc-txt p + p {
    margin-top: 16px;
  }

  .calc-txt .text-big {
    padding: 0 90px;
  }

  .input-container input,
  .input-container select {
    width: 160px;
  }

  .range-slider + .range-slider {
    margin-top: 40px;
  }

  .payment-display {
    margin-top: 40px;
    margin-bottom: 24px;
    text-align: center;
  }

  #applyNow {
    width: 109px;
    display: block;
    margin: 0 auto;
  }

  .personal-details-form button,
  .personal-details-form {
    margin-top: 24px;
  }

  .personal-details-form .input-group + .input-group {
    margin-top: 16px;
  }

  .disclaimer {
    font: 400 12px/16px "Inter";
    color: rgba(33, 9, 58, 0.6);
    margin-top: 24px;
  }

  /* queries */
  @media (max-width: 1400px) {
    .calc-txt-container {
      padding: 20px;
    }
    .calc-txt .text-big {
      padding: 0 10px;
    }
  }

  @media (max-width: 500px) {
    .payment-calculator {
      flex-direction: column;
    }

    .calc-txt-container {
      text-align: left;
      width: 100%;
      margin: unset;
      padding: unset;
    }

    .calc-txt .text-big {
      padding: unset;
    }

    #divider {
      display: none;
    }

    .input-container select,
    .input-container input:not([type="range"]),
    .input-container,
    .calc-sldr-container {
      width: 100%;
    }
  }
</style>
