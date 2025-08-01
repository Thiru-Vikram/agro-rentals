import { useState, useEffect } from "react";
import "./Products.css";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { products, locationData } from "../data/productsData.js";

function Products() {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [sort, setSort] = useState("");
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedVillages, setSelectedVillages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, selectedState, selectedDistricts, selectedVillages]);

  const handleBuy = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    console.log(`${product.name} added to cart`);
  };

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) &&
        (category === "All Categories" || product.category === category) &&
        (selectedState === "" || product.state === selectedState) &&
        (selectedDistricts.length === 0 ||
          selectedDistricts.includes(product.district)) &&
        (selectedVillages.length === 0 ||
          selectedVillages.includes(product.village))
    )
    .sort((a, b) => {
      if (sort === "A-Z") return a.name.localeCompare(b.name);
      if (sort === "Z-A") return b.name.localeCompare(a.name);
      if (sort === "Low-High") return a.price - b.price;
      if (sort === "High-Low") return b.price - a.price;
      return 0;
    });

  return (
    <div className="products-container">
      {isLoading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          {/* Filter and Search Row */}
          <div className="filter-row">
            <input
              type="text"
              placeholder="Search Products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-box"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="category-dropdown"
            >
              <option value="All Categories">All Categories</option>
              <option value="Machinery">Machinery</option>
              <option value="Hand Tools">Hand Tools</option>
              <option value="Other Equipment">Other Equipment</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="sort-dropdown"
            >
              <option value="">Sort By</option>
              <option value="A-Z">Name: A-Z</option>
              <option value="Z-A">Name: Z-A</option>
              <option value="Low-High">Price: Low to High</option>
              <option value="High-Low">Price: High to Low</option>
            </select>

            {/* State Dropdown */}
            <div className="select-container">
              <label htmlFor="state-select"></label>
              <select
                id="state-select"
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedDistricts([]);
                  setSelectedVillages([]);
                }}
              >
                <option value="">Select State</option>
                {Object.keys(locationData).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* District Dropdown */}
            <div className="select-container">
              <label htmlFor="district-select"></label>
              <select
                id="district-select"
                value={selectedDistricts[0] || ""}
                onChange={(e) => {
                  setSelectedDistricts(e.target.value ? [e.target.value] : []);
                  setSelectedVillages([]);
                }}
              >
                <option value="">Select District</option>
                {selectedState &&
                  Object.keys(locationData[selectedState]).map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
              </select>
            </div>

            {/* Village Dropdown */}
            <div className="select-container">
              <label htmlFor="village-select"></label>
              <select
                id="village-select"
                value={selectedVillages[0] || ""}
                onChange={(e) => {
                  setSelectedVillages(e.target.value ? [e.target.value] : []);
                }}
              >
                <option value="">Select Village</option>
                {selectedDistricts.length > 0 &&
                  selectedDistricts
                    .flatMap(
                      (district) => locationData[selectedState][district] || []
                    )
                    .map((village) => (
                      <option key={village} value={village}>
                        {village}
                      </option>
                    ))}
              </select>
            </div>

            <button
              className="clear-filter-btn"
              onClick={() => {
                setSelectedState("");
                setSelectedDistricts([]);
                setSelectedVillages([]);
                setCategory("All Categories");
                setSort("");
                setSearch("");
              }}
            >
              Clear Filters
            </button>
          </div>

          {/* Products Grid with Pagination */}
          <div className="pagination-container">
            <div className="products-grid">
              {filteredProducts
                .slice(
                  (currentPage - 1) * productsPerPage,
                  currentPage * productsPerPage
                )
                .map((product) => (
                  <div key={product.id} className="product-card">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p>Seller: {product.seller}</p>
                      <p>
                        Location:{" "}
                        {`${product.village}, ${product.district}, ${product.state}`}
                      </p>
                      <p>Contact : {product.contact}</p>
                      <p>Price: ₹{product.price}</p>
                      <div className="product-actions">
                        {/* <button onClick={() => handleBuy(product)}>Buy</button> */}
                        <button onClick={() => handleAddToCart(product)}>
                          Save for Later
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination-controls">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                Previous
              </button>
              <span className="page-info">
                Page {currentPage} of{" "}
                {Math.ceil(filteredProducts.length / productsPerPage)}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      prev + 1,
                      Math.ceil(filteredProducts.length / productsPerPage)
                    )
                  )
                }
                disabled={
                  currentPage ===
                  Math.ceil(filteredProducts.length / productsPerPage)
                }
                className="pagination-button"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Products;
