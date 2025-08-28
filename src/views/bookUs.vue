<script setup>
import router from '@/router';
import { ref, computed, reactive } from 'vue'
import { toast } from 'vue3-toastify';
import { useRoute } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import FooterView from '@/components/footerView.vue';

const route = useRoute()
const price = route.query.price
const image = route.query.image
const title = route.query.title
const overview = route.query.overview
const loading = ref(false)

const form = reactive({
    fullName: '',
    email: '',
    phone: '',
    // price: '',
    guests: '',
    checkIn: '',
    checkOut: '',
})

const rules = computed(() => ({
    fullName: { required },
    email: { email, required },
    phone: { required },
    guests: { required },
    checkIn: { required },
    checkOut: { required }
}))

console.log(form)

const v$ = useVuelidate(rules, form)

const extraServices = ref({
    breakFast: false,
    airportPickup: false,
    excortService: false,
})

const extraCost = computed(() => {
    let cost = 0
    if (extraServices.value.breakFast) cost = cost + 20
    if (extraServices.value.airportPickup) cost = cost + 50
    if (extraServices.value.excortService) cost = cost + 100
    return cost
})

const totalCost = computed(() => {
    if (!price) return 0
    const basePrice = price
    const nights = form.checkIn && form.checkOut ? (new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24) : 0
    const nightCount = nights > 0 ? nights : 1
    return basePrice * nightCount + extraCost.value
})

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// const isEmailValid = computed(() => {
//     return emailRegex.test(form.value.email.trim())
// })

// const isFormValid = computed(() => {
//     return (
//         form.value.fullName.trim() !== '' &&
//         isEmailValid.value &&
//         form.value.phone.length >= 10 &&
//         form.value.guests.length <= 5 &&
//         form.value.checkIn.trim() !== '' &&
//         form.value.checkOut.trim() !== ''
//     )
// })

const handleForm = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  loading.value = true

  toast.loading('Your booking is being processed')

  // snapshot the computed now, before any state changes
  const finalPriceSnapshot = totalCost.value

  setTimeout(async () => {
    await router.push({
      name: 'paymentPage',
      query: { finalPrice: finalPriceSnapshot }
    })
  }, 3000)

    form.fullName = '',
    form.email = '',
    form.phone = '',
    form.guests = '',
    form.checkIn = '',
    form.checkOut = ''

    loading.value = false
}
</script>


<template>
    <section class="bg-gray-100 min-h-screen py-12 px-4">
        <div
            class="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition"
        >
            <h2 class="text-3xl sm:text-[40px] font-semibold tracking-wide text-center mb-0 sm:mb-12 text-textColor">
                Book Your Stay
            </h2>

            <div class="bg-gray-50 p-4 rounded-lg mb-8 flex flex-col sm:flex-row gap-4 items-center sm:items-start shadow-sm">
                <img
                    :src="image"
                    class="w-full sm:w-28 aspect-[4/3] object-cover rounded-md"
                />
                    <div class="text-center sm:text-left">
                        <h3 class="text-lg font-semibold text-gray-800">
                            Luxury Room
                        </h3>
                            <p class="text-sm text-gray-500">{{ overview }}</p>
                            <p class="text-sm text-gray-500">{{ title }}</p>
                            <p class="text-mainColor font-semibold mt-1">${{ price }} / night</p>
                    </div>
            </div>

            <form class="space-y-6" @submit.prevent="handleForm">
                <div class="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-1" for="fullName">Full Name</label>
                        <input
                            id="fullName"
                            v-model="form.fullName"
                            type="text"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition"
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1" for="email">Email Address</label>
                        <input
                            id="email"
                            v-model="form.email"
                            type="email"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition"
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1" for="phone">Phone Number</label>
                        <input
                            id="phone"
                            v-model="form.phone"
                            type="tel"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition"
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1" for="guests">Number of Guests</label>
                        <input
                            id="guests"
                            type="text"
                            v-model="form.guests"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition"
                        />
                    </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-1" for="checkIn">Check-In Date</label>
                        <input
                            id="checkIn"
                            v-model="form.checkIn"
                            type="date"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition"
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1" for="checkOut">Check-Out Date</label>
                        <input
                            id="checkOut"
                            v-model="form.checkOut"
                            type="date"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition"
                        />
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium mb-2">Add-Ons</label>
                    <div class="flex flex-col gap-2 text-sm text-gray-600">
                        <label class="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100">
                        <input
                            type="checkbox"
                            v-model="extraServices.breakFast"
                            class="form-checkbox text-mainColor"
                        />
                            Breakfast ($20/day)
                        </label>
                        <label class="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100">
                        <input
                            type="checkbox"
                            v-model="extraServices.airportPickup"
                            class="form-checkbox text-mainColor"
                        />
                            Airport Pickup ($50)
                        </label>
                        <label class="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100">
                        <input
                            type="checkbox"
                            v-model="extraServices.excortService"
                            class="form-checkbox text-mainColor"
                        />
                            Excort Service ($100)
                        </label>
                    </div>
                </div>
                <div
                    class="bg-gray-50 p-4 rounded-lg text-gray-800 shadow-sm text-sm sm:text-base"
                    aria-live="polite"
                >
                    <div class="flex justify-between mb-1">
                        <span>Base Price ({{ form.checkIn && form.checkOut ? Math.max(1, (new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24)) : 0 }} nights)</span>
                        <span>${{ (price || 0) * (form.checkIn && form.checkOut ? Math.max(1, (new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24)) : 1) }}</span>
                    </div>
                    <div class="flex justify-between mb-1">
                        <span>Extras</span>
                        <span>${{ extraCost }}</span>
                    </div>
                    <div class="flex justify-between font-bold text-lg text-mainColor">
                        <span>Total</span>
                        <span>${{ totalCost }}</span>
                    </div>
                </div>

                <button
                    :disabled="loading || v$.$invalid"
                    type="submit"
                    class="w-full bg-gradient-to-r from-mainColor to-slate-900 text-white py-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Confirm Booking
                </button>
            </form>
        </div>
    </section>

    <footer>
        <FooterView />
    </footer>
</template>