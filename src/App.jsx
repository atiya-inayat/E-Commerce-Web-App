import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import CheckoutPage from "./components/CheckoutPage";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useEffect } from "react";
import useAuthStore from "./store/authStore";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isAuthChecked = useAuthStore((state) => state.isAuthChecked);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!isAuthChecked) {
    return <p>Loading...</p>; // Wait for Firebase to finish
  }

  return (
    <>
      <div>
        <Navbar />
        <Toaster />
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<Navigate to="/products" />} />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductPage></ProductPage>
            </PrivateRoute>
          }
        />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
