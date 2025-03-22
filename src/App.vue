<script setup lang="ts">
import InventoryGrid from './components/InventoryGrid.vue'
import AddItemPanel from './components/AddItemPanel.vue'
import PageFooter from './components/PageFooter.vue'
</script>

<template>
  <div class="app-container">
    <div class="content">
      <AddItemPanel class="add-item-panel" />
      <InventoryGrid class="inventory-grid" />
    </div>
    <PageFooter class="page-footer" />
  </div>
</template>

<style lang="scss">
.app-container {
  display: flex;
  flex-direction: column;
  height: 100svh;
  padding: 32px;
  box-sizing: border-box;
  gap: 24px;
}

.content {
  flex: 1;
  display: flex;
  gap: 24px;
  overflow: hidden;
}

.add-item-panel {
  width: 236px;
}
</style>
