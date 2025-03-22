<template>
  <div class="item-modal" :class="{ 'item-modal--active': item }">
    <div class="item-modal_content">
      <h2 class="item-modal_content__title">{{ item?.name }}</h2>
      <p class="item-modal_content__description">{{ item?.description }}</p>
      <button class="item-modal_content__btn" @click="deleteItem">Удалить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InventoryItem } from '@/stores/inventory'

const props = defineProps<{ item: InventoryItem | null }>()
const emit = defineEmits<{ (e: 'delete', itemId: string): void }>()

function deleteItem() {
  if (props.item) {
    emit('delete', props.item.id)
  }
}
</script>

<style lang="scss">
.item-modal {
  position: fixed;
  top: 0;
  right: -300px;
  width: 300px;
  height: 100%;
  background: var(--color-background-component);
  border-left: 1px solid var(--color-secondary);
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  transition: right 0.3s ease;
  &--active {
    right: 0;
  }
  &_content {
    padding: 20px;
    &__title {
      margin: 0 0 10px;
    }
    &__description {
      margin: 0 0 20px;
    }
    &__btn {
      padding: 10px 20px;
      background: var(--color-secondary);
      border: none;
      color: var(--color-primary);
      cursor: pointer;
    }
  }
}
</style>
