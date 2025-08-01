import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cartItems: [],

  addToCart: (product) => {
    const cartItems = get().cartItems;

    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map((i) =>
        i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      );

      set({ cartItems: updatedCart });
    } else {
      set({ cartItems: [...cartItems, { ...product, quantity: 1 }] });
    }
  },

  removeBtn: (id) => {
    const cartItems = get().cartItems;
    const updatedCartItem = cartItems.filter((item) => item.id !== id);
    set({ cartItems: updatedCartItem });
  },

  totalPrice: () => {
    const cartItems = get().cartItems;
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },
}));

export default useCartStore;
