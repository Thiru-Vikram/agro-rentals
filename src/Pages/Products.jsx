import { useState, useEffect } from "react";
import "./Products.css";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Tractor",
    price: 1000,
    seller: "BHAVESH MEHTA",
    state: "TamilNadu",
    district: "Chennai",
    village: "T Nagar",
    contact: 9999999999,
    image: "https://www.tafe.com/tractors/imt/thumb/TAFE-IMT-tractor-565.2.png",
    category: "Machinery",
  },
  {
    id: 2,
    name: "Seed Drill",
    price: 500,
    seller: "RAJIV RANJAN",
    state: "AndraPradesh",
    district: "Chittoor",
    village: "Kattamanchi",
    contact: 9999999999,
    image:
      "https://ksagrotech.org/wp-content/uploads/2022/01/Zero-Seed-Drill.jpg",
    category: "Machinery",
  },
  {
    id: 3,
    name: "Plow",
    price: 800,
    seller: "ANKEET PATIL",
    state: "TamilNadu",
    district: "Chennai",
    village: "Sholinganallur",
    contact: 9999999999,
    image: "https://img.agriexpo.online/images_ag/photo-m2/179096-18370961.jpg",
    category: "Machinery",
  },
  {
    id: 4,
    name: "Harvester",
    price: 1200,
    seller: "GANESH KUMAR",
    state: "AndraPradesh",
    district: "Guntur",
    village: "Amaravathi",
    contact: 9999999999,
    image:
      "https://ksagrotech.org/wp-content/uploads/2024/07/1000x1000-COMBINE_1.jpg",
    category: "Machinery",
  },
  {
    id: 5,
    name: "Sprayer",
    price: 600,
    seller: "	SUNIL PETAKAR",
    state: "TamilNadu",
    district: "Chennai",
    village: "Sholinganallur",
    contact: 9999999999,
    image:
      "https://m.media-amazon.com/images/I/51QCD9nIafL._UF1000,1000_QL80_.jpg",
    category: "Hand Tools",
  },
  {
    id: 6,
    name: "Rotary Tiller",
    price: 1000,
    seller: "RAMKUMAR G",
    state: "AndraPradesh",
    district: "Guntur",
    village: "Pedakakani",
    contact: 9999999999,
    image:
      "https://5.imimg.com/data5/ANDROID/Default/2021/10/ZU/DK/UQ/116888385/product-jpeg-500x500.jpeg",
    category: "Machinery",
  },
  {
    id: 7,
    name: "Harrows",
    price: 500,
    seller: "	GOVINDARAJ",
    state: "TamilNadu",
    district: "Coimbatore",
    village: "Vedapatti",
    contact: 9999999999,
    image: "https://5.imimg.com/data5/SM/ID/MY-2818290/disc-harrow-500x500.jpg",
    category: "Machinery",
  },
  {
    id: 8,
    name: "Balers",
    price: 800,
    seller: "PARAMASIVAM",
    state: "AndraPradesh",
    district: "Anantapur",
    village: "Gooty",
    contact: 9999999999,
    image:
      "https://blog.machinefinder.com/wp-content/uploads/2019/06/01_ams_baler_300_300_100_07038_N_642x462.jpeg",
    category: "Machinery",
  },
  {
    id: 9,
    name: "Shovels",
    price: 1200,
    seller: "SUNITA YADAV",
    state: "AndraPradesh",
    district: "Anantapur",
    village: "Pamidi",
    contact: 9999999999,
    image:
      "https://img2.tradewheel.com/uploads/images/products/3/3/brand-antique-different-types-of-shovels-spades-for-farming-tools0-0285116001630039700-300-.jpg.webp",
    category: "Hand Tools",
  },
  {
    id: 10,
    name: "Hand Trowels",
    price: 600,
    seller: "SAKINA BIBI",
    state: "TamilNadu",
    district: "Madurai",
    village: "Thirumangalam",
    contact: 9999999999,
    image: "https://i.ebayimg.com/images/g/crYAAOSwRaFh7-9Y/s-l1200.jpg",
    category: "Hand Tools",
  },
  {
    id: 11,
    name: "Milking Machine",
    price: 600,
    seller: "RANJITHKUMAR",
    state: "AndraPradesh",
    district: "Nellore",
    village: "Kavali",
    contact: 9999999999,
    image:
      "https://yantratools.com/public/uploads/products/photos/78wGzhPeQWioquBceY1vgFfcPQcPjnZRjngxuZVw.webp",
    category: "Other Equipment",
  },
  {
    id: 12,
    name: "UTV",
    price: 600,
    seller: "YATENDRA",
    state: "TamilNadu",
    district: "Chennai",
    village: "Porur",
    contact: 9999999999,
    image:
      "https://www.alke.com/images/stories/articles/0587/357/electric-vehicles-loading-bed-130-123cm-alke.jpg",
    category: "Other Equipment",
  },
  {
    id: 13,
    name: "Wheel Barrow",
    price: 600,
    seller: "SARAVANAPAVAN",
    location: "OhPurasawalkamio",
    state: "AndraPradesh",
    district: "Chittoor",
    village: "Palamaner",
    contact: 9999999999,
    image:
      "https://www.rudraequipment.in/wp-content/uploads/2019/12/DOUBLE-WHEEL-BARROW-WITH-SCOOTER-WHEEL.jpg",
    category: "Hand Tools",
  },
];

const locationData = {
  AndraPradesh: {
    Chittoor: ["Kattamanchi", "Palamaner"],
    Guntur: ["Amaravathi", "Pedakakani"],
    Anantapur: ["Gooty", "Pamidi"],
    Nellore: ["Kavali"],
  },
  TamilNadu: {
    Chennai: ["T Nagar", "Sholinganallur", "Porur"],
    Coimbatore: ["Vedapatti"],
    Madurai: ["Thirumangalam"],
  },
};

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
