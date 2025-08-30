<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers, minLength } from '@vuelidate/validators'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useHelpers } from '@/helper'
import IconEye from './IconEye.vue'
import IconHidden from './IconHidden.vue'
// import { user } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()
const loading = ref(false)

const showPassword = ref(false)

const { containsUppercase, containsLowercase, containsNumber, containsSpecial } = useHelpers();

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
        required: helpers.withMessage('Password is required', required),
        minLength: helpers.withMessage(
          'Password must be at least 8 characters', minLength(8)
        ),
        containsUppercase: helpers.withMessage(
          'Password must include uppercase', containsUppercase
        ),
        containsLowercase: helpers.withMessage(
          'Password must include lowercase', containsLowercase
        ),
        containsNumber: helpers.withMessage(
          'Password must include numbers', containsNumber
        ),
        containsSpecial: helpers.withMessage(
          'Password must include any of (#?!@$()`~%^&*-+=)', containsSpecial
        )
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
  if (!isFormCorrect) return;

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
    userStore.user = {
      users: newUser,
      token: Math.random().toString(36).substring(2),
      expirationTime: Date.now() + 7 * 24 * 60 * 60 * 1000
    }

    // sending this to resetdate in case of reset password
    userStore.resetData.email = newUser.email
    userStore.resetData.id = newUser.id

    // this line create the localstorage for user
    // localStorage.setItem("users", JSON.stringify(storedUsers))

    // saves current user info
    // localStorage.setItem("currentUser", JSON.stringify(newUser))

    toast.success('Account created successfully')

    setTimeout(() => {
      router.push({ name: 'home' })
    }, 3000)

    v$.value.$reset()

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
            :class="{
              'border-red-500': v$.password.$error && v$.password.$dirty,
            }"
            @blur="v$.password.$touch"
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
        <ul
          v-if="v$.password.$error && v$.password.$dirty"
          class="my-5 flex flex-col justify-center gap-1 text-xs"
        >
          <li
            v-for="(item, index) in v$.password.$errors"
            :key="index"
            class="ml-5 text-red-500"
            v-text="item.$message"
          ></li>
        </ul>

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
