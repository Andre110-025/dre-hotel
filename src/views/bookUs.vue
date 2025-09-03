<script setup>
import { useRouter } from 'vue-router';
import { ref, computed, reactive } from 'vue'
import { toast } from 'vue3-toastify';
import { useRoute } from 'vue-router'
// import { useVuelidate } from '@vuelidate/core'
// import { required, email } from '@vuelidate/validators'
import FooterView from '@/components/footerView.vue';

const route = useRoute()
const router = useRouter()
const price = Number(route.query.price) || 0
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

// const rules = computed(() => ({
//     fullName: { required },
//     email: { email, required },
//     phone: { required },
//     guests: { required },
//     checkIn: { required },
//     checkOut: { required }
// }))

// // console.log(form)

// const v$ = useVuelidate(rules, form)

// const handleForm = async () => {
//     const isFormCorrect = await v$.value.$validate()
//     if (!isFormCorrect) {
//         toast.warning('Form must be filled correctly')
//         console.log(v$.value.$errors)
//         return;
//     }

//     try {
//         loading.value = true

//         toast.loading('Your booking is being processed')

//         setTimeout(() => {
//             router.push({
//                 name: 'paymentPage',
//                 query: { finalPrice: totalCost.value }
//             })
//         }, 3000);

//         form.fullName = '',
//         form.email = '',
//         form.phone = '',
//         form.guests = '',
//         form.checkIn = '',
//         form.checkOut = ''

//     }   catch (error) {
//         toast.error('An Error was encountered')
//         console.error(error)
//     }   finally {
//         loading.value = false
//     }
// }

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
  const nights = form.checkIn && form.checkOut 
    ? (new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24) 
    : 0
  const nightCount = nights > 0 ? nights : 1
  return price * nightCount + extraCost.value
})


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isEmailValid = computed(() => {
  return emailRegex.test(form.email.trim())
})

const isFormValid = computed(() => {
  return (
    form.fullName.trim() !== '' &&
    isEmailValid.value &&
    form.phone.length >= 10 &&
    form.guests !== '' &&
    form.checkIn.trim() !== '' &&
    form.checkOut.trim() !== ''
  )
})

const handleForm = () => {
  if (!isFormValid.value) {
    toast.warning('Form must be filled correctly')
    return
  }

  loading.value = true
  toast.loading('Your booking is being processed')

  setTimeout(() => {
    router.push({
      name: 'paymentPage',
      query: { finalPrice: totalCost.value }
    })
  }, 3000)

  Object.assign(form, {
    fullName: '',
    email: '',
    phone: '',
    guests: '',
    checkIn: '',
    checkOut: '',
  })

  loading.value = false
}
</script>


<template>
    <section class="bg-gray-100 min-h-screen py-6 px-3">
  <div class="max-w-4xl mx-auto bg-white p-4 sm:p-8 rounded-xl shadow-md">
    <h2 class="text-2xl sm:text-[40px] font-semibold text-center mb-6 sm:mb-12 text-textColor">
      Book Your Stay
    </h2>

    <!-- Room Card -->
    <div class="bg-gray-50 p-3 rounded-lg mb-6 flex flex-col sm:flex-row gap-3 items-center sm:items-start shadow-sm">
      <img
        :src="image"
        class="w-full sm:w-28 aspect-[4/3] object-cover rounded-md"
      />
      <div class="text-center sm:text-left">
        <h3 class="text-base sm:text-lg font-semibold text-gray-800">
          Luxury Room
        </h3>
        <p class="text-xs sm:text-sm text-gray-500">{{ overview }}</p>
        <p class="text-xs sm:text-sm text-gray-500">{{ title }}</p>
        <p class="text-mainColor font-semibold mt-1 text-sm sm:text-base">${{ price }} / night</p>
      </div>
    </div>

    <!-- Form -->
    <form class="space-y-4 sm:space-y-6" @submit.prevent="handleForm">
      <div class="grid sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label class="block text-xs sm:text-sm font-medium mb-1" for="fullName">Full Name</label>
          <input
            id="fullName"
            v-model="form.fullName"
            type="text"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-slate-800 outline-none"
          />
        </div>
        <div>
          <label class="block text-xs sm:text-sm font-medium mb-1" for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-slate-800 outline-none"
          />
        </div>
        <div>
          <label class="block text-xs sm:text-sm font-medium mb-1" for="phone">Phone</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-slate-800 outline-none"
          />
        </div>
        <div>
          <label class="block text-xs sm:text-sm font-medium mb-1" for="guests">Guests</label>
          <input
            id="guests"
            v-model="form.guests"
            type="number"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-slate-800 outline-none"
          />
        </div>
      </div>

      <div class="grid sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label class="block text-xs sm:text-sm font-medium mb-1" for="checkIn">Check-In</label>
          <input
            id="checkIn"
            v-model="form.checkIn"
            type="date"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-slate-800 outline-none"
          />
        </div>
        <div>
          <label class="block text-xs sm:text-sm font-medium mb-1" for="checkOut">Check-Out</label>
          <input
            id="checkOut"
            v-model="form.checkOut"
            type="date"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-slate-800 outline-none"
          />
        </div>
      </div>

      <!-- Add-ons -->
      <div>
        <label class="block text-xs sm:text-sm font-medium mb-1">Add-Ons</label>
        <div class="flex flex-col gap-1.5 text-xs sm:text-sm text-gray-600">
          <label class="flex items-center gap-2 p-1.5 rounded cursor-pointer hover:bg-gray-100">
            <input type="checkbox" v-model="extraServices.breakFast" class="form-checkbox text-mainColor" />
            Breakfast ($20/day)
          </label>
          <label class="flex items-center gap-2 p-1.5 rounded cursor-pointer hover:bg-gray-100">
            <input type="checkbox" v-model="extraServices.airportPickup" class="form-checkbox text-mainColor" />
            Airport Pickup ($50)
          </label>
          <label class="flex items-center gap-2 p-1.5 rounded cursor-pointer hover:bg-gray-100">
            <input type="checkbox" v-model="extraServices.excortService" class="form-checkbox text-mainColor" />
            Excort Service ($100)
          </label>
        </div>
      </div>

      <!-- Price Summary -->
      <div class="bg-gray-50 p-3 rounded-lg text-gray-800 shadow-sm text-xs sm:text-sm">
        <div class="flex justify-between mb-1">
          <span>Base Price ({{ form.checkIn && form.checkOut ? Math.max(1, (new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24)) : 0 }} nights)</span>
          <span>${{ (price || 0) * (form.checkIn && form.checkOut ? Math.max(1, (new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24)) : 1) }}</span>
        </div>
        <div class="flex justify-between mb-1">
          <span>Extras</span>
          <span>${{ extraCost }}</span>
        </div>
        <div class="flex justify-between font-bold text-mainColor text-sm sm:text-lg">
          <span>Total</span>
          <span>${{ totalCost }}</span>
        </div>
      </div>

      <!-- Button -->
      <button
        type="submit"
        class="w-full bg-mainColor text-white py-2.5 text-sm sm:text-base rounded-lg font-semibold shadow hover:bg-[#9c2828] transition"
      >
        Confirm booking
      </button>
    </form>
  </div>
</section>

    <footer>
        <FooterView />
    </footer>
</template>