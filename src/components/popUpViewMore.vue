<script setup>
import { VueFinalModal } from 'vue-final-modal'

const emit = defineEmits(['confirm'])

const props = defineProps({
  hotel: {
    type: Object,
    // required: true
  }
})
</script>

<template>
  <VueFinalModal
    class="flex h-full w-full items-center justify-center p-4"
    content-class="relative bg-white border w-full h-fit max-w-[500px] rounded-2xl shadow-2xl overflow-hidden"
    overlay-class="bg-black/60 backdrop-blur-sm"
    :overlayTransition="'vfm-fade'"
    :contentTransition="'vfm-fade'"
    :clickToClose="true"
    @click-outside="emit('confirm')"
  >
    <!-- Hotel Image -->
    <img
      :src="hotel.urls?.small"
      alt="Hotel Image"
      class="rounded-lg shadow-md mb-4 object-cover w-full h-48 sm:h-60 md:h-72"
    />

    <!-- Hotel Title -->
    <h2 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight text-center px-2">
      {{ hotel.alt_description || 'Luxury Hotel' }}
    </h2>

    <!-- Hotel Short Desc -->
    <p class="text-gray-600 text-sm sm:text-base leading-relaxed mb-3 max-h-[120px] overflow-y-auto px-4 text-center">
      {{ hotel.description || 'Experience exceptional comfort and service in our beautifully appointed rooms with stunning views.' }}
    </p>

    <!-- Info Section -->
    <div class="text-center max-w-xl mx-auto space-y-6 px-4">
      <div class="flex flex-wrap items-center justify-center gap-4 text-gray-500 text-xs sm:text-sm">
        <span class="flex items-center gap-1"> 🏨 <span>4.5 Stars</span></span>
        <span class="flex items-center gap-1"> 📍 <span>City Center</span></span>
      </div>

      <p class="text-gray-700 text-sm sm:text-base leading-relaxed">
        At Dre Hotel, we pride ourselves on delivering exceptional comfort, impeccable service, and unforgettable experiences.
      </p>

      <!-- Likes -->
      <div class="flex items-center justify-center gap-2 text-red-600 font-semibold text-base sm:text-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 sm:h-6 sm:w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="none"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
               2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
               C13.09 3.81 14.76 3 16.5 3 
               19.58 3 22 5.42 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
        <span class="block text-gray-500 text-xs sm:text-sm italic">
          {{ hotel.likes }}
        </span>
      </div>
    </div>
  </VueFinalModal>
</template>