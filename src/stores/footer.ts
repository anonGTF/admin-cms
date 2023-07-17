import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useFooterStore = defineStore('footer', () => {
  const socialMedia = ref([
    { id: 1, order: 1, label: "Instagram", permalink: "https://instagram.com", openNewTab: false },
		{ id: 2, order: 2, label: "Tiktok", permalink: "https://tiktok.com", openNewTab: false },
  ])
  const shortcutMenu1 = ref([])
  const shortcutMenu2 = ref([])
  const shortcutMenu3 = ref([])

  const fields = ref([
    { label: "Bagian", key: "section" },
    { label: "Menu Item", key: "item"},
    { label: "", key: "actions" }
  ])

  const detailFields = ref([
    { label: "", key: "delete" },
    { label: "Label", key: "label"},
    { label: "Permalink", key: "permalink" },
    { label: "", key: "openNewTab" }
  ])

  const footerItems = computed(() => ([
    { id: 1, section: "Social Media", item: `${socialMedia.value.length} link social media` },
		{ id: 2, section: "Shortcut Menu 1", item: `${shortcutMenu1.value.length} link menu 1` },
		{ id: 3, section: "Shortcut Menu 2", item: `${shortcutMenu2.value.length} link menu 2` },
		{ id: 4, section: "Shortcut Menu 3", item: `${shortcutMenu3.value.length} link menu 3` },
  ]))

  const getCorrectItems = (section: string) => {
    switch (section) {
      case "social-media":
        return socialMedia
      case "shortcut-menu-1":
        return shortcutMenu1
      case "shortcut-menu-2":
        return shortcutMenu2
      case "shortcut-menu-3":
        return shortcutMenu3
      default:
        return socialMedia
    }
  }

  const appendData = (section: string) => {
    const data = getCorrectItems(section)
    const nextIndex = data.value.length + 1
    data.value.push({
      id: nextIndex, order: nextIndex, label: "", permalink: "", openNewTab: false
    })
  }

  const deleteData = (id: number, section: string) => {
    const data = getCorrectItems(section)
    const index = data.value.findIndex(d => d.id === id)
    
    if (index > -1) {
      data.value.splice(index, 1)
    }
  }
  return { fields, detailFields, footerItems, getCorrectItems, appendData, deleteData }
})
