import {createBrowserRouter} from "react-router-dom";
import AddProduct from "./pages/AddProducts";
import Cart from "./pages/Cart";

import Home from "./pages/Home";





export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
      
  },
  {
    path: "Add-Products",
    element: <AddProduct/>
  },
  {
    path: "View-Your-Products",
    element: <Cart/>
  },

]);
