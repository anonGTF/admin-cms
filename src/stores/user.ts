import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    name: "Jane Doe",
    email: "jane.doe@mail.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80",
    role: "Master Admin"
  })

  const roles = ref([
    "Master Admin",
    "Admin Sekolah",
    "Admin Yayasan"
  ])
  return { user, roles }
})
