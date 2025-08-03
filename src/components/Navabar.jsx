import React from "react";
import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import { FaShoppingCart } from "react-icons/fa";

const Navabar = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div>
      <h1>ShopHub</h1>

      <Link to="/cart">
        <FaShoppingCart size={34} />

        {totalQty > 0 && (
          <span
            style={{
              //   position: "absolute",
              top: "-8px",
              right: "-10px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px",
            }}
          >
            {" "}
            {totalQty}
          </span>
        )}
      </Link>
    </div>
  );
};

export default Navabar;
