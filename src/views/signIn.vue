<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import axios from 'axios'
// import { useUserStore } from '@/stores/user'
// import apiFunction from '@/app.service'

// const userStore = useUserStore()
const router = useRouter()

const loading = ref(false)
const showPassword = ref(false)
const authData = reactive({
  email: '',
  password: ''
})

const rules = computed(() => ({
  email: {
    email,
    required,
  },
  password: {
    required
  }
}))

const v$ = useVuelidate(rules, authData)

// const handleLogin = async () => {
//   const isFormCorrect = await v$.value.$validate()

//   if (!isFormCorrect) return

//   try {
//     loading.value = true
//     const response = await apiFunction.post('login', authData)
//     console.log(response.data)

//     if (response.status === 101) {
//       apiFunction.defaults.headers.common['Authorization'] = `Bearer ${token}`

//       userStore.user.token = response.data.token

//       await userStore.getUserDetails()

//       toast.success('Login Successful')

//       setTimeout(() => {
//         router.push({ name: 'home' })
//       }, 3000)
//     } else {
//       if (response.data.errors) {
//         toast.warning(response.data.errors)
//       } else {
//         toast.error('An Error was encountered')
//       }
//     }
//   } catch (error) {
//     toast.error('An Error was encountered')
//   }

//   loading.value = false
// }

// onMounted(() => {
//   userStore.$reset()
// })
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
      <div class="text-center mb-8">
        <img src="/signIn-profile.png" alt="Hotel Logo" class="h-16 mx-auto mb-4 rounded-full" />
        <h1 class="text-2xl font-bold text-gray-900">Sign In</h1>
        <p class="text-gray-500 text-sm">Sign in to book your next luxury stay</p>
      </div>

      <!-- Sign In Form -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="authData.email"
            type="email"
            placeholder="Enter your email"
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-mainColor focus:border-mainColor transition"
          />
        </div>

        <div class="relative">
  <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
  <input
    id="password"
    v-model="authData.password"
    :type="showPassword ? 'text' : 'password'"
    placeholder="Enter Password"
    class="mt-1 w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-mainColor focus:border-mainColor transition"
  />
  
  <!-- Eye toggle button -->
  <button
    type="button"
    @click="showPassword = !showPassword"
    class="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
  >
    <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.958 9.958 0 012.75-4.5M6.223 6.223A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.953 9.953 0 01-4.113 5.093M15 12a3 3 0 00-4.243-2.828M3 3l18 18" />
    </svg>
  </button>
</div>

        <button
          :disabled="loading || v$.$invalid"
          type="submit"
          class="w-full bg-mainColor text-white py-2 rounded-lg font-semibold hover:bg-[#9c2828] transition"
        >
          Sign In
        </button>
      </form>

      <!-- Divider -->
      <div class="flex items-center my-6">
        <div class="flex-grow border-t border-gray-300"></div>
        <span class="px-3 text-gray-400 text-sm">OR</span>
        <div class="flex-grow border-t border-gray-300"></div>
      </div>

      <!-- Social Login -->
      <div class="flex flex-col space-y-3">
        <button
          class="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition"
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" class="h-5" />
          Sign in with Google
        </button>
        <button
          class="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition"
        >
          <img src="/communication (1).png" alt="Facebook" class="h-5" />
          Sign in with Facebook
        </button>
      </div>

      <!-- Footer Links -->
      <p class="text-center text-gray-500 text-sm mt-6">
        Don’t have an account?
        <RouterLink to="/signup" class="text-mainColor font-semibold hover:underline">
          Sign up
        </RouterLink>
      </p>
    </div>
  </div>
</template>