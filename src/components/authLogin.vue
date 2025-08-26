<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()
const loading = ref(false)

const showPassword = ref(false)

const authData = reactive({
  email: '',
  password: '',
})

const rules = computed(() => ({
  email: {
    email, 
    required
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
//     await userStore.login(authData)
//     toast.success('Login Successful!')

//     setTimeout(() => {
//       router.push({ name: 'home' })
//     }, 3000);

//     authData.email = ''
//     authData.password = ''
//   } catch (error) {
//      toast.error('An error was encountered')
//      console.error(error)
//   } finally {
//     loading.value = false
//   }
// }

const handleLogin = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  try {
    loading.value = true

    
    const { data, status } = await axios.get('/users')

    if (status === 200) {
      const matchUser = data.find(
        u => u.email === authData.email && u.password === authData.password
      )

      if (matchUser) {
        const token = Math.random().toString(36).substring(2) + Date.now().toString(36)

        userStore.user.token = token
        userStore.user.users = matchUser
        userStore.user.expirationTime = Date.now() + 1000 * 60 * 60

        toast.success('Login Successful')
        setTimeout(() => {
          router.push({ name: 'home' })
        }, 3000);

        authData.email = ''
        authData.password = ''
      } else {
        toast.error('Invalid email or password')
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    toast.error('An error occurred during login')
  } finally {
    loading.value = false
  }
};
</script>


<template>
  <form 
    @submit.prevent="handleLogin" 
    class="max-w-lg w-full bg-white p-10 rounded-xl space-y-6"
  >
    <div class="space-y-2">
      <label for="email" class="block text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        v-model="authData.email"
        type="email"
        id="email"
        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
      />
    </div>

    <div class="space-y-1 relative">
      <label for="password" class="block text-sm font-medium text-gray-700">
        Password
      </label>
      <input
        v-model="authData.password"
        :type="showPassword ? 'text' : 'password'"
        id="password"
        class="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl 
        focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
      />
      <button
      type="button"
      class="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
      @click="showPassword = !showPassword"
    >

      <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7
             a9.956 9.956 0 012.045-3.338m3.106-2.506A9.955 9.955 0 0112 5
             c4.477 0 8.268 2.943 9.542 7a9.96 9.96 0 01-4.043 5.412M15 12
             a3 3 0 11-6 0 3 3 0 016 0zm-9.193-6.193L19.193 19.193" />
      </svg>
      
      <!-- Eye Open -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>

    </button>
    </div>

    <div class="flex items-center justify-between text-sm">
      <RouterLink 
        class="text-indigo-600 hover:underline"
        :to="{ name: '' }"
      >
        Forgot password?
      </RouterLink>
    </div>

    <button
      :disabled="loading || v$.$invalid"
      type="submit"
      class="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow 
      hover:bg-indigo-700 transition
      disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Log in
    </button>
  </form>

  <p class="text-center text-sm text-gray-600 mt-8">
    Don’t have an account?
    <RouterLink 
      class="text-indigo-600 font-medium hover:underline"
      :to="{ name: 'signup' }"
    >
      Sign up
    </RouterLink>
  </p>
</template>
