<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify';
import { useModal } from 'vue-final-modal'
import PopUpViewMore from './popUpViewMore.vue';
// import 'vue3-toastify/dist/index.css';

const loading = ref(false)
const hotels = ref([])
const baseURL = 'https://api.unsplash.com'
const api_key = 'TLELzAmT1eFTrV71v2mcAD4OahAFyd4lAZvoSIZegzo'

const getHotelRooms = async (count = 6) => {
    try {
        loading.value = true
        hotels.value = []

        await new Promise((resolve) => setTimeout(resolve, 2000))

        const response = await axios.get(`${baseURL}/search/photos`, {
            params: { 
                query: 'hotel rooms', 
                per_page: count,
                client_id: api_key
            }
        })
        console.log('hotel rooms:', response)

        if (response.status !== 200) {
            throw new Error('Failed to get hotel rooms')
        }

        hotels.value = response.data.results
    }   catch (err) {
        console.log(err)
        toast.error('Something went wrong! Check Internet Connection...')
    }   finally {
        loading.value = false
    }
}

const openPopUp = (hotel) => {
  const { open, close } = useModal({
    component: PopUpViewMore,
    attrs: {
      hotel: hotel,
      onConfirm() {
        close()
      },
    },
  })

  open()
}

onMounted(() => {
    getHotelRooms()
})
</script>

<template>
    <div class="max-w-7xl mx-auto mt-6 px-6 sm:px-12">
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

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeUp">
            <div
                v-for="(hotel, index) in hotels"
                :key="hotel.id"
                class="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
            <div class="relative">
                <img
                    :src="hotel.urls.small"
                    :alt="hotel.alt_description || 'Hotel room'"
                    class="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span class="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow">
                    Featured
                </span>
            </div>
            <div class="p-5 space-y-2">
                <h3 class="text-lg font-semibold text-gray-900 truncate">
                    {{ hotel.alt_description || 'Luxury Hotel Room' }}
                </h3>
                <p class="text-sm text-gray-500">
                    Enjoy a relaxing stay with premium amenities and city views.
                </p>
                <div class="flex items-center justify-between pt-3">
                    <span class="text-lg font-bold text-gray-900">${{ hotel.likes }}<span class="text-sm text-gray-500">/night</span></span>
                    <button
                        @click="openPopUp(hotel)"
                        class="bg-mainColor text-white text-sm px-4 py-2 rounded-lg hover:bg-mainColor transition"
                    >
                        View More
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>