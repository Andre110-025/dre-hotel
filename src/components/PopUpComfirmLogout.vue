<script setup>
import { VueFinalModal } from 'vue-final-modal';
import { useUserStore } from '@/stores/user'
import { useRouter } from "vue-router"
import { toast } from "vue3-toastify"

const emit = defineEmits(['confirm'])
const userStore = useUserStore()
const router = useRouter()

const handleLogout = () => {

  const t = toast.loading('Logging user out...')

  setTimeout(() => {
    userStore.logOut()

    toast.success('Logged out successfully', { id: t })

    router.push({ name: 'login' })
    emit('confirm')
  }, 3000)
}
</script>

<template>
    <VueFinalModal
        class="flex h-full w-full items-center justify-center p-4"
        content-class="relative bg-white border w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        overlay-class="bg-black/60 backdrop-blur-sm"
        :overlayTransition="'vfm-fade'"
        :contentTransition="'vfm-fade'"
        :clickToClose="true"
        @click-outside="emit('confirm')"
    >
        <div class="p-6 text-center space-y-4">
            <h2 class="text-lg font-semibold text-gray-800">Confirm Action</h2>
            <p class="text-sm text-gray-600"> 
                Are you sure you want to Logout?
            </p>

            <div class="flex justify-center gap-3 pt-4">
      <button
        @click="emit('confirm')"
        class="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
      >
        Cancel
      </button>
      <button
        @click="handleLogout"
        class="px-4 py-2 text-sm rounded-lg bg-mainColor text-white hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
        </div>
    </VueFinalModal>
</template>