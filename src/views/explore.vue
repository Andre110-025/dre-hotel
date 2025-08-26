<script setup>
import FAQs from '@/components/FAQs.vue';
import FooterView from '@/components/footerView.vue';
import { ref } from 'vue'

const exploreText = ref(
  'Discover the rooms, amenities, and experiences that make every stay unforgettable.'
)
</script>

<template>
    <section class="relative h-[90vh] w-full overflow-hidden">
        <video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover z-0">
            <source src="/videos/exploreVid.mp4" type="video/mp4" />
        </video>

        <div class="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
        <div class="relative z-20 flex flex-col items-center justify-center text-center text-white h-full px-4">
          <h1 class="font-handwritten text-5xl sm:text-5xl md:text-6xl text-white">
            Explore Our World of Comfort
          </h1>
          <p class="text-base sm:text-lg max-w-md mx-auto font-medium leading-relaxed flex flex-wrap gap-1 justify-center text-center">
            <span
              v-for="(word, index) in exploreText.split(' ')"
              :key="index"
              class="inline-block opacity-0 translate-y-3 animate-wordSlide"
              :style="`animation-delay: ${index * 120}ms`"
            >
              {{ word }}
            </span>
          </p>
          <RouterLink
            :to="{ name: 'suites' }"
            class="mt-6 inline-block bg-mainColor text-white font-medium px-6 py-3 rounded-full hover:bg-[#9c2828] transition 
            opacity-0 translate-y-4 animate-buttonSlide"
          >
            View Rooms
          </RouterLink>
        </div>
    </section>

    <section class="py-20  px-4 sm:px-8">
        <div class="max-w-6xl mx-auto text-center mb-12 px-4">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide text-textColor">
            Our Room Categories
          </h2>
          <p class="text-gray-600 text-base sm:text-lg">
            Choose from a variety of spaces tailored to your comfort and lifestyle.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          <div 
            class="bg-white rounded-xl shadow-lg overflow-hidden transition hover:scale-105"
            v-motion-pop-visible
          >
            <img 
              src="/luxury-bedroom-interior-with-rich-furniture-scenic-view-from-walkout-deck.jpg" 
              alt="Deluxe Room" 
              class="w-full h-40 sm:h-52 object-cover" 
            />

            <div class="p-4 sm:p-6 space-y-2 sm:space-y-3 text-center sm:text-left">
              <h3 class="text-lg sm:text-xl font-semibold text-textColor">🛏️ Deluxe Room</h3>
              <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                Experience refined comfort with elegant interiors, curated amenities, and unforgettable views.
              </p>
              <RouterLink 
                :to="{ name: 'suites' }" 
                class="inline-block mt-2 text-sm sm:text-base text-white bg-mainColor px-4 py-2 rounded-full hover:bg-[#9c2828] transition"
              >
                View More
              </RouterLink>
            </div>
          </div>

          <div 
            class="bg-white rounded-xl shadow-lg overflow-hidden transition hover:scale-105"
            v-motion-pop-visible
          >
            <img 
              src="/close-up-romantic-breakfast-bed-arrangement.jpg" 
              alt="Honey Moon Suite" 
              class="w-full h-40 sm:h-52 object-cover" 
            />

            <div class="p-4 sm:p-6 space-y-2 sm:space-y-3 text-center sm:text-left">
              <h3 class="text-lg sm:text-xl font-semibold text-textColor">🛏️ Honey Moon Suite</h3>
              <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                Indulge in intimate luxury with elegant décor, serene ambiance, and unforgettable views — perfect for two.
              </p>
              <RouterLink 
                :to="{ name: 'suites' }" 
                class="inline-block mt-2 text-sm sm:text-base text-white bg-mainColor px-4 py-2 rounded-full hover:bg-[#9c2828] transition"
              >
                View More
              </RouterLink>
            </div>
          </div>

          <div 
            class="bg-white rounded-xl shadow-lg overflow-hidden transition hover:scale-105"
            v-motion-pop-visible
          >
            <img 
              src="/lotus-design-n-print-n5RsUiVf5T0-unsplash.jpg" 
              alt="Penthouse Suite" 
              class="w-full h-40 sm:h-52 object-cover" 
            />

            <div class="p-4 sm:p-6 space-y-2 sm:space-y-3 text-center sm:text-left">
              <h3 class="text-lg sm:text-xl font-semibold text-textColor">🌿 Penthouse Suite</h3>
              <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                Elevate your stay in our exclusive penthouse featuring private garden access and serene, nature-inspired interiors.
              </p>
              <RouterLink 
                :to="{ name: 'suites' }" 
                class="inline-block mt-2 text-sm sm:text-base text-white bg-mainColor px-4 py-2 rounded-full hover:bg-[#9c2828] transition"
              >
                View More
              </RouterLink>
          </div>
        </div>
  </div>
