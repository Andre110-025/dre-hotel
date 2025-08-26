<script setup>
import { ref } from "vue"

const showPassword = ref(false)

const authData = ref({
  password: ''
})
</script>

<template>
  <div class="space-y-1 relative">
    <label for="password" class="block text-sm font-medium text-gray-700">
      Password
    </label>
    <input
      :type="showPassword ? 'text' : 'password'"
      v-model="authData.password"
      id="password"
      class="w-full px-4 py-3 border border-gray-300 rounded-xl 
             focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none pr-10"
    />
    <!-- Eye Toggle Button -->
    <button
      type="button"
      class="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
      @click="showPassword = !showPassword"
    >
      <!-- Eye Open -->
      <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>

      <!-- Eye Off -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7
             a9.956 9.956 0 012.045-3.338m3.106-2.506A9.955 9.955 0 0112 5
             c4.477 0 8.268 2.943 9.542 7a9.96 9.96 0 01-4.043 5.412M15 12
             a3 3 0 11-6 0 3 3 0 016 0zm-9.193-6.193L19.193 19.193" />
      </svg>
    </button>
  </div>
</template>

<script setup>

import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()

  const isDataFetched = ref(false)
  const Unauthorized = ref(false)

  const user = useStorage('storeDets', {
    token: null,
    expirationTime: null,
    users: null
  })

  const privileges = ref({
    can_edit: false,
    can_delete: false,
    can_create: false,
  })

  const resetData = reactive({
    id: null,
    email: null,
  })

  // 👉 Fake SignUp
  const signUp = async (authData) => {
    try {
      const fakeToken = Math.random().toString(36).substring(2)
      const fakeUser = {
        id: Date.now(),
        email: authData.email,
        role: 'guest',
        privileges: { can_edit: false, can_delete: false, can_create: false }
      }

      // Save to localStorage "fake DB"
      localStorage.setItem('fakeDBUser', JSON.stringify(fakeUser))

      user.value = {
        token: fakeToken,
        expirationTime: Date.now() + 3600 * 1000, // 1 hour expiry
        users: fakeUser
      }

      isDataFetched.value = true
      Unauthorized.value = false

      toast.success('Account created successfully!')
      router.push({ name: 'home' })
    } catch (error) {
      console.error("Signup failed:", error)
      toast.error("Failed to create account")
    }
  }

  // 👉 Fake Login
  const login = async (authData) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('fakeDBUser'))

      if (!storedUser || storedUser.email !== authData.email || authData.password.length < 3) {
        toast.error("Invalid email or password")
        return
      }

      const fakeToken = Math.random().toString(36).substring(2)

      user.value = {
        token: fakeToken,
        expirationTime: Date.now() + 3600 * 1000,
        users: storedUser
      }

      isDataFetched.value = true
      Unauthorized.value = false

      toast.success("Login successful!")
      router.push({ name: 'home' })
    } catch (error) {
      console.error("Login failed:", error)
      toast.error("Login failed")
    }
  }

  // 👉 Fake "getUserDetails" (pulls from localStorage)
  const getUserDetails = async () => {
    if (isDataFetched.value && user.value.users && !Unauthorized.value) {
      return
    }

    const storedUser = JSON.parse(localStorage.getItem('fakeDBUser'))
    if (storedUser && user.value.token) {
      user.value.users = storedUser
      privileges.value = storedUser.privileges
      isDataFetched.value = true
    } else {
      Unauthorized.value = true
      await $reset()
    }
  }

  const logOut = async () => {
    $reset()
  }

  const $reset = async () => {
    try {
      localStorage.removeItem('storeDets')
      localStorage.removeItem('fakeDBUser')

      user.value = {
        token: null,
        expirationTime: null,
        users: null
      }

      privileges.value = {
        can_edit: false,
        can_delete: false,
        can_create: false,
      }

      await router.push({ name: 'login' })
    } catch (error) {
      console.error('Error during reset:', error)
      window.location.href = '/auth'
    }
  }

  return {
    user,
    privileges,
    resetData,
    getUserDetails,
    logOut,
    $reset,
    signUp,
    login
  }
})

const handleSignIn = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  try {
    loading.value = true

    // ⬅️ get the wrapper object, not just an array
    const storedData = JSON.parse(localStorage.getItem('users')) || { users: [] }

    const newUser = {
      id: Date.now(),
      name: authData.name,
      email: authData.email,
      password: authData.password
    }

    // ⬅️ push into storedData.users
    storedData.users.push(newUser)

    // ⬅️ save the whole object back
    localStorage.setItem('users', JSON.stringify(storedData))

    const fakeToken = Math.random().toString(36).substring(2)
    const loggedInUser = {
      token: fakeToken,
      expirationTime: Date.now() + 7 * 24 * 60 * 60 * 1000,
      user: newUser
    }

    localStorage.setItem('authUser', JSON.stringify(loggedInUser))
    userStore.user = loggedInUser

    toast.success('Account created successfully!')
    setTimeout(() => {
      router.push({ name: 'home' })
    }, 3000)

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


let storedData = JSON.parse(localStorage.getItem('users'))

if (!storedData || Array.isArray(storedData)) {
  storedData = { users: storedData || [] }
}

const newUser = {
  id: Date.now(),
  name: authData.name,
  email: authData.email,
  password: authData.password
}

storedData.users.push(newUser)
localStorage.setItem('users', JSON.stringify(storedData))






const handleSignIn = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  let storedUsers = JSON.parse(localStorage.getItem("users")) || []
  if (!Array.isArray(storedUsers)) {
    storedUsers = []
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

    storedUsers.push(newUser)
    localStorage.setItem("users", JSON.stringify(storedUsers))

    localStorage.setItem("currentUser", JSON.stringify(newUser))

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



if (foundUser) {
  const token = Math.random().toString(36).substring(2) + Date.now().toString(36)

  userStore.user = {
    token,
    users: foundUser,
    expirationTime: Date.now() + 1000 * 60 * 60 // 1 hour
  }

  localStorage.setItem("currentUser", JSON.stringify(userStore.user)) // ✅ persist

  toast.success('Login Successful')
  setTimeout(() => {
    router.push({ name: 'home' })
  }, 3000)

  authData.email = ''
  authData.password = ''
}



const handleLogin = () => {
  const storedUsers = JSON.parse(localStorage.getItem("users")) || []

  const foundUser = storedUsers.find(
    u => u.email === form.value.email && u.password === form.value.password
  )

  if (!foundUser) {
    toast.error("Invalid email or password")
    return
  }

  // Save current session
  localStorage.setItem("currentUser", JSON.stringify(foundUser))

  toast.success("Welcome back, " + foundUser.name + "!")
  router.push("/home")
}

let storedUsers = JSON.parse(localStorage.getItem("users")) || []
storedUsers.push(newUser)
localStorage.setItem("users", JSON.stringify(storedUsers))

const storedUsers = JSON.parse(localStorage.getItem("users")) || []
const foundUser = storedUsers.find(
  u => u.email === authData.email && u.password === authData.password
)


</script>


