<template>
  <table class="table is-striped is-hoverable">
    <thead>
      <th v-for="field in fields">
          <slot :name="`head(${field.key})`" :field="field">
            {{ field.label }}
          </slot>
        </th>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <template v-for="key in fieldKeys">
          <td>
            <slot
              :name="`cell(${key})`"
              :value="format(item, (key as string))"
              :item="item"
              :format="(k: string) => format(item, k)"
            >
              {{ format(item, (key as string)) }}
            </slot>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
  import { computed, type PropType } from 'vue';

  interface TableField {
    key: string
    label: string
    format?: Function
  }

  interface TableItem {
    id: number
    [key: string]: unknown
  }

  const { fields, items } = defineProps({
    fields: { type: Array as PropType<TableField[]>, default: () => [] },
    items: { type: Array as PropType<TableItem[]>, default: () => [] },
  })

  const fieldKeys = computed(() => {
    return Object.entries(fields).map(([_key, value]) => value.key)
  })

  const format = (item: TableItem, key: string) => {
    const field = fields.find((f) => f.key === key)
    return field && field.format ? field.format(item[key]) : item[key]
  }
</script>

<style scoped>

</style>