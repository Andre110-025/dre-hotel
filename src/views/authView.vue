<script setup>
import { RouterView } from "vue-router"
import Logo from "@/components/Logo.vue";
</script>

<template>
  <main class="min-h-dvh h-dvh flex">
    <div class="flex-1 min-h-full w-1/2 relative bg-cover hidden md:block" style="background-image: url('/hotel.jpg')">
  <div class="absolute inset-0 bg-black/20" />
  
  <!-- Hero Content -->
  <div class="inset-5 h-full flex flex-col items-start justify-center text-white px-10">
    <h2 class="text-white text-[40px] font-bold leading-tight">
      Welcome to Dre Hotel
    </h2>
    <p class="text-white mt-6 text-md leading-relaxed">
      Luxury and comfort at your fingertips. Book your stay, manage your reservations, 
      and experience five-star convenience.
    </p>
  </div>
</div>

    <!-- Right Side: Auth Forms -->
    <div class="flex-1 flex flex-col items-center justify-center bg-white min-h-full">
      <Logo class="-mt-[30px] w-20" />
      <RouterView />
    </div>
  </main>
</template>

