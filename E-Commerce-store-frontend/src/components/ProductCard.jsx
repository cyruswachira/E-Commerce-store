import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import './ProductCard.css';

const ProductCard = ({ name, price, quantity, image, id }) => {
  const { addToCart } = useContext(CartContext);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false); 

  const decrementQuantity = () => {
    if (selectedQuantity > 0) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  const incrementQuantity = () => {
    if (selectedQuantity < quantity) {
      setSelectedQuantity(selectedQuantity + 1);
    }
  };

  const handleAddToCart = () => {
    if (selectedQuantity > 0) {
      addToCart({ id, name, price, image, selectedQuantity });
      setAddedToCart(true); 
      console.log(`Added ${selectedQuantity} ${name} to cart`);
    }
  };

  return (
    <div className="card">
      <div className="product-card">
        <img src={image} alt={name} className="product-image" />
        <div className="product-info">
          <h2 className="product-name">{name}</h2>
          <p className="product-price">${price.toFixed(2)}</p>
          {quantity > 0 ? (
            <>
              <p className="product-quantity">Quantity: {quantity}</p>
              <div className="quantity-control">
                <button onClick={decrementQuantity}>-</button>
                <span>{selectedQuantity}</span>
                <button onClick={incrementQuantity}>+</button>
              </div>
              <button
                className="add-to-cart"
                onClick={handleAddToCart}
                disabled={selectedQuantity === 0 || addedToCart}
              >
                {addedToCart ? "Added to Cart" : "Add to Cart"}
              </button>
            </>
          ) : (<P></P>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;




