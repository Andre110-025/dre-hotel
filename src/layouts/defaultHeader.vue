<script setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { computed, ref, watch } from 'vue'
import IconHome from '@/components/IconHome.vue'
import IconAboutUs from '@/components/IconAboutUs.vue'
import IconExplore from '@/components/IconExplore.vue'
import IconSuites from '@/components/IconSuites.vue'
import IconContact from '@/components/IconContact.vue'

const userStore = useUserStore()
const isLoggedIn = computed(() => 
  userStore.user.token !== null && userStore.user.expirationTime !== null
)

const handleLogout = () => {
  userStore.logOut()
}

const showMenu = ref(false)

// 🔒 Lock/unlock body scroll when modal is open
watch(showMenu, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})
</script>

<template>
  <div class="bg-white text-black">
    <header
      class="fixed top-0 left-0 w-full px-4 sm:px-8 py-3 flex justify-between items-center z-50 bg-white shadow-md"
    >
      <img 
        src="/sitelogo.png" 
        class="h-[60px] w-auto pl-3 object-contain"
      />

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center space-x-6 tracking-wide font-semibold pr-4 sm:pr-10">
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/about">About us</RouterLink>
        <RouterLink to="/explore">Explore</RouterLink>
        <RouterLink to="/suites">Suites</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>

        <RouterLink 
          v-if="!isLoggedIn"
          :to="{ name: 'login' }" 
          class="bg-mainColor text-white px-4 py-2 rounded-lg hover:bg-[#9c2828] transition"
        >
          Sign In
        </RouterLink>

        <button 
          v-else 
          @click="handleLogout"
          class="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
        >
          Logout
        </button>
      </nav>

      <!-- Mobile Hamburger -->
      <button @click="showMenu = true" class="md:hidden p-2 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-mainColor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>

    <!-- Overlay Modal -->
    <transition name="fade">
      <div 
        v-if="showMenu"
        class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        @click="showMenu = false"
      ></div>
    </transition>

    <!-- Mobile Sidebar -->
    <transition name="slide">
      <div
        v-if="showMenu"
        class="fixed top-0 right-0 w-72 h-full bg-white shadow-2xl z-50 flex flex-col p-6"
      >
        <!-- Close Button -->
        <button @click="showMenu = false" class="self-end mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-mainColor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="flex flex-col space-y-2">
  <RouterLink
    :to="{ name: 'home' }"
    class="flex flex-row items-center gap-3 px-2 py-1 rounded-lg hover:bg-gray-100 hover:text-mainColor transition"
    active-class="bg-gray-100 text-mainColor font-semibold"
    @click="showMenu = false"
  >
    <IconHome class="w-5 h-5" />
    <span>Home</span>
  </RouterLink>

  <RouterLink
    :to="{ name: 'about' }"
    class="flex flex-row items-center gap-3 px-2 py-1 rounded-lg hover:bg-gray-100 hover:text-mainColor transition"
    active-class="bg-gray-100 text-mainColor font-semibold"
    @click="showMenu = false"
  >
    <IconAboutUs class="w-5 h-5" />
    <span>About us</span>
  </RouterLink>

  <RouterLink
    :to="{ name: 'explore' }"
    class="flex flex-row items-center gap-3 px-2 py-1 rounded-lg hover:bg-gray-100 hover:text-mainColor transition"
    active-class="bg-gray-100 text-mainColor font-semibold"
    @click="showMenu = false"
  >
    <IconExplore class="w-5 h-5" />
    <span>Explore</span>
  </RouterLink>

  <RouterLink
    :to="{ name: 'suites' }"
    class="flex flex-row items-center gap-3 px-2 py-1 rounded-lg hover:bg-gray-100 hover:text-mainColor transition"
    active-class="bg-gray-100 text-mainColor font-semibold"
    @click="showMenu = false"
  >
    <IconSuites class="w-5 h-5" />
    <span>Suites</span>
  </RouterLink>

  <RouterLink
    :to="{ name: 'contact' }"
    class="flex flex-row items-center gap-3 px-2 py-1 rounded-lg hover:bg-gray-100 hover:text-mainColor transition"
    active-class="bg-gray-100 text-mainColor font-semibold"
    @click="showMenu = false"
  >
    <IconContact class="w-5 h-5" />
    <span>Contact</span>
  </RouterLink>

  <RouterLink 
    v-if="!isLoggedIn"
    :to="{ name: 'login' }" 
    class="bg-mainColor text-white px-10 py-1.5 rounded-lg hover:bg-[#9c2828] transition mt-3 ml-2"
    @click="showMenu = false"
  >
    Sign In
  </RouterLink>

  <button 
    v-else 
    @click="handleLogout"
    class="bg-slate-700 text-white px-10 py-1.5 rounded-lg hover:bg-slate-800 transition mt-3 ml-2"
  >
    Logout
  </button>
</div>

      </div>
    </transition>
  </div>
</template>
