<script setup lang="ts">
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { supabase } from '@/lib/supabaseClient'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Tables } from 'database/types'
import { RouterLink } from 'vue-router'

usePageStore().pageData.title = 'Projects'

const projects = ref<Tables<'projects'>[] | null>(null)
const getProjects = async () => {
  const { data, error } = await supabase.from('projects').select()

  if (error) console.log(error)

  projects.value = data
}

await getProjects()

const columns: ColumnDef<Tables<'projects'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
  },
]
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects">
    <template #cell-name="{ cell }">
      <RouterLink :to="`/projects/${cell.row.original.slug}`">
        {{ cell.getValue() }}
      </RouterLink>
    </template>
  </DataTable>
</template>
