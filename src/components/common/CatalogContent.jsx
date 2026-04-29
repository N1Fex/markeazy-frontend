import React, {useEffect} from 'react';
import {Grid} from "@mui/material";
import ProductCard from "../product/ProductCard";
import {useAuthState} from "../utils/JwtUtils";
import {addProductToCart, getLocalCart} from "../cart/CartManager";
import {getToUrl} from "../axios_config";

const CatalogContent = ({products, showOwnerActions = false, onEditProduct, onDeleteProduct}) => {

  const [cart, setCart] = React.useState([]);
  const {isAuthorized, isSeller} = useAuthState();

  const addProduct = (id, quantity) => {
    if (isSeller) {
      return;
    }
    const newCart = [...cart, {id: id, amount: quantity}];
    addProductToCart(id);
    setCart(newCart);
  }

  useEffect(() => {
    if (isSeller) {
      setCart([]);
    } else if (isAuthorized) {
      getToUrl("/cart").then((res) => {
        setCart(res.data.map((item) => {return {id: item.product.id, amount: item.quantity}}));
      }).catch((err) => {
        console.log(err);
      })
    } else {
      setCart(getLocalCart());
    }

  }, [isAuthorized, isSeller, setCart]);


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
              title={product.title}
              discount={product.discount}
              price={product.price}
              rating={product.rating}
              seller={product.seller}
              reviewsCount={product.reviewsCount}
              url={product.url !== "" ? product.url : null}
              handleSpinClick={handleSpinClick}
              addToCart={addProduct}
              cart={cart}
              canUseCart={!isSeller}
              showOwnerActions={showOwnerActions}
              onEdit={() => onEditProduct?.(product)}
              onDelete={() => onDeleteProduct?.(product)}
              deleted={product.deleted}
            />
          </Grid>
        ))
      }
    </Grid>
  );
};

export default CatalogContent;
