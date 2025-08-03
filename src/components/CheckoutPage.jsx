import React from "react";
import useCartStore from "../store/cartStore";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const handleOrder = () => {
    // Simulate sending order
    toast.success("Order placed successfully!");
  };

  return (
    <div>
      <h2>Order Summary</h2>
      {cartItems.map((item) => (
        <div key={item.id}>
          <p>
            {item.title} x {item.quantity}
          </p>
          <p>Subtotal: ${item.price * item.quantity}</p>
        </div>
      ))}
      <h3>Total: ${totalPrice()}</h3>
      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
};

export default CheckoutPage;
