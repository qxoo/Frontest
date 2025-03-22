<template>
  <div class="inventory_item" draggable="true" @dragstart="onDragStart" @click="selectItem">
    <p class="inventory_item__name">{{ item.name }}</p>
  </div>
</template>

<script setup lang="ts">
import type { InventoryItem } from '@/stores/inventory'

const props = defineProps<{ item: InventoryItem }>()
const emit = defineEmits<{ (e: 'select', item: InventoryItem): void }>()

function onDragStart(e: DragEvent) {
  e.dataTransfer?.setData('text/plain', props.item.id)
}

function selectItem() {
  emit('select', props.item)
}
</script>

<style lang="scss">
.inventory_item {
  background-color: var(--color-background-component);
  border: 1px solid var(--color-secondary);
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
}
</style>
