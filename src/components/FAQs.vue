<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    question: 'Can I cancel my booking?',
    answer: 'Yes, cancellations are allowed up to 24 hours before check-in without any fees. Late cancellations may incur charges.',
    open: false,
  },
  {
    question: 'Do you offer airport pickup?',
    answer: 'Absolutely! We offer complimentary airport pickup for all suite bookings. Please provide your flight details after reservation.',
    open: false,
  },
  {
    question: 'Are pets allowed?',
    answer: 'Yes, we are a pet-friendly hotel. Small pets are welcome in select rooms with a small cleaning fee.',
    open: false,
  },
  {
    question: 'Is breakfast included?',
    answer: 'Breakfast is complimentary for all guests staying in Deluxe and Suite rooms. Standard rooms can add breakfast at booking.',
    open: false,
  },
])

const toggleFAQ = (index) => {
  faqs.value[index].open = !faqs.value[index].open
}
</script>


<template>
<section class="bg-gray-100 py-12 px-4">
  <div class="max-w-xl mx-auto text-center mb-8">
    <h2 class="text-2xl sm:text-3xl font-semibold tracking-wide mb-3 text-textColor">
      Frequently Asked Questions
    </h2>
    <p class="text-gray-600 text-base sm:text-lg">
      Answers to some common questions about Dre Hotel.
    </p>
  </div>

  <div class="max-w-xl mx-auto space-y-3">
    <div
      v-for="(faq, index) in faqs"
      :key="index"
      class="bg-white rounded-lg shadow p-4 cursor-pointer transition hover:shadow-md"
      @click="toggleFAQ(index)"
    >
      <div class="font-medium text-base sm:text-lg text-gray-800 flex justify-between items-center">
        {{ faq.question }}
        <svg
          :class="['w-5 h-5 transition-transform duration-300', faq.open ? 'rotate-180' : 'rotate-0']"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <transition name="fade-slide">
        <p v-show="faq.open" class="mt-2 text-gray-600 text-sm sm:text-base leading-relaxed">
          {{ faq.answer }}
        </p>
      </transition>
    </div>
  </div>
</section>

</template>