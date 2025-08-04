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
    <div className="navbar-cont">
      <div className="navbar-heading-cont">
        <h1 className="navbar-heading">ShopHub</h1>
      </div>

      <div className="cart-logout-cont">
        <Link to="/cart">
          <FaShoppingCart className="cart-icon" size={34} />

          {totalQty > 0 && (
            <span
              style={{
                // position: "absolute",
                top: "-8px",
                right: "-10px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "3px 6px",
                fontSize: "15px",
              }}
            >
              {" "}
              {totalQty}
            </span>
          )}
        </Link>
        {user ? (
          <>
            {/* <span>Welcome, {user.email}</span> */}
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="login-signup-btn" to="/login">
              Login
            </Link>
            <Link className="login-signup-btn" to="/signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
