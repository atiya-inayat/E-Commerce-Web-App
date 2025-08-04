import React from "react";
import useCartStore from "../store/cartStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CartPage = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeBtn = useCartStore((state) => state.removeBtn);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);

  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div>
        <p>Your Cart is empty!</p>
        <button onClick={() => navigate("/products")}>Shop Now</button>
      </div>
    );
  }

  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.id}>
          <div>
            <h1>{item.title}</h1>
            <img src={item.images?.[0]} alt="" />
            <h2>Price: ${item.price}</h2>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => increaseQty(item.id)}>+</button>
            <button onClick={() => decreaseQty(item.id)}>-</button>
            <p>Subtotal: ${item.quantity * item.price}</p>
            <button onClick={() => removeBtn(item.id)}>Remove Item</button>
          </div>
        </div>
      ))}
      <hr />
      <h3>Total: ${totalPrice()}</h3>
      <button onClick={clearCart}>Clear Cart</button>
      <button onClick={() => navigate("/products")}>Continue Shopping</button>

      <Link to="/checkout">
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default CartPage;
