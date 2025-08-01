import { useCart } from "./CartContext";
import "./Saved.css";

function Saved() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="cart-container">
      <h2>Saved Items</h2>
      {cartItems.length === 0 ? (
        <p>You didn't save anything.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-image" />
              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>Seller: {item.seller}</p>
                <p>Price: ${item.price}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="remove-button">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Saved;
