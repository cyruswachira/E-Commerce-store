import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { CartProvider } from './components/CartContext'; 
import { SearchProvider } from './components/SearchContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <SearchProvider> 
        <RouterProvider router={router} />
      </SearchProvider>
    </CartProvider>
  </React.StrictMode>,
);
