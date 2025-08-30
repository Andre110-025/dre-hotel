<script setup>
import { VueFinalModal } from 'vue-final-modal';
import { useUserStore } from '@/stores/user'
import { useRouter } from "vue-router"
import { toast } from "vue3-toastify"

const userStore = useUserStore()
const router = useRouter()
const emit = defineEmits(['confirm'])

const handleDelete = () => {
  userStore.deleteUser()

   const toastId = toast.loading('Finalizing account deletion...')

  setTimeout(() => {
    toast.success('Account deleted successfully', { id: toastId })
    router.push({ name: 'login' })

    emit('confirm') // 🔥 triggers parent’s onConfirm -> closes modal
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
    <!-- Warning Icon -->
    <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
      <svg class="h-6 w-6 text-mainColor" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L4.34 16c-.77 1.333.192 3 1.732 3z"/>
      </svg>
    </div>

    <!-- Title & Message -->
    <h2 class="text-lg font-semibold text-gray-800">Confirm Action</h2>
    <p class="text-sm text-gray-600">
      This action <span class="font-semibold text-mainColor">cannot be undone</span>.  
      Are you sure you want to delete your account?
    </p>

    <!-- Actions -->
    <div class="flex justify-center gap-3 pt-4">
      <button
        @click="emit('confirm')"
        class="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
      >
        Cancel
      </button>
      <button
        @click="handleDelete"
        class="px-4 py-2 text-sm rounded-lg bg-mainColor text-white hover:bg-red-700 transition"
      >
        Delete
      </button>
    </div>
  </div>
</VueFinalModal>

</template>