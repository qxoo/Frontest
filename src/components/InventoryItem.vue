<template>
  <div
    class="inventory_item"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
    @click="selectItem"
  >
    <img class="inventory_item__img" :src="item.image" :alt="item.name" />
    <span class="inventory_item__quantity">{{ item.quantity }}</span>
  </div>
</template>

<script setup lang="ts">
import type { InventoryItem } from '@/stores/inventory'
import { useInventoryStore } from '@/stores/inventory'

const props = defineProps<{ item: InventoryItem }>()
const emit = defineEmits<{ (e: 'select', item: InventoryItem): void }>()
const store = useInventoryStore()

function onDragStart(e: DragEvent) {
  e.dataTransfer?.setData('text/plain', props.item.id)
}

function onDragEnd(e: DragEvent) {
  if (e.dataTransfer && e.dataTransfer.dropEffect === 'none') {
    store.removeItem(props.item.id)
  }
}

function selectItem() {
  emit('select', props.item)
}
</script>

<style lang="scss">
.inventory_item {
  position: relative;
  background-color: var(--color-background-component);
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
  &__img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    aspect-ratio: 1;
  }
  &__quantity {
    position: absolute;
    bottom: 0;
    right: 0;
    background: var(--color-background-component);
    color: gray;
    border-radius: 12px 0 0 0;
    font-size: 12px;
    padding: 4px 4px 0 8px;
    border-left: 1px solid var(--color-secondary);
    border-top: 1px solid var(--color-secondary);
  }
}
</style>
