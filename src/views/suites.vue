<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify';
import FAQs from '@/components/FAQs.vue';
import FooterView from '@/components/footerView.vue';
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const isLoggedIn = computed(() => {
    return userStore.user.token !== null && userStore.user.expirationTime !== null
})

const loading = ref(false)
const hotelRooms = ref([])
const baseURL = 'https://api.unsplash.com'
const api_key = 'TLELzAmT1eFTrV71v2mcAD4OahAFyd4lAZvoSIZegzo'

const getRooms = async (count = 12) => {
    try {
        loading.value = true
        hotelRooms.value = []

        await new Promise((resolve) => setTimeout(resolve, 2000))

        const response = await axios.get(`${baseURL}/search/photos`, {
            params: { 
                query: 'hotel rooms', 
                per_page: count,
                client_id: api_key
            }
        })
        console.log('more hotel rooms:', response)

        if (response.status !== 200) {
            throw new Error('Failed to get hotel rooms')
        }

        hotelRooms.value = response.data.results
    }   catch (err) {
        console.log(err)
        toast.error('Something went wrong! Check Internet Connection...')
    }   finally {
        loading.value = false
    }
}

onMounted(() => {
    getRooms()
})

const heroText = ref(
    'Take a sneak peek into comfort, refined elegance, and signature style — a perfect escape crafted for those who appreciate the finer things.'
)
</script>


<template>
    <section class="relative h-[90vh] w-full">
    <video
      autoplay
      muted
      loop
      playsinline
      class="w-full h-full object-cover"
    >
      <source src="/videos/rooms.mp4" type="video/mp4" />
    </video>

    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10 flex items-center justify-center text-center px-4">
        <div class="text-white max-w-2xl space-y-4">
            <h1 class="font-handwritten text-5xl sm:text-5xl md:text-6xl text-white">Explore Our Luxury Rooms</h1>
            <p class="text-lg sm:text-xl max-w-xl font-medium leading-relaxed flex flex-wrap gap-1 justify-center">
                <span
                    v-for="(word, index) in heroText.split(' ')"
                    :key="index"
                    class="inline-block opacity-0 translate-y-3 animate-wordSlide"
                    :style="`animation-delay: ${index * 120}ms`"
                >
                    {{ word }}
                </span>
            </p>
            <RouterLink
                to="/bookUs"
                v-if="!isLoggedIn"
                class="mt-5 inline-block bg-mainColor text-white font-medium px-6 py-3 rounded-full hover:bg-[#9c2828] transition 
                opacity-0 translate-y-4 animate-buttonSlide"
            >
                Sign In
            </RouterLink>
            <RouterLink
                v-else
                to="/bookUs"
                class="mt-5 inline-block bg-mainColor text-white font-medium px-6 py-3 rounded-full hover:bg-[#9c2828] transition 
                opacity-0 translate-y-4 animate-buttonSlide"
            >
                Book Now
            </RouterLink>
        </div>
    </div>
  </section>

    <div class="max-w-7xl mx-auto mt-6 px-6 sm:px-12">
        <h2 class="text-2xl sm:text-3xl font-semibold tracking-wide text-center mt-8 text-textColor">
            Our Rooms & Suites
        </h2>
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
                v-for="n in 6"
                :key="n"
                class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse"
            >
                <div class="w-full h-[220px] bg-gray-200"></div>
                <div class="p-5 space-y-3">
                    <div class="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div class="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
            </div>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5 animate-fadeUp">
            <div
                v-for="hotels in hotelRooms"
                :key="hotels.id"
                class="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
            <div class="relative">
                <img
                    :src="hotels.urls.small"
                    :alt="hotels.alt_description || 'Hotel room'"
                    class="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span class="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow">
                    Featured
                </span>
            </div>
            <div class="p-5 space-y-2">
                <h3 class="text-lg font-semibold text-gray-900 truncate">
                    {{ hotels.description || 'Luxury Hotel Room' }}
                </h3>
                <p class="text-sm text-gray-500">
                    {{ hotels.alt_description }}
                </p>
                <div class="flex items-center justify-between pt-3">
                    <span class="text-lg font-bold text-gray-900">${{ hotels.likes }}<span class="text-sm text-gray-500">/night</span></span>
                    <RouterLink
                        v-if="!isLoggedIn"
                        class="bg-mainColor text-white text-sm px-4 py-2 rounded-lg hover:bg-mainColor transition"
                        :to="{ name: 'signup' }"
                    >
                        Sign In
                    </RouterLink>
                    <RouterLink
                        v-else
                        :to="{ name: 'bookUs', query: { price: hotels.likes, image: hotels.urls.small, title: hotels.description, overview: hotels.alt_description } }"
                        class="bg-mainColor text-white text-sm px-4 py-2 rounded-lg hover:bg-mainColor transition"
                    >
                        Book Now
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</div>

    <div class="py-16 px-6 sm:px-12 space-y-20">
        <FAQs />
    </div>

    <section class="bg-gray-800 text-white py-12 text-center px-4">
     <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide text-center text-white mb-4">Found Your Dream Room?</h2>
  <p class="text-lg mb-6">Reserve now to enjoy early check-in and special offers.</p>
  <RouterLink
    to=""
    class="inline-block bg-mainColor text-white font-semibold px-6 py-3 rounded-full shadow"
  >
    Book a Room
  </RouterLink>
    </section>
    
    <footer>
        <FooterView />
    </footer>
</template>