import React from "react";
import useCartStore from "../store/cartStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const { clearCartAfterOrder } = useCartStore();

  const navigate = useNavigate();

  const handleOrder = () => {
    // Simulate sending order
    clearCartAfterOrder();
    toast.success("Order placed successfully!");
  };

  return (
    <>
      <div className="checkout-main-cont">
        <div className="checkout-cont">
          <h2 className="summ-heading">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p className="checkout-title">
                {item.title} x {item.quantity}
              </p>
              <p className="cart-sub-price">
                Subtotal: ${item.price * item.quantity}
              </p>
              <hr />
            </div>
          ))}
          <h3 className="total checkout-total">
            Total: ${totalPrice().toFixed(2)}
          </h3>
          <button className="place-order-btn" onClick={handleOrder}>
            Place Order
          </button>
          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
