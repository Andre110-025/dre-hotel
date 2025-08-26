<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    class="w-16 h-16"
  >
    <!-- Roof triangle -->
    <path d="M10 60 L50 25 L90 60 Z" fill="#911b1b" />

    <!-- Pillars under the rooftop -->
    <rect x="20" y="60" width="6" height="20" fill="#911b1b" />
    <rect x="37" y="60" width="6" height="20" fill="#911b1b" />
    <rect x="54" y="60" width="6" height="20" fill="#911b1b" />
    <rect x="71" y="60" width="6" height="20" fill="#911b1b" />

    <!-- Floor base -->
    <rect x="15" y="80" width="70" height="10" fill="#911b1b" />
  </svg>
</template>

<script setup>
defineProps({
  size: { type: String, default: '' }
});
</script>
