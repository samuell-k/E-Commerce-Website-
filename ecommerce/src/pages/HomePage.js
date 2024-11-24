import React, { useState } from 'react';
import '../App.css';

const products = [
  {
    id: 1,
    name: 'Smartphone',
    price: '$499',
    image: `${process.env.PUBLIC_URL}/images/phone.png`,
  },

  {
    id: 2,
    name: 'Laptop',
    price: '$899',
    image: `${process.env.PUBLIC_URL}/images/pc.png`,
  },
  {
    id: 3,
    name: 'Headphones',
    price: '$199',
    image: `${process.env.PUBLIC_URL}/images/hd.png`,
  },
  {
    id: 4,
    name: 'Smartwatch',
    price: '$149',
    image: `${process.env.PUBLIC_URL}/images/wt.png`,
  },
  {
    id: 5,
    name: 'Gaming Console',
    price: '$299',
    image: `${process.env.PUBLIC_URL}/images/c.png`,
  },
  {
    id: 6,
    name: 'Tablet',
    price: '$399',
    image: `${process.env.PUBLIC_URL}/images/d.png`,
  },
  {
    id: 7,
    name: 'Camera',
    price: '$699',
    image: `${process.env.PUBLIC_URL}/images/e.png`,
  },
  {
    id: 8,
    name: 'Bluetooth Speaker',
    price: '$99',
    image: `${process.env.PUBLIC_URL}/images/f.png`,
  },
  {
    id: 9,
    name: 'Desktop PC',
    price: '$1099',
    image: `${process.env.PUBLIC_URL}/images/a.png`,
  },
  {
    id: 10,
    name: 'ELECTRONIC MOUSE',
    price: '$1099',
    image: `${process.env.PUBLIC_URL}/images/b.png`,
  },
];

const HomePage = () => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  // Function to handle adding products to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to handle removing products from the cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Function to handle increasing quantity
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to handle decreasing quantity
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Function to handle opening the payment modal
  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  // Function to handle closing the payment modal
  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setPaymentMethod('');
  };

  // Function to handle payment selection
  const handlePayment = (method) => {
    setPaymentMethod(method);
    alert(`Payment method selected: ${method}. Your order is being processed.`);
    closePaymentModal(); // Close the modal after selection
  };

  // Calculate the total price
  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return total + price * item.quantity;
  }, 0);

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <h1>Welcome to Our Store</h1>
        <p>Find the best products at unbeatable prices!</p>
        <input
          type="text"
          placeholder="Search for products..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
      </header>

      {/* Promotional Banner */}
      <div className="promo-banner">
        <h2>Holiday Sale!</h2>
        <p>Get up to 50% off on select items. Limited time only!</p>
        <button className="shop-now-btn">Shop Now</button>
      </div>

      {/* Featured Products */}
      <div className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p>{product.price}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No products found for your search.</p>
          )}
        </div>
      </div>

      {/* Cart Section */}
      <div className="cart">
        <h2>Your Cart</h2>
        {cart.length > 0 ? (
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="cart-total">
              <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
              <button className="proceed-btn" onClick={openPaymentModal}>
                Proceed to Payment
              </button>
            </div>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="payment-modal">
          <div className="payment-modal-content">
            <h2>Select Payment Method</h2>
            <button
              onClick={() => handlePayment('MTN')}
              className="payment-btn"
            >
              MTN
            </button>
            <button
              onClick={() => handlePayment('Airtel')}
              className="payment-btn"
            >
              Airtel
            </button>
            <button onClick={closePaymentModal} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>
              We are a leading e-commerce platform offering a wide range of
              products to meet your needs.
            </p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#products">Products</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: kamanzisamuel3@gmail.com</p>
            <p>Phone: +250799393729</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
