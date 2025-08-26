<script setup>
import IconAir from './IconAir.vue';
import IconBreakfast from './IconBreakfast.vue';
import IconConviene from './IconConviene.vue';
import IconRooftop from './IconRooftop.vue';
import IconSpa from './IconSpa.vue';
import IconWifi from './IconWifi.vue';

const features = [
  {
    icon: IconConviene,
    title: '24/7 Concierge',
    description: 'Personalized service at any hour of the day.',
  },
  {
    icon: IconBreakfast,
    title: 'Complimentary Breakfast',
    description: 'Start your day with a delicious, fresh meal on us.',
  },
  {
    icon: IconRooftop,
    title: 'Rooftop Lounge',
    description: 'Stunning views, cocktails, and comfort above the city.',
  },
  {
    icon: IconSpa,
    title: 'Spa & Wellness',
    description: 'Relax with world-class spa treatments and wellness options.',
  },
  {
    icon: IconWifi,
    title: 'High-Speed WiFi',
    description: 'Seamless connectivity in every room and space.',
  },
  {
    icon: IconAir,
    title: 'Airport Pickup',
    description: 'Effortless transfers with our professional drivers.',
  },
]
</script>

<template>
  <section class="py-16 px-6 sm:px-8 bg-white text-gray-800">
    <div class="max-w-6xl mx-auto text-center">
      <div class="text-center max-w-3xl mx-auto">
        <h2 class="text-2xl sm:text-4xl font-semibold text-textColor drop-shadow-lg mt-5">
          Why choose Dre Hotel?
        </h2>

        <p class="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed italic mt-2.5">
          Discover the comfort, convenience, and timeless luxury that define every guest’s stay.
        </p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
        <div
          v-for="(feature, i) in features"
          :key="i"
          class="bg-gray-100 p-6 rounded-lg shadow transition transform hover:shadow-lg hover:scale-[1.05] hover:bg-indigo-50 cursor-pointer"
          role="group"
          :aria-labelledby="`feature-title-${i}`"
        >
          <component
            :is="feature.icon"
            class="w-12 h-12 mx-auto mb-4 p-3 bg-indigo-100 rounded-full text-indigo-600 icon-hover"
            aria-hidden="true"
          />
          <h3
            :id="`feature-title-${i}`"
            class="text-lg font-semibold mb-2 tracking-wide text-gray-900"
          >
            {{ feature.title }}
          </h3>
          <p class="text-gray-700 text-sm">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>