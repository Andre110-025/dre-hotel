<script setup>
import IconEmail from './IconEmail.vue';
import IconFacebook from './IconFacebook.vue';
import IconIg from './IconIg.vue';
import IconLocation from './IconLocation.vue';
import IconPhone from './IconPhone.vue';
import IconWhatsapp from './IconWhatsapp.vue';
import IconX from './IconX.vue';

</script>

<template>
  <footer class="bg-[#0d0d0d] border-t border-neutral-800 text-gray-300">
    <div class="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
      
      <!-- Column 1: Brand -->
      <div>
        <h3 class="text-xl font-bold text-white tracking-tight mb-4">Dre Hotel</h3>
        <p class="text-sm leading-relaxed text-gray-400">
          Experience unmatched comfort and luxury in the heart of the city. Dre Hotel offers premium rooms, fine dining, and personalized service for every guest.
        </p>
      </div>

      <!-- Column 2: Follow Us -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Follow Us</h3>
        <ul class="space-y-3 text-sm">
          <li class="flex items-center gap-2 hover:text-white transition-colors duration-300 cursor-pointer">
            <IconFacebook class="w-4 h-4" /> Dre_hotel & suites
          </li>
          <li class="flex items-center gap-2 hover:text-white transition-colors duration-300 cursor-pointer">
            <IconX class="w-4 h-4" /> @andreharry35643
          </li>
          <li class="flex items-center gap-2 hover:text-white transition-colors duration-300 cursor-pointer">
            <IconIg class="w-4 h-4" /> dre-house676
          </li>
          <li class="flex items-center gap-2 hover:text-white transition-colors duration-300 cursor-pointer">
            <IconWhatsapp class="w-4 h-4" /> (675)-979-6255
          </li>
        </ul>
      </div>

      <!-- Column 3: Contact -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Contact</h3>
        <ul class="space-y-3 text-sm">
          <li class="flex items-center gap-2 hover:text-white transition-colors duration-300 cursor-pointer">
            <IconEmail class="w-4 h-4" /> info@andrehotel.com
          </li>
          <li class="flex items-center gap-2 hover:text-white transition-colors duration-300 cursor-pointer">
            <IconPhone class="w-4 h-4" /> (832)-624-7087
          </li>
          <li class="flex items-center gap-2 hover:text-white transition-colors duration-300 cursor-pointer">
            <IconLocation class="w-4 h-4" /> Cape Verde, Santa Maria (Sal Island)
          </li>
        </ul>
      </div>

      <!-- Column 4: Newsletter -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Newsletter</h3>
        <p class="text-sm text-gray-400 mb-4">
          Stay updated with our latest offers and events.
        </p>
        <div class="flex">
          <input
            type="email"
            placeholder="Your email"
            class="px-3 py-2 text-sm rounded-l-md bg-white border focus:outline-none focus:border-gray-500 text-white placeholder-gray-500 w-full"
          />
          <button class="px-4 py-2 bg-mainColor text-white text-sm font-medium rounded-r-md hover:bg-mainColor transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>

    <div class="border-t border-neutral-800 mt-6 py-6 text-center text-xs text-gray-500">
      © 2025 Dre Hotel. All rights reserved.
    </div>
  </footer>
</template>
