import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

const useCartStore = create(
  persist(
    (set, get) => ({
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
        toast.success("Item added to cart");
      },

      removeBtn: (id) => {
        const cartItems = get().cartItems;
        const updatedCartItem = cartItems.filter((item) => item.id !== id);
        set({ cartItems: updatedCartItem });
        toast.remove("Item is removed");
      },

      totalPrice: () => {
        const cartItems = get().cartItems;
        return cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      },
      clearCart: () => {
        // const cartItems = get().cartItems;
        if (window.confirm("Are you sure you want to clear cart")) {
          set({ cartItems: [] });
          console.log("item deleted...");
        } else {
          console.log("Deletion cancelled");
        }
      },
      increaseQty: (id) => {
        const cartItems = get().cartItems;
        const inCrementedQty = cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        set({ cartItems: inCrementedQty });
      },
      decreaseQty: (id) => {
        const cartItems = get().cartItems;
        const deCrementedQty = cartItems
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0); // remove item with 0 quantity
        set({ cartItems: deCrementedQty });
      },
      // totalQty: () => {
      //   const cartItems = get().cartItems;
      //   return cartItems.reduce((acc, item) => acc + item.quantity, 0);
      // },
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;
