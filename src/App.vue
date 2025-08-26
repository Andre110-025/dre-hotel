<script setup>
import DefaultHeader from './layouts/defaultHeader.vue'
import { RouterView, useRoute } from 'vue-router'
import { ModalsContainer } from 'vue-final-modal'

const route = useRoute()
</script>

<template>
  <DefaultHeader />

  <main class="pt-[80px]">
    <RouterView />
    <ModalsContainer />
  </main>
</template>
