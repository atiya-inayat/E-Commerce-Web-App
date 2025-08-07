import React from "react";
import useCartStore from "../store/cartStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

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
      <>
        <div className="empty-cart-main-cont">
          <div className="empty-cart-cont">
            <p className="empty-cart-para">Your Cart is empty!</p>
            <button
              className="shop-now-btn"
              onClick={() => navigate("/products")}
            >
              Shop Now
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="order-summ-header-cont">
        <h1 className="cart-main-heading">Shopping Cart</h1>
        <button className="clear-cart-btn" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
      <div className="cart-main-cont">
        <div className="cart-item-list-cont">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <img
                  className="cart-img"
                  src={item.images?.[0]}
                  alt=""
                  width={200}
                />
              </div>
              <div className="cart-item-price-cont">
                <h1 className="cart-title">{item.title}</h1>
                <h2 className="cart-price"> Price: ${item.price}</h2>
                <p className="cart-sub-price">
                  Subtotal: ${item.quantity * item.price.toFixed(2)}
                </p>
              </div>

              <div className="cart-item-qty-cont">
                <button
                  className="cart-btn"
                  onClick={() => decreaseQty(item.id)}
                >
                  -
                </button>
                <p className="cart-item-qty"> {item.quantity}</p>

                <button
                  className="cart-btn"
                  onClick={() => increaseQty(item.id)}
                >
                  +
                </button>
                <button
                  className="cart-remove-btn"
                  onClick={() => removeBtn(item.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary-cont">
          <div className="summ-heading-cont">
            <h1 className="summ-heading">Order Summary</h1>
          </div>
          <div className="total-cont">
            <h2 className="total">Total:</h2>
            <h3 className="total-price"> ${totalPrice().toFixed(2)}</h3>
          </div>

          <Link to="/checkout">
            <button className="checkout-btn">Proceed to Checkout</button>
          </Link>
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

export default CartPage;
