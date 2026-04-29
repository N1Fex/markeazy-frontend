import './App.css';
import {Route, Routes, useLocation} from "react-router-dom";
import Header from "./common/header/Header";
import Footer from "./common/footer/Footer";
import MainPage from "./main/MainPage";
import LoginPage from "./login/LoginPage";
import PasswordRecovery from "./login/PasswordRecovery";
import NotFoundPage from "./common/NotFoundPage";
import ProductPage from "./product/ProductPage";
import {useLayoutEffect} from "react";
import SearchPage from "./search/SearchPage";
import ProfilePage from "./profile/ProfilePage";
import Cart from "./cart/Cart";
import OrdersPage from "./order/OrdersPage";
import SellerPage from "./seller/SellerPage";

function App() {
  const location = useLocation();

  // scroll to top of page after a page transition.
  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top:0, left:0, behavior: "instant" });
  }, [location.pathname]);

  return (
      <>
        <Header />
        <Routes>
          <Route index path="/" element={<MainPage/>}/>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/recovery" element={<PasswordRecovery/>} />
          <Route path="/product/:id" element={<ProductPage/>} />
          <Route path="/search" element={<SearchPage/>} />
          <Route path="/settings" element={<ProfilePage/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/myproducts" element={<SellerPage self={true} />} />
          <Route path="/seller/:id" element={<SellerPage />} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
        <Footer />
      </>

  );
}

export default App;
