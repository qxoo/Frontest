<template>
  <div v-if="isVisible" class="page-footer">
    <p class="page-footer__text">
      made by
      <a class="page-footer__text-link" href="https://t.me/cannedbread" target="_blank"> qxoo</a>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis nobis tempore, est illo
      voluptas vero iusto cum corporis cupiditate. Architecto eaque enim expedita harum tempora
      perspiciatis facilis eos eveniet deserunt.
    </p>
    <button class="page-footer__close" @click="hideFooter">×</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(true)

function hideFooter() {
  isVisible.value = false
}
</script>

<style lang="scss">
.page-footer {
  box-sizing: border-box;
  border: 1px solid rgb(77, 77, 77);
  border-radius: 12px;
  background: rgb(38, 38, 38);
  height: 72px;
  padding: 0 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 36px;
  &__text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(255, 255, 255, 0.5);
    &-link {
      text-decoration: none;
    }
  }
  &__close {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    font-size: 24px;
    cursor: pointer;
    align-self: flex-start;
    margin-top: 12px;
    transition:
      color 0.3s ease 0.1s,
      transform 0.3s ease;
    &:hover {
      color: rgba(255, 255, 255, 1);
      transform: scale(1.1);
    }
  }
}
</style>
