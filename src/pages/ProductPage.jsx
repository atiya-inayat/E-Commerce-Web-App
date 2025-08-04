import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api/product";
import ProductCard from "../components/ProductCard";

const ProductPage = ({ children }) => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [originalProduct, setOriginalProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProduct(page, limit),
  });

  useEffect(() => {
    console.log("fetched data", data);

    if (data?.products) {
      setOriginalProduct(data.products);
      setDisplayedProducts(data.products);
    }
  }, [data]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchQuery(searchValue);

    const filtered = originalProduct.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setDisplayedProducts(filtered);
  };

  const categories = [...new Set(originalProduct.map((item) => item.category))];

  if (isLoading) {
    return <p>Loading Product....</p>;
  }
  if (isError) {
    return <p>Something went wrong </p>;
  }

  const filterByPrice = (maxPrice) => {
    const filtered = originalProduct.filter((item) => item.price <= maxPrice);
    setDisplayedProducts(filtered);
  };

  const filterByCategory = (category) => {
    const filtered = originalProduct.filter(
      (item) => item.category === category
    );

    setDisplayedProducts(filtered);
  };

  const handleSort = (type) => {
    const sorted = [...displayedProducts];
    if (type === "low-to-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (type === "high-to-low") {
      sorted.sort((a, b) => b.price - a.price);
    }
    setDisplayedProducts(sorted);
  };

  const resetFilters = () => {
    setDisplayedProducts(originalProduct);
  };

  return (
    <>
      <div className="productList-container">
        <h2>All Products</h2>
        <input
          type="text"
          placeholder="Search Item Here"
          value={searchQuery}
          onChange={handleSearch}
        />
        <div>
          <div>
            {categories.map((category) => (
              <button key={category} onClick={() => filterByCategory(category)}>
                {category
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </button>
            ))}

            <button onClick={() => filterByPrice(500)}>Under (500)</button>
            <button onClick={resetFilters}>All</button>
          </div>
          <div>
            <select onChange={(e) => handleSort(e.target.value)}>
              <option value="">Sort By</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div>
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div>
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={data?.products?.length < limit}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
