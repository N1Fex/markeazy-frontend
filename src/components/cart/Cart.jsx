import React, {useEffect} from 'react';
import {Container, Stack, Typography} from "@mui/material";
import CartProductCard from "./component/CartProductCard";
import CartSidebar from "./component/CartSidebar";
import {getToUrl, postToUrl} from "../axios_config";
import {isUserValid} from "../utils/JwtUtils";
import LoadingPage from "../common/LoadingPage";
import {getLocalCart, removeProductFromCart, saveProductsInCart} from "./CartManager";
import ProductionQuantityLimitsRoundedIcon from '@mui/icons-material/ProductionQuantityLimitsRounded';
import {NavLink} from "react-router-dom";

const Cart = () => {

  const [cartProducts, setCartProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleSpinClick = (id, type) => {
    const newCart = cartProducts.map((el) => {
      if (el.product.id === id) {
        el.quantity += type === "add" ? 1 : -1;
      }
      return el;
    });
    saveProductsInCart(newCart, id);
    setCartProducts(newCart);
  }

  const handleDeleteProduct = (id) => {
    removeProductFromCart(id);
    const newCart = cartProducts.filter((el) => el.product.id !== id);
    setCartProducts(newCart);
  }

  useEffect(() => {
    setIsLoading(true);
    if (isUserValid()){
      getToUrl("/cart").then((res) => {

        setCartProducts(res.data);
        setIsLoading(false);
      }).catch((err) => {
        setIsLoading(false);
      })
    } else {
      const cart = getLocalCart();
      const ids = cart.map((el) => Number(el.id));

      postToUrl("/product/list", {
        "ids": ids
      }).then((res) => {
        const data = res.data;

        const newCart = cart.map((item) => {
          return {
            quantity: item.amount,
            product: data.find(el => el.id === item.id),
          }
        });
        setCartProducts(newCart);
        setIsLoading(false);
      }).catch((err) => {
        console.error(err);
      })
    }
  }, [setCartProducts]);

  console.log(cartProducts);

  return (
      <>

        <LoadingPage isLoading={isLoading} />
        <Container sx={{marginY: 2,  borderRadius: 4, borderWidth: 1, width: "95%", paddingY: 3,
          borderColor: "lightgray", border: "1px solid lightgray", borderStyle: "outset",
          display: isLoading ? "none" : "inherit"}}
                  maxWidth={"xl"}>
          <Typography variant="h4" sx={{marginBottom: 2, textAlign:"center"}}>
            Корзина
          </Typography>

          <Container sx={{display: cartProducts.length === 0 ? "flex" : "none", flexDirection: "column",
            justifyContent: "center", alignItems: "center", height: "max(40vh, 300px)"}}>
            <ProductionQuantityLimitsRoundedIcon sx={{fontSize: {xs: 80, md: 120}}}/>
            <Typography variant="h4">
              Корзина пуста :(
            </Typography>
            <Typography variant="h6">
              Похоже вы еще не добавили ни одного товара в корзину
            </Typography>
            <Typography variant="h6">
              <NavLink to="/">Продолжить</NavLink> выбор товаров
            </Typography>
          </Container>

          <Stack direction="row" spacing={2}
                 sx={{display: cartProducts.length > 0 ? "flex" : "none" }}>
            <Stack direction="column" spacing={2} sx={{flexGrow: 1}}>
              {
                cartProducts.map((el) => (
                    <CartProductCard
                        key={el.product.id}
                        handleDeleting={handleDeleteProduct}
                        handleSpinClick={handleSpinClick}
                        id={el.product.id}
                        title={el.product.title}
                        seller={el.product.seller}
                        price={el.product.price}
                        discount={el.product.discount}
                        cartAmount={el.quantity}
                        image={el.product.image}
                    />
                ))
              }
            </Stack>
            <CartSidebar cartProducts={cartProducts} sx={{flexGrow: 2, minWidth: 300}}/>
          </Stack>

        </Container>
      </>
  );
};

export default Cart;