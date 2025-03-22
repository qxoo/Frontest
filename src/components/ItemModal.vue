<template>
  <div class="item-modal">
    <button class="item-modal__close" @click="closeModal">×</button>
    <div class="item-modal_content">
      <img class="item-modal_content__img" :src="item?.image" alt="item image" />
      <p class="item-modal_content__title">{{ item?.name }}</p>
      <p class="item-modal_content__description scroll-x">{{ item?.description }}</p>
      <input
        id="modalQuantity"
        type="number"
        placeholder="Введите количество"
        v-model.number="localQuantity"
        min="1"
        class="item-modal_content__input"
      />
      <div class="item-modal_content__quantity-group">
        <button class="item-modal_content__update-btn" @click="updateQuantity">Сохранить</button>
        <button class="item-modal_content__cancel-btn" @click="cancelUpdateQuantity">Отмена</button>
      </div>
      <div class="separator" />
      <button class="item-modal_content__btn" @click="deleteItem">Удалить Предмет</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InventoryItem } from '@/stores/inventory'
import { ref, watch } from 'vue'
import { useInventoryStore } from '@/stores/inventory'

const props = defineProps<{ item: InventoryItem | null }>()
const emit = defineEmits<{ (e: 'delete', itemId: string): void; (e: 'close'): void }>()
const store = useInventoryStore()

const localQuantity = ref(props.item ? props.item.quantity : null)
watch(
  () => props.item,
  (newItem) => {
    if (newItem) {
      localQuantity.value = newItem.quantity
    }
  },
)

function deleteItem() {
  if (props.item) {
    emit('delete', props.item.id)
  }
}

function closeModal() {
  emit('close')
}

function updateQuantity() {
  if (props.item) {
    store.updateQuantity(props.item.id, localQuantity.value)
  }
}

function cancelUpdateQuantity() {
  if (props.item) {
    localQuantity.value = props.item.quantity
  }
}
</script>

<style lang="scss">
.item-modal {
  position: absolute;
  top: 0;
  right: 0;
  width: 250px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--color-secondary);
  backdrop-filter: blur(20px);
  border-radius: 0 12px 12px 0;
  height: 100%;
  padding: 20px;
  .item-modal__close {
    position: absolute;
    top: 8px;
    right: 8px;
    background: transparent;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: var(--color-primary);
  }

  &_content {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    &__input {
      padding: 12px;
      border: 1px solid var(--color-secondary);
      border-radius: 4px;
      background: var(--color-background);
      height: 40px;
    }

    &__update-btn,
    &__cancel-btn {
      padding: 6px 12px;
      width: 50%;
      background: var(--color-secondary);
      border: none;
      color: var(--color-primary);
      cursor: pointer;
      border-radius: 4px;
      background: var(--color-primary);
      color: var(--color-background);
    }
    &__cancel-btn {
      background: var(--color-red);
      color: var(--color-primary);
    }
    &__img {
      width: 100%;
      height: auto;
      margin-bottom: 10px;
    }
    &__quantity-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    &__title {
      font-size: 18px;
      max-height: 10svh;
      white-space: wrap;
      word-break: break-all;
    }
    &__description {
      font-size: 14px;
      line-height: 1.5;
      word-break: break-all;
      max-height: 35svh;
    }
    &__btn {
      border-radius: 8px;
      padding: 10px 20px;
      background: var(--color-red);
      border: none;
      color: var(--color-primary);
      cursor: pointer;
    }
  }
}
</style>
