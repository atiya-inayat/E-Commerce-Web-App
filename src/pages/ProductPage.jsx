import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api/product";

const ProductPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProduct,
  });

  if (isLoading) {
    return <p>Loading Product....</p>;
  }
  if (isError) {
    return <p>Something went wrong </p>;
  }

  return (
    <>
      <div>
        <h2>All Products</h2>
        <div>
          {data.products.map((product) => (
            <div key={product.id}>
              <h3>{product.title}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
