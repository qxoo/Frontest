import { defineStore } from 'pinia'

export interface InventoryItem {
  id: string
  name: string
  description: string
  cell: string
}

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    items: [] as InventoryItem[],
  }),
  actions: {
    addItem(item: Omit<InventoryItem, 'id'>) {
      const newItem: InventoryItem = { id: crypto.randomUUID(), ...item }
      this.items.push(newItem)
    },
    removeItem(itemId: string) {
      this.items = this.items.filter((item) => item.id !== itemId)
    },
    moveItem(itemId: string, newCell: string) {
      const item = this.items.find((item) => item.id === itemId)
      if (item) {
        item.cell = newCell
      }
    },
  },
  persist: true,
})
