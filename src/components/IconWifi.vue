<template>
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      class="w-16 h-16"
    >
      <!-- Outer arc -->
      <path
        d="M20 55 Q50 25 80 55"
        :stroke="color"
        stroke-width="6"
        stroke-linecap="round"
      />
      <!-- Middle arc -->
      <path
        d="M30 65 Q50 45 70 65"
        :stroke="color"
        stroke-width="6"
        stroke-linecap="round"
      />
      <!-- Inner arc -->
      <path
        d="M40 75 Q50 65 60 75"
        :stroke="color"
        stroke-width="6"
        stroke-linecap="round"
      />
      <!-- Dot -->
      <circle cx="50" cy="85" r="4" :fill="color" />
    </svg>
  </template>
  
  <script setup>
  defineProps({
    size: { type: String, default: '' },
    color: { type: String, default: '#911b1b' } // a clean, friendly blue
  });
  </script>
  
  <style scoped>
  </style>
  