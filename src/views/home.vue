<script setup>
import ChooseUs from '@/components/chooseUs.vue';
import FooterView from '@/components/footerView.vue';
import RoomCards from '@/components/roomCards.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'

const heroImages = ref([
  '/standardRoom.png',
  '/presidoSuite.jpg',
  '/windowView.jpg',
  '/nightView.jpg'
])

const heroText = ref([
  "Where comfort meets elegance. Indulge in premium hospitality, crafted for your peace of mind, right in the heart of the city.",
  "Experience the height of luxury in our Presidential Suite — where prestige, privacy, and comfort come together.",
  "Wake up to breathtaking skyline views and unwind in a space designed for modern sophistication.",
  "Every detail, every touch — curated to give you a stay that feels as good as home, only better."
])

const textTwo = ref([
  'At Dre Hotel, we believe luxury goes beyond elegant spaces — it’s the feeling of being truly cared for. From your first step through our doors to the final farewell, every detail is designed with intention. Indulge in the calm of our serene spa, sip cocktails with a skyline view, or simply sink into the comfort of our signature suites. This is more than a stay. It’s an experience. A lifestyle. A moment you will return to.'
]);

let slideId = null
const currentSlide = ref(0)

const startSlide = () => {
  slideId = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % heroImages.value.length
  }, 9000);
}

onMounted(() => {
  if(heroImages.value.length > 0) startSlide()
})

onBeforeUnmount(() => {
  clearInterval(slideId)
})
</script>

<template>
  <section class="h-[90vh] relative">
    <transition-group  name="cinematic" mode="out-in" >
      <div
        v-for="(img, index) in heroImages"
        :key="img"
        v-show="currentSlide === index"
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${img})` }"
      >
        <div class="absolute inset-0 bg-[#000000]/50"></div>
        <div class="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 space-y-6">
          <h1 class="font-handwritten text-5xl sm:text-5xl md:text-6xl text-white">
            Welcome to Dre-Hotel
          </h1>
          <p class="text-lg sm:text-xl max-w-xl font-medium leading-relaxed text-center sm:text-left">
            <span
              v-for="(word, index) in heroText[currentSlide].split(' ')"
              :key="index"
              class="inline-block opacity-0 translate-y-3 animate-wordSlide"
              :style="`animation-delay: ${index * 150}ms`"
            >
              {{ word }}&nbsp;
            </span>
          </p>
          <RouterLink 
            to="/suites"
            class="bg-mainColor text-white py-3 px-6 rounded-xl text-lg font-semibold shadow-md transition hover:scale-105"
          >
            Book Now
          </RouterLink>
        </div>
      </div>
    </transition-group>
  </section>

  <div class="py-16 px-6 sm:px-12 lg:px-24">
    <div class="text-center">
      <h2 class="font-handwritten text-4xl sm:text-5xl font-normal text-textColor mb-4 tracking-wide">
        The Dre Experience
      </h2>
      <p class="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed italic">
        {{ textTwo[0] }}
      </p>
    </div>
  </div>

  <div>
    <RoomCards />
  </div>

  <div>
    <ChooseUs />
  </div>

 <div class="hidden sm:flex justify-center py-12">
  <section class="relative w-[85%] max-w-[1000px] rounded-2xl overflow-hidden shadow-2xl">
    <video
      autoplay
      muted
      loop
      playsinline
      class="w-full h-full object-cover"
      src="/videos/tourVid.mp4"
    ></video>

    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent"></div>

    <div class="absolute inset-0 flex items-center justify-center text-center px-6">
      <div class="max-w-2xl">
        <h2 class="text-2xl sm:text-4xl font-semibold text-white drop-shadow-lg mb-3">
          An Overview of Dre Hotel
        </h2>
        <p class="text-sm sm:text-lg text-gray-200 leading-relaxed drop-shadow">
          Experience unmatched comfort, exquisite dining, and world-class hospitality in the heart of the city.
        </p>
      </div>
    </div>
  </section>
</div>

  <section class="bg-gray-800 text-white py-8 px-4">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-2xl sm:text-4xl font-semibold text-white drop-shadow-lg mb-4">Get Exclusive Offers</h2>
        <p class="text-gray-300 mb-8">Join our mailing list for special deals, Be the first to get our announcements and updates</p>

        <form @submit.prevent class="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            class="w-full sm:w-[300px] px-4 py-3 rounded-lg text-black placeholder-gray-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            class="bg-mainColor hover:bg-mainColor transition text-white px-6 py-3 rounded-lg font-semibold"
          >
            Subscribe
          </button>
        </form>
      </div>
  </section>

  <footer>
    <FooterView />
  </footer>
</template>
