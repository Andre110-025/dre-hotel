<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
// import { user } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()
const loading = ref(false)

const showPassword = ref(false)

const authData = reactive({
    name: '',
    email: '',
    password: ''
})

const rules = computed(() => ({
    name: {
        required
    },
    email: {
        email,
        required
    },
    password: {
        required
    }
}))

const v$ = useVuelidate(rules, authData)

// const handleSignIn = async () => {
//   const isFormCorrect = await v$.value.$validate()
//   if (!isFormCorrect) return

//   try {
//     loading.value = true
//     await signUp(authData) 
//     toast.success('Account created successfully!')
    
//     setTimeout(() => {
//       router.push({ name: 'home' })
//     }, 3000);
    
//     authData.name = ''
//     authData.email = ''
//     authData.password = ''
//   } catch (error) {
//     toast.error(error.message || 'An error was encountered')
//     console.error(error)
//   } finally {
//     loading.value = false
//   }
// }


const handleSignIn = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  let storedUsers = userStore.allUsers || []
  
  // checks if it's saving as an array in the localstorage else set to empty array
  if (!Array.isArray(storedUsers)) {
    storedUsers = []
    userStore.allUsers = []
  }
  const userExists = storedUsers.find(u => u.email === authData.email)
  
  if (userExists) {
    toast.warning('Email already exists')
    return
  }

  try {
    loading.value = true

    const newUser = {
      id: Date.now(),
      name: authData.name,
      email: authData.email,
      password: authData.password,
    }

    // saving to general allusers
    userStore.allUsers.push(newUser)

    // if (!userStore.user.users) {
    //   userStore.user.users = []
    // }

    // sending to my user.js store
    userStore.user.users = newUser
    userStore.user.token = Math.random().toString(36).substring(2)
    userStore.user.expirationTime = Date.now() + 7 * 24 * 60 * 60 * 1000

    // this line create the localstorage for user
    // localStorage.setItem("users", JSON.stringify(storedUsers))

    // saves current user info
    // localStorage.setItem("currentUser", JSON.stringify(newUser))

    toast.success('Account created successfully')

    setTimeout(() => {
      router.push({ name: 'home' })
    }, 3000)

    // reset form
    authData.name = ''
    authData.email = ''
    authData.password = ''

  } catch (error) {
    toast.error('An Error was encountered')
    console.error(error)
  } finally {
    loading.value = false
  }
}

</script>


<template>
      <form class="max-w-lg w-full bg-white p-10 rounded-xl space-y-6" @submit.prevent="handleSignIn">
        <div class="space-y-1">
          <label for="name" class="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            v-model="authData.name"
            id="name"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl 
            focus:ring-1 focus:ring-slate-800 focus:border-slate-800 outline-none"
          />
        </div>

        <div class="space-y-1">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            v-model="authData.email"
            id="email"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl 
            focus:ring-1 focus:ring-slate-800 focus:border-slate-800 outline-none"
          />
        </div>

        <div class="space-y-1 relative">
    <label for="password" class="block text-sm font-medium text-gray-700">
      Password
    </label>
    <input
      :type="showPassword ? 'text' : 'password'"
      v-model="authData.password"
      id="password"
      class="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl 
             focus:ring-1 focus:ring-slate-800 focus:border-slate-800 outline-none"
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
      
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>

    </button>
  </div>

        <button
          :disabled="loading || v$.$invalid"
          type="submit"
          class="w-full bg-mainColor text-white py-3 rounded-xl font-semibold shadow 
          hover:bg-[#9c2828] transition
          disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sign Up
        </button>
      </form>

      <p class="text-center text-sm text-gray-600 mt-8">
        Already have an account?
        <RouterLink 
          :to="{ name: 'login' }" 
          class="text-indigo-600 font-medium hover:underline"
        >
          Log in
        </RouterLink>
      </p>
</template>
