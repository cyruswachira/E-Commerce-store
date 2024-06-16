import React, { useContext } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { SearchContext } from './SearchContext';

const Header = () => {
  let { searchQuery, setSearchQuery } = useContext(SearchContext);

  let handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  let handleSearchSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/?search=${searchQuery}`;
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>My E-Commerce Store</h1>
      </div>
      <nav className="nav-links">
        <NavLink 
          to="/" 
          end 
        >
          Home
        </NavLink>
        <NavLink 
          to="/Add-Products" 
        >
          Add Products
        </NavLink>
        <NavLink 
          to="/View-Your-Products" 
        >
          Cart
        </NavLink>
      </nav>
      <form className="search-bar" onSubmit={handleSearchSubmit}>
      <input 
        type="text" 
        placeholder="Search for products..." 
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
/>

      </form>
    </header>
  );
};

export default Header;
