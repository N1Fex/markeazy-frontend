import React, {useEffect} from 'react';
import {Grid} from "@mui/material";
import ProductCard from "../product/ProductCard";
import {isUserValid} from "../utils/JwtUtils";
import {getLocalCart} from "../cart/CartManager";
import {getToUrl} from "../axios_config";

const CatalogContent = ({products}) => {

  const [cart, setCart] = React.useState([]);

    const addProductToCart = (id, quantity) => {
      const newCart = [...cart, {id: id, amount: quantity}];
      setCart(newCart);
      console.log(newCart);
    }

  useEffect(() => {
    if (isUserValid()) {
      getToUrl("/cart").then((res) => {
        setCart(res.data.map((item) => {return {id: item.product.id, amount: item.quantity}}));
      }).catch((err) => {
        console.log(err);
      })
    } else {
      setCart(getLocalCart());
    }
  }, [setCart]);


  const handleSpinClick = (id, type) => {
    const newCart = cart.map((el) => {
      if (el.id === id) {
        el.amount += type === "add" ? 1 : -1;
      }
      return el;
    });
    setCart(newCart);
  }

  return (
    <Grid container rowSpacing={{md: 1, xs: 0.5}} columnSpacing={{md: 1, xs: 0.25}}
          columns={60} marginY={products.length ? 2 : 0} paddingX={{md: 2, sm: 1, xs: 0.5,}}
          justifyContent="center">
      {
        products.map((product, index) => (
          <Grid key={product.id + index.toString()} size={{xs: 30, sm: "auto"}} justifyItems="center">
            <ProductCard
              id={product.id}
              image={product.image}
              title={product.title}
              discount={product.discount}
              price={product.price}
              rating={product.rating}
              seller={product.seller}
              reviewsCount={product.reviewsCount}
              handleSpinClick={handleSpinClick}
              addToCart={addProductToCart}
              cart={cart}
            />
          </Grid>
        ))
      }
    </Grid>
  );
};

export default CatalogContent;