</section>

<section class="py-16 bg-white px-4 sm:px-8">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <h2 class="text-2xl sm:text-3xl font-semibold tracking-wide text-center mb-4 text-textColor">Amenities & Services</h2>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
      <div class="p-6 bg-gray-100 rounded-lg shadow hover:shadow-md transition">
        <div class="mb-4 flex justify-center">
          <!-- Replace this with your actual IconPoolSpa component -->
          <div class="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xl select-none">🏊‍♂️</div>
        </div>
        <h3 class="text-lg font-semibold mb-2">Pool & Spa</h3>
        <p class="text-sm text-gray-600">Relax in our serene spa or take a dip in the rooftop infinity pool.</p>
      </div>

      <div class="p-6 bg-gray-100 rounded-lg shadow hover:shadow-md transition">
        <div class="mb-4 flex justify-center">
          <!-- Replace with IconDining -->
          <div class="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-700 font-bold text-xl select-none">🍽️</div>
        </div>
        <h3 class="text-lg font-semibold mb-2">Dining</h3>
        <p class="text-sm text-gray-600">Enjoy gourmet meals, crafted cocktails, and curated local flavors.</p>
      </div>

      <div class="p-6 bg-gray-100 rounded-lg shadow hover:shadow-md transition">
        <div class="mb-4 flex justify-center">
          <!-- Replace with IconLaundry -->
          <div class="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center text-pink-700 font-bold text-xl select-none">🧺</div>
        </div>
        <h3 class="text-lg font-semibold mb-2">Laundry & Room Service</h3>
        <p class="text-sm text-gray-600">24/7 room service and laundry to keep you fresh and comfortable.</p>
      </div>

      <div class="p-6 bg-gray-100 rounded-lg shadow hover:shadow-md transition">
        <div class="mb-4 flex justify-center">
          <!-- Replace with IconAirport -->
          <div class="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold text-xl select-none">✈️</div>
        </div>
        <h3 class="text-lg font-semibold mb-2">Airport Transfers</h3>
        <p class="text-sm text-gray-600">Complimentary pick-up and drop-off to make your travel seamless.</p>
      </div>
    </div>
  </div>
</section>

<section class="py-16 px-4 sm:px-8 bg-gray-50">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-2xl sm:text-3xl font-semibold tracking-wide text-center mb-4 text-textColor">Nearby Attractions</h2>
    <p class="text-center text-gray-600 mb-12">From iconic landmarks to hidden gems, explore what surrounds Dre Hotel.</p>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12 px-4">
      <div class="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden">
        <img src="/pieter-janaldo-XsYj9KcxUF0-unsplash.jpg" alt="Beach" class="w-full h-40 object-cover" />
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-1">Sunny Beach</h3>
          <p class="text-sm text-gray-600">A 10-min walk to soft sands and crystal-clear waters.</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden">
        <img src="/michael-lechner-M9b5-v2TJvM-unsplash.jpg" alt="Nightlife" class="w-full h-40 object-cover" />
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-1">Vibrant Nightlife</h3>
          <p class="text-sm text-gray-600">Bars, clubs, and live music just around the corner.</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden">
        <img src="/ramon-pfeiffer-Lt8qyeUFOJ8-unsplash.jpg" alt="Hiking Trail" class="w-full h-40 object-cover" />
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-1">Scenic Hikes</h3>
          <p class="text-sm text-gray-600">Enjoy nature with trails offering panoramic views.</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden">
        <img src="/leo-korman-zPY8ZMvOuIk-unsplash.jpg" alt="Historic Monument" class="w-full h-40 object-cover" />
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-1">Historic Monument</h3>
          <p class="text-sm text-gray-600">Discover cultural landmarks rich with history.</p>
        </div>
      </div>
    </div>

    <div class="mb-8 px-4">
  <div class="w-full h-52 sm:h-64 rounded-lg overflow-hidden shadow">
    <iframe
      src="https://maps.google.com/maps?q=lagos&t=&z=13&ie=UTF8&iwloc=&output=embed"
      class="w-full h-full border-0"
      allowfullscreen=""
      loading="lazy"
    ></iframe>
  </div>
</div>

    <div class="py-6 px-6 sm:px-12 space-y-20">
      <FAQs />
    </div>
  </div>
</section>

    <footer>
        <FooterView />
    </footer>
</template>