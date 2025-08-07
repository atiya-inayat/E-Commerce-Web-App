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

  if (isLoading) {
    return (
      <>
        <div className="loader-cont">
          <span className="loader"></span>;
        </div>
      </>
    );
  }
  if (isError) return <p>Something went wrong.</p>;

  const { images, title, description, price, rating } = data;

  return (
    <>
      <button className="prod-det-back-btn" onClick={() => navigate(-1)}>
        Continue Shopping{" "}
      </button>
      <div className="product-detail-cont">
        <div className="det-img-cont">
          <img className="product-det-img" src={images?.[0]} alt={title} />
        </div>
        <div className="prod-details">
          <h1 className="prod-det-heading">{title}</h1>
          <p className="prod-det-rating"> ⭐ {rating}</p>
          <h3 className="prod-det-price">${price}</h3>
          <hr className="prod-det-line" />
          <div className="det-desc-cont">
            <h2 className="det-desc-heading">Description</h2>
            <p className="prod-det-des">{description}</p>
          </div>

          <div>
            <button
              className="prod-det-atc-btn"
              onClick={() => addToCart(data)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
