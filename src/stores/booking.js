// stores/booking.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookingStore = defineStore('booking', () => {
  const currentBooking = ref(null)

  const setBooking = (bookingData) => {
    currentBooking.value = bookingData
  }

  const clearBooking = () => {
    currentBooking.value = null
  }

  return { currentBooking, setBooking, clearBooking }
})