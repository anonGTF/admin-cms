<template>
  <table class="table is-hoverable">
    <thead>
      <th v-for="field in fields">
        <slot :name="`head(${field.key})`" :field="field">
          {{ field.label }}
        </slot>
      </th>
      <th v-if="hasChild" class="is-narrow"></th>
      <th>Urutan</th>
    </thead>
    <tbody>
      <template v-for="item in orderedItems" :key="item.id">
        <tr>
          <td template v-for="key in fieldKeys">
            <slot
              :name="`cell(${key})`"
              :value="format(item, (key as string))"
              :item="item"
              :format="(k: string) => format(item, k)"
            >
              {{ format(item, (key as string)) }}
            </slot>
          </td>
          <td v-if="hasChild" class="bg-black-subtle is-narrow">
            <button 
              class="button is-outlined"
              @click="expand(item)"
            >
              <span class="icon is-small">
                <i class="mdi" :class="[(item.isExpanded) ? 'mdi-chevron-up' : 'mdi-chevron-down']"></i>
              </span>
            </button>
          </td>
          <td>
            <div class="field is-grouped">
              <div class="control">
                <button 
                  class="button is-outlined" 
                  @click="swapRow(item.order, 'up')" 
                  :disabled="item.order === 1"
                >
                  <span class="icon is-small">
                    <i class="mdi mdi-arrow-up"></i>
                  </span>
                </button>
              </div>
              <div class="control">
                <button 
                  class="button is-outlined"
                  @click="swapRow(item.order, 'down')" 
                  :disabled="item.order === items.length"
                >
                  <span class="icon is-small">
                    <i class="mdi mdi-arrow-down"></i>
                  </span>
                </button>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="item.isExpanded">
          <td colspan="100" class="bg-white-muted">
            <div class="bg-white-muted">
              <table class="table is-hoverable bg-white-muted">
                <tbody>
                  <tr v-for="child in orderedChildren(item)">
                    <template v-for="key in childKeys">
                      <td>
                        <slot
                          :name="`childCell(${key})`"
                          :value="formatChild(child, (key as string))"
                          :item="child"
                          :format="(k: string) => formatChild(child, k)"
                        >
                          {{ formatChild(child, (key as string)) }}
                        </slot>
                      </td>
                    </template>
                    <td>
                      <div class="field is-grouped">
                        <div class="control">
                          <button 
                            class="button is-outlined" 
                            @click="swapChildRow(child.order, 'up', item)" 
                            :disabled="child.order === 1"
                          >
                            <span class="icon is-small">
                              <i class="mdi mdi-arrow-up"></i>
                            </span>
                          </button>
                        </div>
                        <div class="control">
                          <button 
                            class="button is-outlined"
                            @click="swapChildRow(child.order, 'down', item)" 
                            :disabled="child.order === item.children?.length"
                          >
                            <span class="icon is-small">
                              <i class="mdi mdi-arrow-down"></i>
                            </span>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button class="button mb-4 ml-4">
                <span class="icon">
                  <i class="mdi mdi-plus"></i>
                </span>
                <span>Tambah menu turunan</span>
              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup lang="ts">
  import { computed, ref, type PropType } from 'vue';

  type ObjectAlias = {
    [key: string]: unknown
  }

  interface TableField {
    key: string
    label: string
    format?: Function
  }

  interface TableItem {
    id: number
    order: number
    children?: TableItem[]
    isExpanded?: Boolean
    [key: string]: unknown
  }

  const { fields, childFields, initialItems, hasChild } = defineProps({
    fields: { type: Array as PropType<TableField[]>, default: () => [] },
    childFields: { type: Array as PropType<TableField[]>, default: () => [] },
    initialItems: { type: Array as PropType<TableItem[]>, default: () => [] },
    hasChild: { type: Boolean, default: false }
  })

  const items = ref(initialItems)

  const orderedItems = computed(() => items.value.sort((a, b) => a.order - b.order))

  const fieldKeys = computed(() => {
    return Object.entries(fields).map(([_key, value]) => value.key)
  })

  const format = (item: TableItem, key: string) => {
    const field = fields.find((f) => f.key === key)
    return field && field.format ? field.format(item[key]) : item[key]
  }

  const swapRow = (currentOrder: number, direction: string) => {
    const currentIndex = items.value.findIndex(item => item.order === currentOrder);
    
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

    if (newIndex >= 0 && newIndex < items.value.length) {
      const temp = items.value[currentIndex].order;
      items.value[currentIndex].order = items.value[newIndex].order;
      items.value[newIndex].order = temp;
    }
  }

  const expand = (item: TableItem) => {
    item.isExpanded = !item.isExpanded
  }

  const childKeys = computed(() => {
    return Object.entries(childFields).map(([_key, value]) => value.key)
  })

  const orderedChildren = (item: TableItem) => item.children?.sort((a, b) => a.order - b.order)

  const formatChild = (item: ObjectAlias, key: string) => {
    const field = childFields.find((f) => f.key === key)
    return field && field.format ? field.format(item[key]) : item[key]
  }

  const swapChildRow = (currentOrder: number, direction: string, item: TableItem) => {
    const currentIndex = item.children?.findIndex(item => item.order === currentOrder) ?? -1;
    
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

    if (newIndex >= 0 && newIndex < items.value.length) {
      const temp = item.children![currentIndex].order;
      item.children![currentIndex].order = item.children![newIndex].order;
      item.children![newIndex].order = temp;
    }
  }
</script>

<style scoped>

</style>