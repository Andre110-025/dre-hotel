<script setup>
import { ref, reactive, computed } from 'vue';
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minLength, sameAs } from '@vuelidate/validators'
import { useHelpers } from "../helper";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import IconEye from './IconEye.vue';
import IconHidden from './IconHidden.vue';

const router = useRouter();
const userStore = useUserStore();
const showPassword = ref(false)
const loading = ref(false);

const authData = reactive({
  password: '',
  cPassword: ''
})

const { containsUppercase, containsLowercase, containsNumber, containsSpecial } = useHelpers();

const rules = computed(() => ({
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
  },
  cPassword: {
    required: helpers.withMessage('Confirm Password is required', required),
    sameAs: helpers.withMessage('Passwords must match', sameAs(() => authData.password))
  }
}))

const v$ = useVuelidate(rules, authData);

const handleResetPassword = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;

  try {
    loading.value = true;

    const storedUsers = userStore.allUsers || []
    const foundUser = storedUsers.find(
      u => u.id === userStore.resetData.id
    )

    if (foundUser) {
      // update password
      foundUser.password = authData.password
      userStore.allUsers = storedUsers // useStorage syncs to localStorage

      toast.success('Password reset successful! Please login again.')

      userStore.resetData.id = null
      userStore.resetData.email = null

      setTimeout(() => {
        router.push({ name: 'login' })
      }, 1500);

      v$.value.$reset()
      authData.password = ''
      authData.cPassword = ''
    } else {
      toast.error("User not found")
    }
  } catch (error) {
    toast.error('Something went wrong')
  } finally {
    loading.value = false
  }
}
</script>

<template>
    <form
        @submit.prevent="handleResetPassword"
        class="max-w-lg w-full bg-white p-10 rounded-xl space-y-6"
    >
        <div class="space-y-2 relative">
            <label for="email" class="block text-sm font-medium text-gray-700">
                Password
            </label>
            <input
  :type="showPassword ? 'text' : 'password'"
  v-model="authData.password"
  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-1 focus:ring-slate-800 focus:border-slate-800 outline-none"
  :class="{
    'border-red-500': v$.password.$error && v$.password.$dirty,
  }"
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
  class="my-2 flex flex-col gap-1 text-xs"
>
  <li
    v-for="(item, index) in v$.password.$errors"
    :key="index"
    class="ml-5 text-red-500"
    v-text="item.$message"
  ></li>
</ul>

        <div class="space-y-2 relative">
            <label for="email" class="block text-sm font-medium text-gray-700">
                Confirm Password
            </label>
            <input
  :type="showPassword ? 'text' : 'password'"
  v-model="authData.cPassword"
  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-1 focus:ring-slate-800 focus:border-slate-800 outline-none"
  :class="{
    'border-red-500': v$.cPassword.$error && v$.cPassword.$dirty,
  }"
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
  v-if="v$.cPassword.$error && v$.cPassword.$dirty"
  class="my-2 flex flex-col gap-1 text-xs"
>
  <li
    v-for="(item, index) in v$.cPassword.$errors"
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
          Proceed
        </button>
    </form>
</template>