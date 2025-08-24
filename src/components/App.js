import './App.css';
import {Route, Routes, ScrollRestoration, useLocation} from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./Main";
import LoginPage from "./login/LoginPage";
import PasswordRecovery from "./login/PasswordRecovery";
import NotFoundPage from "./NotFoundPage";
import ProductPage from "./product/ProductPage";
import {useLayoutEffect} from "react";

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
          <Route path="/" element={<Main/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/recovery" element={<PasswordRecovery/>} />
          <Route path="/products/:id" element={<ProductPage/>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
        <Footer />
    </>
  );
}

export default App;
