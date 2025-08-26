<script setup>
import router from '@/router';
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify';
const route = useRoute()

const finalPrice = computed(() => Number(route.query.finalPrice) || 0)

const form = ref({
    cardInfo: '',
    date: '',
    cvv: ''
})

const isFormValid = computed(() => {
    return (
        form.value.cardInfo.trim() !== '' &&
        form.value.date.trim() !== '' &&
        form.value.cvv.trim() !== ''
    )
})

const handleForm = () => {
    if (!isFormValid.value) {
        toast.error('invalid input')
        return
    }

    toast.success('Booking confirmed!')

    setTimeout(() => {
        router.push('/home')
    }, 4000)

    form.value.cardInfo = '',
    form.value.date = '',
    form.value.cvv = ''
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-3">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
      
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-800">Payment Details</h1>
        <p class="text-gray-500 mt-2">Secure checkout for your booking</p>
      </div>

      <div class="bg-gray-100 p-4 rounded-xl flex justify-between items-center">
        <div>
          <p class="text-sm text-gray-500">Amount to Pay</p>
          <p class="text-lg font-semibold text-gray-800">${{ finalPrice }}</p>
        </div>
        <span class="text-green-600 font-semibold">✔ Secure</span>
      </div>

      <form class="space-y-4" @submit.prevent="handleForm">
        <div>
  <label class="block text-sm font-medium text-gray-700 mb-1">Card Information</label>
  <div class="relative">
    <input
      v-model="form.cardInfo"
      type="text"
      placeholder="1234 5678 9012"
      class="mt-1 w-full pr-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
    />
    <div class="absolute right-3 top-1/2 -translate-y-1/2 flex space-x-1">
      <img src="/visa.png" alt="Visa" class="h-6" />
      <img src="/masterCard.png" alt="Mastercard" class="h-6" />
      <img src="/shopping.png" alt="Amex" class="h-6" />
    </div>
  </div>
</div>


        <div class="flex gap-4">
          <input
            v-model="form.date"
            type="text"
            placeholder="MM/YY"
            class="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
          <input
            v-model="form.cvv"
            type="text"
            placeholder="CVV"
            class="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
        </div>

        <button
          :disabled="!isFormValid"
          type="submit"
          :class="[
            !isFormValid
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-mainColor text-white hover:bg-[#9c2828]',
            'w-full py-3 rounded-lg text-lg font-semibold transition'
            ]"
        >
          Pay Now
        </button>
      </form>

      <p class="text-center text-sm text-gray-500">
        Your payment is secured with 256-bit encryption 🔒
      </p>
    </div>
  </div>
</template>
