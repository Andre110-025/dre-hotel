<script setup>
import { useRouter } from "vue-router"
import { useUserStore } from '@/stores/user'
import IconUser from "@/components/IconUser.vue"
import EmailTwo from "@/components/EmailTwo.vue"
import IconLogout from "@/components/IconLogout.vue"
import IconDelete from "@/components/IconDelete.vue"
import { useModal } from "vue-final-modal"
import { toast } from "vue3-toastify"
import PopUpComfirmdelete from "@/components/popUpComfirmdelete.vue"

const userStore = useUserStore()
// const router = useRouter()
const currentUser = userStore.user.users

// let currentUser = JSON.parse(localStorage.getItem("currentUser"))

// const handleDelete = () => {
//   userStore.deleteUser()
// }

// const handleLogout = () => {
//   userStore.logOut()

//   setTimeout(() => {
//     toast.loading('Logging user out...')
//   }, 3000);
// }

const handleLogout = () => {

  const t = toast.loading('Logging user out...')

  setTimeout(() => {
    userStore.logOut()

    toast.success('Logged out successfully', { id: t })

    router.push({ name: 'login' })
  }, 3000)
}


const openPopUp = () => {
  const { open, close } = useModal({
    component: PopUpComfirmdelete,
    attrs: {
      onConfirm() {
        close()
      }
    }
  })

  open()
}
</script>

<template>
  <section class="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
    <div class="bg-white w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
      
      <!-- Profile Header -->
      <div class="flex flex-col items-center text-center">
        <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-mainColor to-red-700 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow">
          {{ currentUser?.name?.charAt(0).toUpperCase() }}
        </div>
        <h2 class="text-xl sm:text-2xl font-bold mt-3 sm:mt-4">
          Hello, {{ currentUser?.name }}
        </h2>
        <p class="text-gray-500 text-sm sm:text-base">Welcome back 👋</p>
      </div>

      <!-- User Info -->
      <div v-if="currentUser" class="divide-y divide-gray-200">
        <div class="flex items-center justify-between py-3 text-sm sm:text-base">
          <div class="flex items-center gap-2 sm:gap-3">
            <IconUser class="text-gray-600 sm:w-6 sm:h-6"/>
            <span class="font-medium">Name</span>
          </div>
          <span class="text-gray-700 truncate max-w-[50%] text-right">
            {{ currentUser.name }}
          </span>
        </div>
        
        <div class="flex items-center justify-between py-3 text-sm sm:text-base">
          <div class="flex items-center gap-2 sm:gap-3">
            <EmailTwo class="w-7 h-7 sm:w-7 sm:h-7 text-gray-600"/>
            <span class="font-medium">Email</span>
          </div>
          <span class="text-gray-700 truncate max-w-[50%] text-right">
            {{ currentUser.email }}
          </span>
        </div>
        
        <div 
          class="flex items-center justify-between py-3 text-sm sm:text-base"
        >
          <div 
            class="flex items-center gap-2 sm:gap-3 cursor-pointer" 
            @click="openPopUp"
          >
            <IconDelete class="w-7 h-7 sm:w-7 sm:h-7 text-gray-600"/>
            <span class="font-medium">Delete Account</span>
          </div>
          <span class="text-gray-700 truncate max-w-[50%] text-right">
            User
          </span>
        </div>
      </div>

      <!-- Logout -->
      <button
        v-if="currentUser"
        @click="handleLogout"
        class="flex items-center justify-center gap-2 w-full bg-slate-800 text-white py-2.5 rounded-xl font-medium hover:bg-slate-700 transition text-sm sm:text-base"
      >
        <IconLogout class="w-5 h-5"/>
        <span>Log out</span>
      </button>

      <div v-else class="text-center text-gray-500 text-sm sm:text-base">
        No user logged in.
      </div>
    </div>
  </section>
</template>

