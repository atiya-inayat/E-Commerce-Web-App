import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../api/product";
import useCartStore from "../store/cartStore";
import { useNavigate } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });
  const addToCart = useCartStore((state) => state.addToCart);

  const navigate = useNavigate();

  if (isLoading) return <p>Loading product...</p>;
  if (isError) return <p>Something went wrong.</p>;

  const { images, title, description, price, rating } = data;

  return (
    <>
      <div>
        <img src={images?.[0]} alt={title} />
        <h1>{title}</h1>
        <p>{description}</p>
        <h3>${price}</h3>
        <p>Rating: {rating}</p>

        <button onClick={() => addToCart(data)}>Add to Cart</button>
        <button onClick={() => navigate(-1)}>Back </button>
      </div>
    </>
  );
};

export default ProductDetailPage;
