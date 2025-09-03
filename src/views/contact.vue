<script setup>
import EmailTwo from '@/components/EmailTwo.vue';
import LocationTwo from '@/components/LocationTwo.vue';
import PhoneTwo from '@/components/PhoneTwo.vue';
import { toast } from 'vue3-toastify';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { computed, reactive } from 'vue';
import IconPhone from '@/components/IconPhone.vue';
import IconEmail from '@/components/IconEmail.vue';
import IconLocation from '@/components/IconLocation.vue';

const authData = reactive({
  name: '',
  email: '',
  message: ''
})

const rules = computed(() => ({
  name: { required },
  email: { email, required },
  message: { required }
}))

const v$ = useVuelidate(rules, authData)

const submitForm = async () => {
  const isFormCorrect = await v$.value.$validate()
  if(!isFormCorrect) {
    toast.error('Form must be completed')
  }

  else {
    toast.success("Form submitted!")
  }

  authData.name = ''
  authData.email = ''
  authData.message = ''
}
</script>

<template>
  <section class="relative bg-gray-900 py-10 sm:py-16 lg:py-20 px-4 sm:px-6 overflow-hidden">
    <!-- Background with overlay -->
    <div 
      class="absolute inset-0 bg-[url('/lotus-design-n-print-n5RsUiVf5T0-unsplash.jpg')] bg-cover bg-center"
    ></div>
    <div class="absolute inset-0 bg-black/70"></div>

    <div class="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
      
      <!-- Left: Contact Info -->
      <div class="space-y-6 sm:space-y-8 text-white">
        <h2 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug">
          Let’s Make Your Stay <span class="text-mainColor">Unforgettable</span>
        </h2>
        <p class="text-base sm:text-lg text-gray-300">
          Our team is available 24/7 to assist you with reservations, special requests, and more.
        </p>

        <div class="space-y-4 sm:space-y-6">
          <div class="backdrop-blur-xl bg-white/10 p-4 sm:p-5 rounded-2xl border border-white/20 flex items-center gap-3 sm:gap-4">
            <IconPhone class="text-mainColor w-5 h-5 sm:w-6 sm:h-6" />
            <div>
              <h3 class="font-semibold">Phone</h3>
              <p class="text-gray-300 text-sm sm:text-base">(832)-624-7087</p>
            </div>
          </div>

          <div class="backdrop-blur-xl bg-white/10 p-4 sm:p-5 rounded-2xl border border-white/20 flex items-center gap-3 sm:gap-4">
            <IconEmail class="text-mainColor w-5 h-5 sm:w-6 sm:h-6" />
            <div>
              <h3 class="font-semibold">Email</h3>
              <p class="text-gray-300 text-sm sm:text-base">info@andrehotel.com</p>
            </div>
          </div>

          <div class="backdrop-blur-xl bg-white/10 p-4 sm:p-5 rounded-2xl border border-white/20 flex items-center gap-3 sm:gap-4">
            <IconLocation class="text-mainColor w-5 h-5 sm:w-6 sm:h-6" />
            <div>
              <h3 class="font-semibold">Address</h3>
              <p class="text-gray-300 text-sm sm:text-base">Cape Verde, Santa Maria (Sal Island)</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Contact Form -->
      <div class="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
        <form @submit.prevent="submitForm" class="space-y-5 sm:space-y-6">
          <div>
            <label for="name" class="block font-medium text-white text-sm sm:text-base">Full Name</label>
            <input
              v-model="authData.name"
              id="name"
              type="text"
              class="w-full border border-gray-400/30 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-600/60 text-white focus:ring-2 focus:ring-white focus:border-white outline-none transition"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label for="email" class="block font-medium text-white text-sm sm:text-base">Email Address</label>
            <input
              v-model="authData.email"
              id="email"
              type="email"
              class="w-full border border-gray-400/30 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-600/60 text-white focus:ring-2 focus:ring-white focus:border-white outline-none transition"
              placeholder="you@gmail.com"
            />
          </div>

          <div>
            <label for="message" class="block font-medium text-white text-sm sm:text-base">Message</label>
            <textarea
              v-model="authData.message"
              id="message"
              rows="4"
              class="w-full border border-gray-400/30 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-600/60 text-white focus:ring-2 focus:ring-white focus:border-white outline-none transition"
              placeholder="Your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full bg-mainColor text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold shadow-lg hover:shadow-mainColor/50 hover:scale-[1.02] transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </section>
</template>