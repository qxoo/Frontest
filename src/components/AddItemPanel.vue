<template>
  <div class="add-item-panel scroll-x">
    <form @submit.prevent="onSubmit" class="add-item-panel__form">
      <div class="add-item-panel__form-group">
        <!-- скрытый инпут для загрузки картинки -->
        <input
          id="itemImage"
          type="file"
          accept="image/*"
          @change="onFileChange"
          class="add-item-panel__input--hidden"
        />
        <!-- ярлык, который будет служить в качестве кастомного инпута -->
        <label for="itemImage" class="add-item-panel__image-label">
          <IconImg />
          <img v-if="imageData" :src="imageData" alt="предпросмотр" />
        </label>
      </div>
      <div class="add-item-panel__form-group">
        <input
          id="itemName"
          v-model="name"
          type="text"
          class="add-item-panel__input"
          required
          placeholder="Название"
          maxlength="40"
        />
      </div>
      <div class="add-item-panel__form-group">
        <textarea
          id="itemDescription"
          v-model="description"
          class="add-item-panel__textarea"
          placeholder="Описание"
          maxlength="555"
        ></textarea>
      </div>
      <div class="add-item-panel__form-group">
        <input
          id="itemQuantity"
          v-model.number="quantity"
          type="number"
          min="1"
          class="add-item-panel__input"
          placeholder="Количество"
        />
      </div>
      <button type="submit" class="add-item-panel__btn">Добавить</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useInventoryStore } from '@/stores/inventory'
import IconImg from './icons/IconImg.vue'
const name = ref('')
const description = ref('')
const quantity = ref()
const imageData = ref('')
const store = useInventoryStore()

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files ? target.files[0] : null
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageData.value = e.target?.result as string
      target.value = ''
    }
    reader.readAsDataURL(file)
  }
}

function onSubmit() {
  if (!imageData.value) {
    alert('Пожалуйста, загрузите картинку!')
    return
  }
  store.addItem({
    name: name.value,
    description: description.value,
    image: imageData.value,
    quantity: quantity.value,
  })
  name.value = ''
  description.value = ''
  quantity.value = null
  imageData.value = ''
}
</script>

<style lang="scss">
.add-item-panel {
  background: var(--color-background-component);
  padding: 16px;
  border: 1px solid var(--color-secondary-32);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__form {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  &__input,
  &__textarea {
    padding: 8px;
    border: 1px solid var(--color-secondary-32);
    border-radius: 8px;
    background: var(--color-background);
    color: var(--color-primary);
    min-width: 100%;
    max-width: 100%;
  }

  &__btn {
    padding: 10px;
    background: var(--color-secondary);
    border: none;
    color: var(--color-primary);
    cursor: pointer;
    border-radius: 8px;
  }

  &__input--hidden {
    display: none;
  }

  &__image-label {
    display: block;
    width: 100%;
    height: 240px;
    background: var(--color-background);
    border: 1px solid var(--color-secondary-32);
    border-radius: 8px;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: 18px;
      color: var(--color-primary);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
