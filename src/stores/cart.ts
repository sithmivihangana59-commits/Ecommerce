import { defineStore } from "pinia";
import type { Product } from "../types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
  }),

  getters: {
    itemCount: (state): number => state.items.reduce((sum, it) => sum + it.quantity, 0),
    subtotal: (state): number => state.items.reduce((sum, it) => sum + it.product.price * it.quantity, 0),
  },

  actions: {
    addToCart(product: Product) {
      const found = this.items.find((it) => it.product.id === product.id);
      if (found) found.quantity += 1;
      else this.items.push({ product, quantity: 1 });
    },
    increase(id: number) {
      const found = this.items.find((it) => it.product.id === id);
      if (found) found.quantity += 1;
    },
    decrease(id: number) {
      const found = this.items.find((it) => it.product.id === id);
      if (!found) return;
      found.quantity -= 1;
      if (found.quantity <= 0) this.items = this.items.filter((x) => x.product.id !== id);
    },
    removeFromCart(id: number) {
      this.items = this.items.filter((x) => x.product.id !== id);
    },
    clearCart() {
      this.items = [];
    },
  },
});