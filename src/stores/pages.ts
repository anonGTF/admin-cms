import { defineStore } from "pinia"
import { ref } from "vue"

export const usePagesStore = defineStore('pages', () => {
  const pages = ref([
    { id: 1, page: "Homepage", permalink: "almanshur.com", status: "always", actions: null },
    { id: 2, page: "Tentang Yayasan", permalink: "almanshur.com/tentang-yayasan", status: "active", actions: null },
    { id: 3, page: "Laziz", permalink: "almanshur.com/laziz", status: "inactive", actions: null },
  ])

  const fields = ref([
    { label: "Halaman", key: "page" },
    { label: "Permalink", key: "permalink"},
    { label: "Status", key: "status" },
    { label: "", key: "actions" }
  ])
  return { pages, fields }
})
