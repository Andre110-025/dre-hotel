<script setup>
import FooterView from '@/components/footerView.vue'
import ReviewPage from '@/components/reviewPage.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const aboutHeroText = ref(
  'From humble beginnings in Santa Maria to becoming a boutique sanctuary of elegance and hospitality.'
)

const anotherText = ref(
    'To continue redefining luxury and warmth, one guest at a time. Whether you’re visiting for a weekend escape or a special celebration, we promise to make every moment memorable.'
)

const journyText = ref(
    ' What started as a small family-run inn has grown into a boutique sanctuary known for its refined charm and personalized service. Every corner of our space tells a story — of heritage, culture, and a commitment to excellence.'
)

const textThree = ref(
    'Nestled in the heart of Santa Maria, our hotel is more than just a place to stay — it’s an experience. Born out of a passion for warm hospitality and timeless elegance, we’ve built a retreat where comfort, service, and style meet.'
)
</script>


<template>
    <section class="relative h-[90vh] w-full">
        <video autoplay muted loop playsinline class="w-full h-full object-cover">
            <source src="/videos/aboutUsVid.mp4" type="video/mp4" />
        </video>
        <div class="absolute inset-0 bg-black/50 flex items-center justify-center text-center px-4">
            <div class="text-white max-w-2xl space-y-4">
                <h1 class="font-handwritten text-5xl sm:text-5xl md:text-6xl text-white">Our Story</h1>
                <p class="text-lg sm:text-xl max-w-xl font-medium leading-relaxed flex flex-wrap gap-1 justify-center">
                    <span
                        v-for="(word, index) in aboutHeroText.split(' ')"
                        :key="index"
                        class="inline-block opacity-0 translate-y-3 animate-wordSlide"
                        :style="`animation-delay: ${index * 120}ms`"
                    >
                        {{ word }}
                    </span>
                </p>
            </div>
        </div>
    </section>

    <section class="bg-white py-16 px-6 sm:px-12 space-y-20">
      <div class="max-w-4xl mx-auto space-y-6 text-center">
            <h2 class="font-handwritten text-4xl sm:text-5xl font-normal text-textColor mb-4 tracking-wide">A Legacy of Hospitality</h2>
            <p class="text-base sm:text-lg text-gray-600 leading-relaxed">
                {{ textThree }}
            </p>
        </div>

        <div class="hidden md:flex flex-col gap-24 max-w-6xl mx-auto py-20 px-4">
            <div class="grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h3 class="text-2xl font-semibold mb-4 text-textColor">Our Journey</h3>
                    <p class="text-base leading-relaxed mb-4 text-gray-600">
                        {{ journyText }}
                    </p>
                    <p class="text-base leading-relaxed text-gray-600">
                        Over the years, we’ve welcomed travelers from all walks of life — creating a space where every stay feels like home.
                    </p>
                </div>
                <img src="/partners-registering-with-signed-papers.jpg" alt="Hotel interior" class="rounded-xl shadow-lg object-cover w-full h-full" v-motion-pop-visible />
            </div>

            <div class="grid md:grid-cols-2 gap-10 items-center">
                <img src="/xxl_153159568.jpg" alt="Hotel interior" class="rounded-xl shadow-lg object-cover w-full h-full" v-motion-pop-visible />
                <div class="space-y-6">
                    <h3 class="text-2xl font-semibold text-textColor">What Sets Us Apart</h3>
                    <ul class="list-disc pl-6 space-y-2 text-base text-gray-600">
                        <li>Elegant rooms and suites designed with comfort and style in mind</li>
                        <li>Exceptional dining and curated culinary experiences</li>
                        <li>Friendly staff dedicated to making your stay unforgettable</li>
                        <li>Peaceful atmosphere — perfect for both business and leisure</li>
                    </ul>
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h3 class="text-2xl font-semibold mb-4 text-textColor">Our Vision</h3>
                    <p class="text-base leading-relaxed text-gray-600">
                        {{ anotherText }}
                    </p>
                </div>
                <img src="/vision.jpg" alt="Guest enjoying luxury stay" class="rounded-xl shadow-lg object-cover w-full h-full" v-motion-pop-visible />
            </div>
        </div>

        <div class="flex flex-col max-w-6xl mx-auto py-12 px-4 space-y-16 sm:space-y-20 md:hidden">
  <!-- Journey -->
  <div class="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-10 md:items-center">
    <div class="max-w-prose mx-auto md:mx-0">
      <h3 class="text-xl sm:text-2xl font-semibold mb-3 text-textColor">Our Journey</h3>
      <p class="text-base leading-relaxed mb-4 text-gray-600">
        {{ journyText }}
      </p>
      <p class="text-base leading-relaxed text-gray-600">
        Over the years, we’ve welcomed travelers from all walks of life — creating a space where every stay feels like home.
      </p>
    </div>
    <img
      src="/partners-registering-with-signed-papers.jpg"
      alt="Hotel interior"
      class="rounded-xl shadow-lg object-cover w-full max-h-64 sm:max-h-80 md:max-h-full"
      v-motion-pop-visible
    />
  </div>

  <!-- What Sets Us Apart -->
  <div class="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-10 md:items-center">
    <div class="order-2 md:order-1 max-w-prose mx-auto md:mx-0">
      <h3 class="text-xl sm:text-2xl font-semibold mb-3 text-textColor">What Sets Us Apart</h3>
      <ul class="list-disc pl-5 space-y-2 text-base text-gray-600">
        <li>Elegant rooms and suites designed with comfort and style in mind</li>
        <li>Exceptional dining and curated culinary experiences</li>
        <li>Friendly staff dedicated to making your stay unforgettable</li>
        <li>Peaceful atmosphere — perfect for both business and leisure</li>
      </ul>
    </div>
    <img
      src="/xxl_153159568.jpg"
      alt="Hotel interior"
      class="order-1 md:order-2 rounded-xl shadow-lg object-cover w-full max-h-64 sm:max-h-80 md:max-h-full"
      v-motion-pop-visible
    />
  </div>

  <!-- Vision -->
  <div class="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-10 md:items-center">
    <div class="max-w-prose mx-auto md:mx-0">
      <h3 class="text-xl sm:text-2xl font-semibold mb-3 text-textColor">Our Vision</h3>
      <p class="text-base leading-relaxed text-gray-600">
        {{ anotherText }}
      </p>
    </div>
    <img
      src="/vision.jpg"
      alt="Guest enjoying luxury stay"
      class="rounded-xl shadow-lg object-cover w-full max-h-64 sm:max-h-80 md:max-h-full"
      v-motion-pop-visible
    />
  </div>
</div>


        <ReviewPage />
    </section>

    <section class="bg-gray-800 text-white py-10 px-4 sm:px-8">
        <div class="max-w-4xl mx-auto text-center space-y-6">
            <h2 class="text-2xl sm:text-3xl font-semibold tracking-wide">Ready to Experience It?</h2>
            <p class="text-gray-300 text-lg">
                Discover a stay that blends comfort, elegance, and unmatched hospitality. Your journey starts here.
            </p>
            <div class="flex justify-center gap-4 flex-wrap">
                <RouterLink 
                    to="/explore"
                    class="bg-mainColor text-white font-semibold py-3 px-6 rounded-lg hover:bg-mainColor transition"
                >
                    Book Now
                </RouterLink>
                <RouterLink
                    to="/contact"
                    class="bg-white text-textColor font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-neutral-900 transition"
                >
                    Contact Us
                </RouterLink>
            </div>
        </div>
    </section>

    <footer>
      <FooterView />
    </footer>
</template>
