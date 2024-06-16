import React, { useContext, useState } from 'react';
import './Cart.css';
import { CartContext } from '../components/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BASE_URL } from '../utils';

const Cart = () => {
  let { cart } = useContext(CartContext);
  let [userDetails, setUserDetails] = useState({
    name: '',
    phone: '',
    location: '',
    email: ''
  });
  let [confirmationMessage, setConfirmationMessage] = useState('');

  let handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    
    let orderDetails = cart.map(item => ({
      product_id: item.id,
      quantity: item.selectedQuantity
    }));
    
    let data = {
      orderDetails: orderDetails,
      userDetails: userDetails
    };

    console.log('Order data:', data);

    fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Order placement failed');
      }
    })
    .then(data => {
      console.log('Order created:', data);
      setConfirmationMessage('Order placed successfully!');
    })
    .catch(error => {
      console.error('Error:', error);
      setConfirmationMessage('Failed to place order. Please try again.');
    });
  };

  return (
    <div>
      <Header />
      <div className="cart-container">
        <div>
        {confirmationMessage && (
          <div className="confirmation-message">
            {confirmationMessage}
          </div>
        )}
        </div>
        <h2>Shopping Cart</h2>
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
                <p>Quantity: {item.selectedQuantity}</p>
              </div>
            </div>
          ))}
        </div>
        <h2>User Details</h2>
        <form className="user-details-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={userDetails.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-order">Place Order</button>
        </form>
        
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
