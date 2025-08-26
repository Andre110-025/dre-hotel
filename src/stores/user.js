import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'
import axios from "axios";
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

    const getUserDetails = async () => {
        if (isDataFetched.value && user.value.users && !Unauthorized.value) {
            return
        }

        if (Unauthorized.value && !user.value.token) {
            await $reset()
            return
        }

        try {
            const { data } = await axios.get('/users', {
                headers: {
                    Authorization: `Bearer ${user.value.token}`
                }
            })

            if (data.success) {
                // getting this from data.user
                const {
                    email,
                    role,
                    privileges,
                    ...otherUserDetails
                }  = data['users'][0]

                user.value.users = {
                    email,
                    role,
                    privileges,
                    ...otherUserDetails
                }

                // might be true from backend, so if no role assined to user set to false
                privileges.value = data?.users[0]?.privileges || {
                    can_edit: false,
                    can_delete: false,
                    can_create: false,
                }

                isDataFetched.value = true
                Unauthorized.value = false
            }  else {
                toast.error("Failed to fetch user details")
                await $reset()
            }
        } catch (error) {
            console.error("Error in getUserDetails:", error)
            Unauthorized.value = true
        }
    }

    const logOut = async () => {
        try {
            await axios.get('logout')
        } catch (error) {
        console.error('Logout failed:', error)
        } finally {
        $reset()
        }
    }


    const $reset = async () => {
        try {
            delete axios.defaults.headers.common['Authorization']

            localStorage.removeItem('storeDets')

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
        }  catch (error) {
            console.error('Error during reset:', error)
            // Force navigation even if there's an error
            window.location.href = '/auth'
        }
    }

    return {
        user,
        privileges,
        resetData,
        getUserDetails,
        logOut,
        $reset
    }
})