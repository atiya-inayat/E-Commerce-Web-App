import React from "react";
import useCartStore from "../store/cartStore";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();

  return (
    <>
      <div>
        <img src={product.images[0]} alt={product.title} width={200} />
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <Link to={`/products/${product.id}`}>View Details</Link>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </>
  );
};

export default ProductCard;
