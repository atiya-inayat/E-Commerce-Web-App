import React from "react";
import useCartStore from "../store/cartStore";

const CartPage = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeBtn = useCartStore((state) => state.removeBtn);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <>
      {cartItems.map((item) => (
        <div>
          <div key={item.id}>
            <h1>{item.title}</h1>
            <h2>Price: ${item.price}</h2>
            <p>Quantity: {item.quantity}</p>
            <p>Subtotal: ${item.quantity * item.price}</p>
            <button onClick={() => removeBtn(item.id)}>Remove Item</button>
          </div>
          <h3>Total: ${totalPrice()}</h3>
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      ))}
    </>
  );
};

export default CartPage;
