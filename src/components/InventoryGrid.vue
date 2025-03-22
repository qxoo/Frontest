<template>
  <div class="inventory">
    <div class="inventory_grid scroll-x">
      <div
        v-for="cell in cells"
        :key="cell"
        class="inventory_grid__cell"
        :class="{ 'drag-over': dragOverCell === cell }"
        @dragover.prevent
        @dragenter="onDragEnter(cell)"
        @dragleave="onDragLeave(cell)"
        @drop="onDrop(cell)"
      >
        <InventoryItem
          v-if="getItemByCell(cell)"
          :item="getItemByCell(cell)"
          @select="selectItem"
        />
      </div>
    </div>
    <Transition name="details">
      <ItemModal
        v-if="selectedItem"
        :item="selectedItem"
        @delete="deleteSelectedItem"
        @close="selectedItem = null"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import InventoryItem from './InventoryItem.vue'
import ItemModal from './ItemModal.vue'
import { useInventoryStore } from '@/stores/inventory'
import type { InventoryItem as InventoryItemType } from '@/stores/inventory'

const store = useInventoryStore()

const cells = computed(() => store.cells)

const selectedItem = ref<InventoryItemType | null>(null)
const dragOverCell = ref<string | null>(null)

const getItemByCell = (cell: string): InventoryItemType | undefined => {
  return store.items.find((item) => item.cell === cell)
}

const selectItem = (item: InventoryItemType) => {
  selectedItem.value = item
}

const onDrop = (cell: string) => {
  const itemId = event.dataTransfer?.getData('text/plain')
  if (itemId) {
    store.moveItem(itemId, cell)
  }
  dragOverCell.value = null
}

function onDragEnter(cell: string) {
  dragOverCell.value = cell
}

function onDragLeave(cell: string) {
  if (dragOverCell.value === cell) {
    dragOverCell.value = null
  }
}

const deleteSelectedItem = (itemId: string) => {
  store.removeItem(itemId)
  if (selectedItem.value?.id === itemId) {
    selectedItem.value = null
  }
}
</script>

<style lang="scss">
.inventory {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: var(--color-background-component);
  &_grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, calc((100svw - 324px) / 8));
    grid-template-rows: repeat(auto-fill, calc((100svw - 324px) / 8));
    @media (max-width: 1920px) {
      grid-template-columns: repeat(auto-fill, calc((100svw - 324px) / 6));
      grid-template-rows: repeat(auto-fill, calc((100svw - 324px) / 6));
    }
    @media (max-width: 1228px) {
      grid-template-columns: repeat(auto-fill, calc((100svw - 324px) / 4));
      grid-template-rows: repeat(auto-fill, calc((100svw - 324px) / 4));
    }
    &__cell {
      border: 1px solid var(--color-secondary);
      display: flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1;
      width: calc((100svw - 324px) / 8);
      &:first-child {
        border-radius: 12px 0 0 0;
      }
      &:nth-child(8) {
        border-radius: 0 12px 0 0;
      }
      &:last-child {
        border-radius: 0 0 12px 0;
      }
      &:nth-last-child(8) {
        border-radius: 0 0 0 12px;
      }
      @media (max-width: 1920px) {
        width: calc((100svw - 324px) / 6);
        &:nth-child(6) {
          border-radius: 0 12px 0 0;
        }
        &:nth-last-child(6) {
          border-radius: 0 0 0 12px;
        }

        &:nth-child(8),
        &:nth-last-child(8) {
          border-radius: 0;
        }
      }
      @media (max-width: 1228px) {
        width: calc((100svw - 324px) / 4);
        &:nth-child(4) {
          border-radius: 0 12px 0 0;
        }
        &:nth-last-child(4) {
          border-radius: 0 0 0 12px;
        }

        &:nth-child(6),
        &:nth-last-child(6) {
          border-radius: 0;
        }
      }
    }
    .inventory_grid__cell.drag-over {
      border: 2px dashed var(--color-secondary);
    }
  }
}
</style>
