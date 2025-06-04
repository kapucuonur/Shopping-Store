import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Products from "../pages/Products";
import About from "../pages/About";
import Notfound from "../pages/Notfound";
import PrivateRouter from "./PrivateRouter";
import ProductsDetail from "../pages/ProductsDetail";
import CartPage from "../pages/CartPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="dashboard" element={<PrivateRouter />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductsDetail />} />
        <Route path="about" element={<About />} />
        <Route path="cart" element={<CartPage />} /> {/* ✅ Fixed */}
      </Route>

      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default AppRouter;