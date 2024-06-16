import React, { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../components/SearchContext'; 
import ProductCard from '../components/ProductCard';
import { BASE_URL } from '../utils';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Col } from 'react-bootstrap';

const Home = () => {
  const { searchQuery } = useContext(SearchContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredProducts(products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  return (
    <div className="Home">
      <Header />
      <Container style={{
          display:'grid'
         ,gridTemplateColumns:'repeat(3,1fr)'
         ,gap:'20px'
         ,padding:'20px'}}  >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Col key={product.id}>
                <ProductCard {...product} />
              </Col>
            ))
          ) : (
            <p key="no-products">No products available.</p>
          )}
      </Container>
      <Footer/>
    </div>
  );
};

export default Home;


