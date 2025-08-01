import React from "react";
import useCartStore from "../store/cartStore";

const CartPage = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeBtn = useCartStore((state) => state.removeBtn);
  const totalPrice = useCartStore((state) => state.totalPrice);

  return (
    <>
      {cartItems.map((item) => (
        <div>
          <div>
            <h1>{item.title}</h1>
            <h2>${item.price}</h2>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeBtn(item.id)}>Remove Item</button>
          </div>
          <h3>Total: ${totalPrice()}</h3>
        </div>
      ))}
    </>
  );
};

export default CartPage;
