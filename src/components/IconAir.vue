<template>
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      class="w-16 h-16"
    >
      <!-- Airplane icon above -->
      <path
        d="M50 15 L53 30 L65 35 L53 37 L50 45 L47 37 L35 35 L47 30 Z"
        :fill="color"
      />
  
      <!-- Car body -->
      <rect x="25" y="60" width="50" height="15" rx="3" :fill="color" />
      <rect x="30" y="55" width="40" height="10" rx="2" :fill="color" />
  
      <!-- Car wheels -->
      <circle cx="35" cy="77" r="5" fill="#911b1b" />
      <circle cx="65" cy="77" r="5" fill="#911b1b" />
    </svg>
  </template>
  
  <script setup>
  defineProps({
    size: { type: String, default: '100' },
    color: { type: String, default: '#911b1b' }
  });
  </script>
  
  <style scoped>
 
  </style>
  