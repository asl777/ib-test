<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <p>{{ mainText }}</p>
        <button class="close-button" @click="closeModal">
          <img src="../assets/cross.svg" alt="close icon"/>
        </button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits } from 'vue';

  const props = defineProps({
    isVisible: Boolean,
    mainText: String,
  });

  const emit = defineEmits(['close']);

  const closeModal = () => {
    emit('close');
  };
</script>

<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background: rgba(255, 255, 255, 1);
    padding: 40px;
    border-radius: 30px;
    max-width: 540px;
    width: 100%;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-header p {
    font: 500 20px/28px "Inter";
  }

  .close-button {
    border: none;
    background: transparent;
    cursor: pointer;
  }

  /* queries */
  @media (max-width: 500px) {
    .modal-overlay {
      align-items: flex-end;
      justify-content: flex-end;
    }

    .modal-content {
      padding: 24px;
      border-radius: 30px 30px 0 0;
      max-width: 490px;
    }
  }
</style>
