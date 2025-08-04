import React from "react";
import useCartStore from "../store/cartStore";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();

  return (
    <>
      <div className="product-card">
        <img
          className="product-img"
          src={product.images[0]}
          alt={product.title}
          // width={200}
        />
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">Price: ${product.price}</p>

        <div className="link-btn-cont">
          <Link className="P-detail-link" to={`/products/${product.id}`}>
            View Details
          </Link>
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
