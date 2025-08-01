import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Pages/CartContext";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Contact from "./Pages/Contact";
import Saved from "./Pages/Saved";
import Layout from "./Layout";

function App() {

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Saved" element={<Saved />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
