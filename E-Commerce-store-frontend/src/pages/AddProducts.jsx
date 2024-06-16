import React, { useState } from 'react';
import './AddProduct.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BASE_URL } from '../utils';

let AddProduct = () => {
    let [product, setProduct] = useState({
        name: '',
        price: '',
        quantity: '',
        image: ''
    });

    let [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSubmitted(false);

        const price = parseFloat(product.price);
        const quantity = parseInt(product.quantity);

        if (isNaN(price) || price <= 0) {
            setError('Price must be a valid positive number');
            return;
        }

        if (isNaN(quantity) || quantity <= 0) {
            setError('Quantity must be a valid positive number');
            return;
        }

        const payload = {
            name: product.name,
            price: price, 
            quantity: quantity, 
            image: product.image
        };

        fetch(`${BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then((res) => {
            if (!res.ok) {
                return res.json().then((err) => {
                    throw new Error(err.detail || 'Failed to add product');
                });
            }
            return res.json();
        })
        .then((data) => {
            setSubmitted(true);
        })
        .catch((err) => {
            setError(err.message || 'Failed to add product');
        });
    };

    return (
        <div>
            <Header />

            <div className="form-container">
                <form className="add-product-form" onSubmit={handleSubmit}>
                    <h2>Add New Product</h2>
                    {error && <p className="error-message">{error}</p>}
                    {submitted && <p className="success-message">Product added successfully!</p>}
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={product.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input 
                            type="number" 
                            id="price" 
                            name="price" 
                            value={product.price} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input 
                            type="number" 
                            id="quantity" 
                            name="quantity" 
                            value={product.quantity} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Product Image</label>
                        <input 
                            type="url" 
                            id="image" 
                            name="image" 
                            value={product.image} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit" className="submit-button">Add Product</button>
                </form>
            </div>
            <Footer/>
        </div>
    );
};

export default AddProduct;
