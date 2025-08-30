<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { toast } from 'vue3-toastify'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()
const loading = ref(false)

const authData = reactive({
    email: ''
})

const rules = computed(() => ({
    email: { email, required }
}))

const v$ = useVuelidate(rules, authData)

const handleForgetPassword = async () => {
    const isFormCorrect = await v$.value.$validate()
    if (!isFormCorrect) return

    try {
        loading.value = true
        const storedUsers = userStore.allUsers || []
        const foundUser = storedUsers.find(
            u => u.email === authData.email
        )

        if (!foundUser) {
            toast.error("Email not found")
            return
        }

        toast.loading('Processing reset password...')

        userStore.resetData.email = foundUser.email
        userStore.resetData.id = foundUser.id

        setTimeout(() => {
            router.push({ name: 'changepwd' })
        }, 3000);

        authData.email = ''

    }   catch (error) {
        toast.error('Something went wrong')
    }  finally {
        loading.value = false
    }
}
</script>

<template>
    <form
        @submit.prevent="handleForgetPassword" 
        class="max-w-lg w-full bg-white p-10 rounded-xl space-y-5"
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
        <div class="flex items-center justify-between text-sm">
            <!-- <RouterLink 
                class="text-indigo-600"
                :to="{ name: 'login' }"
            >
                Go back
            </RouterLink> -->
        </div>
        <button
            :disabled="loading || v$.$invalid"
            type="submit"
            class="w-full bg-mainColor text-white py-3 rounded-xl font-semibold shadow 
            hover:bg-[#9c2828] transition
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
            Reset Password
        </button>
    </form>
</template>