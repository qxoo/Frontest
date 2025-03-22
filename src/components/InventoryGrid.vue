<template>
  <div class="inventory">
    <div class="inventory_grid">
      <div
        v-for="cell in cells"
        :key="cell"
        class="inventory_grid__cell"
        @dragover.prevent
        @drop="onDrop(cell)"
      >
        <InventoryItem
          v-if="getItemByCell(cell)"
          :item="getItemByCell(cell)"
          @select="selectItem"
        />
      </div>
    </div>
    <ItemModal :item="selectedItem" @delete="deleteSelectedItem" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InventoryItem from './InventoryItem.vue'
import ItemModal from './ItemModal.vue'
import { useInventoryStore } from '@/stores/inventory'
import type { InventoryItem as InventoryItemType } from '@/stores/inventory'

const store = useInventoryStore()

const cells = Array.from({ length: 12 }, (_, i) => `cell-${i + 1}`)

const selectedItem = ref<InventoryItemType | null>(null)

function getItemByCell(cell: string): InventoryItemType | undefined {
  return store.items.find((item) => item.cell === cell)
}

function selectItem(item: InventoryItemType) {
  selectedItem.value = item
}

function onDrop(cell: string) {
  return (event: DragEvent) => {
    event.preventDefault()
    const itemId = event.dataTransfer?.getData('text/plain')
    if (itemId) {
      store.moveItem(itemId, cell)
    }
  }
}

function deleteSelectedItem(itemId: string) {
  store.removeItem(itemId)
  if (selectedItem.value?.id === itemId) {
    selectedItem.value = null
  }
}

if (store.items.length === 0) {
  store.items = [
    { id: crypto.randomUUID(), name: 'Меч', description: 'Острый меч.', cell: 'cell-1' },
    { id: crypto.randomUUID(), name: 'Щит', description: 'Прочный щит.', cell: 'cell-2' },
    { id: crypto.randomUUID(), name: 'Зелье', description: 'Лечит 50 HP.', cell: 'cell-3' },
  ]
}
</script>

<style lang="scss">
.inventory {
  display: flex;
  &_grid {
    display: grid;
    grid-template-columns: repeat(4, 100px);
    grid-template-rows: repeat(3, 100px);
    gap: 10px;
    padding: 20px;
    &__cell {
      background: var(--color-background-transparent-40);
      border: 1px solid var(--color-secondary-32);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100px;
    }
  }
}
</style>
