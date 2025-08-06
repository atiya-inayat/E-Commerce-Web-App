import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api/product";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const ProductPage = () => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [originalProduct, setOriginalProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12;

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
        <div className="header-cont">
          <h2 className="products-heading">All Products</h2>
          <input
            className="search-input"
            type="text"
            placeholder="Search Item Here"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="category-cont">
          <div>
            {categories.map((category) => (
              <button
                className="category"
                key={category}
                onClick={() => filterByCategory(category)}
              >
                {category
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </button>
            ))}

            <button className="category" onClick={() => filterByPrice(500)}>
              Under (500)
            </button>
            <button className="category" onClick={resetFilters}>
              All
            </button>
          </div>
          <div>
            <select
              className="sort"
              onChange={(e) => handleSort(e.target.value)}
            >
              <option className="option" value="">
                Sort By
              </option>
              <option className="option" value="low-to-high">
                Price: Low to High
              </option>
              <option className="option" value="high-to-low">
                Price: High to Low
              </option>
            </select>
          </div>
        </div>

        <div className="item-cont">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="prev-next-btn-cont">
          <button
            className="prev-next-btn"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <button
            className="prev-next-btn"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={data?.products?.length < limit}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
