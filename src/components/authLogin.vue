<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import IconEye from './IconEye.vue'
import IconHidden from './IconHidden.vue'

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

    const storedUsers = userStore.allUsers || []
    const foundUser = storedUsers.find(
      u => u.email === authData.email && u.password === authData.password
    )

      if (foundUser) {
        const token = Math.random().toString(36).substring(2) + Date.now().toString(36)

        userStore.user = {
          token,
          users: foundUser,
          expirationTime: Date.now() + 1000 * 60 * 60 * 24 * 7  
        }

        // localStorage.setItem("currentUser", JSON.stringify(userStore.user))

        toast.success('Login Successful')
        setTimeout(() => {
          router.push({ name: 'home' })
        }, 3000);

        authData.email = ''
        authData.password = ''
      } else {
        toast.error('Invalid email or password')
      }
    
    // const { data, status } = await axios.get('/users')

    // if (status === 200) {
    //   const matchUser = data.find(
    //     u => u.email === authData.email && u.password === authData.password
    //   )

    //   if (matchUser) {
    //     const token = Math.random().toString(36).substring(2) + Date.now().toString(36)

    //     userStore.user.token = token
    //     userStore.user.users = matchUser
    //     userStore.user.expirationTime = Date.now() + 1000 * 60 * 60

    //     toast.success('Login Successful')
    //     setTimeout(() => {
    //       router.push({ name: 'home' })
    //     }, 3000);

    //     authData.email = ''
    //     authData.password = ''
    //   } else {
    //     toast.error('Invalid email or password')
    //   }
    // }
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
        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-1 focus:ring-slate-800 focus:border-slate-800 outline-none"
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
        focus:ring-1 focus:ring-slate-800 focus:border-slate-800 outline-none"
      />
      <button
      type="button"
      class="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
      @click="showPassword = !showPassword"
    >

      <IconEye v-if="!showPassword" />
      <IconHidden v-else />
    </button>
    </div>

    <div class="flex items-center justify-between text-sm">
      <RouterLink 
        class="text-indigo-600"
        :to="{ name: 'forgetpwd' }"
      >
        Forgot password?
      </RouterLink>
    </div>

    <button
      :disabled="loading || v$.$invalid"
      type="submit"
      class="w-full bg-mainColor text-white py-3 rounded-xl font-semibold shadow 
      hover:bg-[#9c2828] transition
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
