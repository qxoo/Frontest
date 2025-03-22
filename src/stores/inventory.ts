import { defineStore } from 'pinia'

export interface InventoryItem {
  id: string
  name: string
  description: string
  cell: string
  image: string
  quantity: number
}

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    items: [] as InventoryItem[],
    cells: Array.from({ length: 48 }, (_, i) => `cell-${i}`),
  }),
  actions: {
    addItem(item: Omit<InventoryItem, 'id' | 'cell'>) {
      const usedCells = this.items.map((i) => i.cell)
      let freeCell = this.cells.find((cell) => !usedCells.includes(cell))
      if (!freeCell) {
        freeCell = `cell-${this.cells.length + 1}`
        this.cells.push(freeCell)
      }
      const newItem: InventoryItem = {
        id: this.items.length.toString(),
        cell: freeCell,
        ...item,
      }
      if (!newItem.quantity) {
        newItem.quantity = 1
      }
      this.items.push(newItem)
    },
    removeItem(itemId: string) {
      this.items = this.items.filter((item) => item.id !== itemId)
    },
    moveItem(itemId: string, newCell: string) {
      const sourceItem = this.items.find((item) => item.id === itemId)
      if (sourceItem) {
        const targetItem = this.items.find((item) => item.cell === newCell)
        if (targetItem) {
          const temp = targetItem.cell
          targetItem.cell = sourceItem.cell
          sourceItem.cell = temp
        } else {
          sourceItem.cell = newCell
        }
      }
    },
    updateQuantity(itemId: string, newQuantity: number) {
      const item = this.items.find((item) => item.id === itemId)
      if (item) {
        item.quantity = newQuantity
      }
    },
  },
  persist: true,
})
