import React from "react";
import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import { FaShoppingCart } from "react-icons/fa";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

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
      {user ? (
        <>
          <span>Welcome, {user.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
