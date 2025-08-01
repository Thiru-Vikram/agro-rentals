import { Link , useLocation} from "react-router-dom";
import './Navbar.css'
import logo from "../assets/logo.jpg";

function Navbar() {

    const location = useLocation();

    return(
        <div className="nav-bar">

        <Link to="/" className="logo">
        <img src={ logo } alt="AgroRentals" className="logo-img" />
        </Link>
  
        <div className="nav-links">
          <Link to="/">
            <button className={location.pathname === "/" ? "active" : ""}>Home</button>
          </Link>
          <Link to="/Products">
            <button className={location.pathname === "/Products" ? "active" : ""}>Products</button>
          </Link>
          <Link to="/Contact">
            <button className={location.pathname === "/Contact" ? "active" : ""}>Contact</button>
          </Link>
          <Link to="/Saved">
            <button className={location.pathname === "/Saved" ? "active" : ""}>Saved</button>
          </Link>
        </div>

      </div>
    );
}

export default Navbar