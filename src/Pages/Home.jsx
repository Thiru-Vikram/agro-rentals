import { Link } from "react-router-dom";
import {
  FaSeedling,
  FaTractor,
  FaMoneyBillWave,
  FaHandshake,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import logo from "../assets/logo.jpg";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Empowering Farmers with the Best Equipment</h1>
        <p>Rent or buy high-quality farming equipment easily and affordably!</p>
      </div>

      <div className="about-section">
        <h2>About RentalHub</h2>
        <p>
          Agro Rental connects farmers with reliable and affordable agricultural
          equipment. Save costs, increase productivity, and improve your yield.
        </p>
        <div className="about-icons">
          <div className="icon-item">
            <FaSeedling size={50} />
            <p>Growth & Sustainability</p>
          </div>
          <div className="icon-item">
            <FaTractor size={50} />
            <p>Farming Equipment</p>
          </div>
          <div className="icon-item">
            <FaMoneyBillWave size={50} />
            <p>Affordable Solutions</p>
          </div>
          <div className="icon-item">
            <FaHandshake size={50} />
            <p>Reliable Service</p>
          </div>
        </div>
      </div>

      <div className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          <div className="product-card">
            <img
              src="https://4.imimg.com/data4/KJ/BY/MY-14831048/john-deere-5050d-tractor.jpg"
              alt="Tractor"
              className="product-image"
            />
            <p>Tractor</p>
          </div>
          <div className="product-card">
            <img
              src="https://5.imimg.com/data5/SELLER/Default/2022/12/WI/HO/QO/98465654/mild-steel-seed-drill.jpeg"
              alt="Seed Drill"
              className="product-image"
            />
            <p>Seed Drill</p>
          </div>
          <div className="product-card">
            <img
              src="https://img.agriexpo.online/images_ag/photo-mg/169807-15815857.jpg"
              alt="Plow"
              className="product-image"
            />
            <p>Plow</p>
          </div>
          <div className="product-card">
            <img
              src="https://ksagrotech.org/wp-content/uploads/2021/10/Rotavator-3.jpg"
              alt="Rotavator"
              className="product-image"
            />
            <p>Rotavator</p>
          </div>
          <div className="product-card">
            <img
              src="https://5.imimg.com/data5/MS/DB/YB/SELLER-55624664/silent-diesel-generator.png"
              alt="Water Pump"
              className="product-image"
            />
            <p>Water Pump</p>
          </div>
          <div className="product-card">
            <img
              src="https://media.takealot.com/covers_tsins/51763988/51763988-1-pdpxl.jpg"
              alt="Sprayers"
              className="product-image"
            />
            <p>Sprayers</p>
          </div>
          <div className="product-card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSau1zkDwl13Uq3Xo-NkAnK0LdQZOIi6fvLyQ&s"
              alt="Hoes"
              className="product-image"
            />
            <p>Hoes</p>
          </div>
          <div className="product-card">
            <img
              src="https://image.made-in-china.com/202f0j00ugMcldkFHEpt/Red-Color-Reversible-Disc-Plough-with-High-Efficiency.webp"
              alt="Plow"
              className="product-image"
            />
            <p>Plow</p>
          </div>
        </div>
        <div className="button-container">
          <Link to="/Products">
            <button className="cta-btn">Browse Products</button>
          </Link>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <img src={logo} alt="RentalHub Logo" className="footer-logo" />
          <p>© 2025 RentalHub. All rights reserved.</p>
          <p>Empowering farmers with affordable and reliable equipment.</p>
          <div className="social-links">
            <FaFacebook size={20} className="social-icon" />
            <FaTwitter size={20} className="social-icon" />
            <FaInstagram size={20} className="social-icon" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
