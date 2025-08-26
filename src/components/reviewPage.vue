<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const testimonials = ref([
  {
    name: 'Olivia R.',
    role: 'Frequent Guest',
    image: '/front-view-female-patient-physiotherapy.jpg',
    quote: 'The hospitality was beyond anything we\'ve ever experienced. A hidden gem in Santa Maria.',
  },
  {
    name: 'Daniel K.',
    role: 'Business Traveler',
    image: '/nigga.jpg',
    quote: 'Every stay has been flawless — from the service to the amenities. My go-to spot when in town.',
  },
  {
    name: 'Maria S.',
    role: 'Anniversary Guest',
    image: '/lovely-lesbian-couple-being-affectionate-home.jpg',
    quote: 'We celebrated our anniversary here, and it was pure magic. Romantic and serene.',
  },
  {
    name: 'Kevin T.',
    role: 'Solo Explorer',
    image: '/medium-shot-forest-wardens-with-brochure.jpg',
    quote: 'The location, the staff, the room — everything exceeded my expectations.',
  },
  {
    name: 'Angela W.',
    role: 'Retreat Organizer',
    image: '/top-view-pensive-black-student-with-short-hairstyle.jpg',
    quote: 'I hosted a wellness retreat here and the feedback was overwhelmingly positive.',
  },
])

const current = ref(0)
let intervalId = null

const autoSlide = () => {
  intervalId = setInterval(() => {
    current.value = (current.value + 1) % testimonials.value.length
  }, 10000) 
}

onMounted(autoSlide)
onBeforeUnmount(() => clearInterval(intervalId))
</script>

<template>
     <div class="bg-gray-100 py-16 px-4 sm:px-8 rounded-lg overflow-hidden">
            <div class="max-w-3xl mx-auto text-center space-y-6">
                <h3 class="text-2xl font-semibold mb-6">What Our Guests Say</h3>
                <div class="relative min-h-[280px]">
                    <transition name="slide-fade" mode="out-in">
                        <div :key="testimonials[current].name" class="space-y-6">
                            <div class="flex justify-center">
                                <img
                                    :src="testimonials[current].image"
                                    alt="Guest profile"
                                    class="w-[100px] h-[100px] rounded-full object-cover border-4 border-white shadow-md"
                                />
                            </div>
                            <blockquote class="italic text-lg text-gray-600">
                                “{{ testimonials[current].quote }}”
                            </blockquote>
                            <p class="text-gray-500">— {{ testimonials[current].name }} - {{ testimonials[current].role }}</p>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
</template>