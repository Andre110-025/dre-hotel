<script setup>
import EmailTwo from '@/components/EmailTwo.vue';
import LocationTwo from '@/components/LocationTwo.vue';
import PhoneTwo from '@/components/PhoneTwo.vue';
import { toast } from 'vue3-toastify';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { computed, reactive } from 'vue';

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
  <section class="bg-gray-50 py-16 px-4">
    <!-- Header -->
    <div class="max-w-2xl mx-auto text-center mb-12">
      <h2 class="text-3xl sm:text-4xl font-bold text-textColor">
        Contact Dre Hotel
      </h2>
      <p class="text-gray-600 mt-3">
        We're here 24/7 to make your stay unforgettable. Reach out anytime.
      </p>
    </div>

    <!-- Info + Form -->
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Contact Info -->
      <div class="space-y-6">
        <div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div class="flex items-center gap-4">
            <PhoneTwo class="w-6 h-6 text-mainColor" />
            <div>
              <h3 class="font-semibold text-textColor">Phone</h3>
              <p class="text-gray-600">(832)-624-7087</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div class="flex items-center gap-4">
            <EmailTwo class="w-6 h-6 text-mainColor" />
            <div>
              <h3 class="font-semibold text-textColor">Email</h3>
              <p class="text-gray-600">info@andrehotel.com</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div class="flex items-center gap-4">
            <LocationTwo class="w-6 h-6 text-mainColor" />
            <div>
              <h3 class="font-semibold text-textColor">Address</h3>
              <p class="text-gray-600">Cape Verde, Santa Maria (Sal Island)</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="bg-white p-8 rounded-xl shadow-lg">
        <form @submit.prevent="submitForm" class="space-y-6">
          <div>
            <label for="name" class="block font-medium text-textColor">Full Name</label>
            <input
              v-model="authData.name"
              id="name"
              type="text"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label for="email" class="block font-medium text-textColor">Email Address</label>
            <input
              v-model="authData.email"
              id="email"
              type="email"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label for="message" class="block font-medium text-textColor">Message</label>
            <textarea
              v-model="authData.message"
              id="message"
              rows="5"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full bg-mainColor text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

