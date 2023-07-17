import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useHeaderStore = defineStore('header', () => {
  type ObjectType = { [key: string]: unknown}

  const headers = ref([
    { 
      id: 1, 
      order: 1, 
      label: "Tentang Yayasan", 
      permalink: "tentang-yayasan", 
      openNewTab: true ,
      children: [] as ObjectType[]
    },
    { 
      id: 2, 
      order: 2, 
      label: "Laziz", 
      permalink: "", 
      status: "active", 
      openNewTab: false,
      children: [
        { id: 1, order: 1, label: 'Sekolah Dasar', permalink: 'sekolah-dasar', openInNewTab: false },
        { id: 2, order: 2, label: 'Taman Kanak', permalink: 'taman-kanak', openInNewTab: true },
      ]
    },
    { 
      id: 3, 
      order: 3, 
      label: "Sekolah", 
      permalink: "", 
      status: "inactive", 
      openNewTab: false,
      children: [
        { id: 1, order: 1, label: 'Sekolah Dasar', permalink: 'sekolah-dasar', openInNewTab: false },
        { id: 2, order: 2, label: 'Taman Kanak', permalink: 'taman-kanak', openInNewTab: true },
      ]
    },
  ])

  const fields = ref([
    { label: "", key: "delete" },
    { label: "Label", key: "label" },
    { label: "Permalink", key: "permalink"},
    { label: "", key: "openNewTab" }
  ])

  const childrenFields = ref([
    { label: '', key: 'icon' },
    { label: '', key: 'delete' },
    { label: '', key: 'label' },
    { label: '', key: 'permalink' },
    { label: '', key: 'openNewTab' },
  ])

  const appendData = () => {
    const data = headers
    const nextIndex = data.value.length + 1

    data.value.push({ 
      id: nextIndex, 
      order: nextIndex, 
      label: "", 
      permalink: "", 
      openNewTab: false,
      children: []
    })
  }

  const appendChild = (id: number) => {
    const data = headers.value.find(d => d.id === id)

    if (data === undefined) return

    const nextIndex = data?.children.length + 1

    data?.children.push({
      id: nextIndex, 
      order: nextIndex, 
      label: '', 
      permalink: '', 
      openInNewTab: false
    }) 

  }

  const deleteData = (id: number) => {
    const data = headers
    const index = data.value.findIndex(d => d.id === id)
    
    if (index > -1) {
      data.value.splice(index, 1)
    }
  }

  const deleteChild = (id: number, parentId: number) => {
    const data = headers.value.find(d => d.id === parentId)
    const index = data?.children.findIndex(d => d.id === id)
    if (index !== undefined && index > -1) {
      data?.children.splice(index, 1)
    }
  }
  return { fields, childrenFields, headers, appendData, deleteData, appendChild, deleteChild }
})
