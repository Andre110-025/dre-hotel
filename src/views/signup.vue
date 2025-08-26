<script setup>
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'

const router = useRouter()

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleSignUp = () => {
  if (!form.value.name || !form.value.email || !form.value.password || !form.value.confirmPassword) {
    toast.error('Please fill in all fields')
    return
  }
  if (form.value.password !== form.value.confirmPassword) {
    toast.error('Passwords do not match')
    return
  }
  toast.success('Account created successfully!')
   setTimeout(() => {
      router.push('/suites')
  }, 3000)

  form.value.name = '',
  form.value.email = '',
  form.value.password = '',
  form.value.confirmPassword = ''
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
      <!-- Branding -->
      <div class="text-center mb-8">
        <img src="/signIn-profile.png" alt="Hotel Logo" class="h-16 mx-auto mb-4 rounded-full" />
        <h1 class="text-2xl font-bold text-gray-900">Create Your Account</h1>
        <p class="text-gray-500 text-sm">Join us for an unforgettable stay</p>
      </div>

      <!-- Sign Up Form -->
      <form @submit.prevent="handleSignUp" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
    
            placeholder="Full Name"
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-mainColor focus:border-mainColor transition"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
    
            placeholder="Enter your email"
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-mainColor focus:border-mainColor transition"
          />
        </div>

        <div class="relative">
  <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
  <input
    id="password"
    v-model="form.password"
    :type="showPassword ? 'text' : 'password'"
    placeholder="********"
    class="mt-1 w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-mainColor focus:border-mainColor transition"
  />
  <button
    type="button"
    @click="showPassword = !showPassword"
    class="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
  >
    <!-- Eye open -->
    <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
      viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
    <!-- Eye closed -->
    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
      viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.958 9.958 0 012.75-4.5M6.223 6.223A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.953 9.953 0 01-4.113 5.093M15 12a3 3 0 00-4.243-2.828M3 3l18 18" />
    </svg>
  </button>
</div>

<div class="relative mt-4">
  <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
  <input
    id="confirmPassword"
    v-model="form.confirmPassword"
    :type="showConfirmPassword ? 'text' : 'password'"
    placeholder="********"
    class="mt-1 w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-mainColor focus:border-mainColor transition"
  />
  <button
    type="button"
    @click="showConfirmPassword = !showConfirmPassword"
    class="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
  >
    <!-- Eye open -->
    <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
      viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
    <!-- Eye closed -->
    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
      viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.958 9.958 0 012.75-4.5M6.223 6.223A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.953 9.953 0 01-4.113 5.093M15 12a3 3 0 00-4.243-2.828M3 3l18 18" />
    </svg>
  </button>
</div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-mainColor text-white py-2 rounded-lg font-semibold hover:bg-[#9c2828] transition"
        >
          Create Account
        </button>
      </form>

      <!-- Divider -->
      <div class="flex items-center my-6">
        <div class="flex-grow border-t border-gray-300"></div>
        <span class="px-3 text-gray-400 text-sm">OR</span>
        <div class="flex-grow border-t border-gray-300"></div>
      </div>

      <!-- Social Signup -->
      <div class="flex flex-col space-y-3">
        <button
          class="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition"
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" class="h-5" />
          Sign up with Google
        </button>
        <button
          class="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition"
        >
          <img src="/communication (1).png" alt="Facebook" class="h-5" />
          Sign up with Facebook
        </button>
      </div>

      <!-- Footer -->
      <p class="text-center text-gray-500 text-sm mt-6">
        Already have an account?
        <RouterLink to="/signin" class="text-mainColor font-semibold hover:underline">
          Sign in
        </RouterLink>
      </p>
    </div>
  </div>
</template>
