import React from 'react';
import {Container, Grid, Typography} from "@mui/material";
import ProductCard from "./product/ProductCard";
import {productsList} from "./data";

const Main = () => {
  return (
    <>
      <Grid container rowSpacing={{md: 1, xs: 0.5}} columnSpacing={{md: 1, xs: 0.25}}
            columns={60} marginY={2} paddingX={{md: 2, sm: 1, xs: 0.5}} justifyContent="center">
        {
          productsList.slice(0, 20).map((product, index) => (
            <Grid key={index} item size={{xs: 30, sm: "auto"}} justifyItems="center">
              <ProductCard
                id={index}
                title={product.title}
                price={product.price}
                rating={product.rating}
                producer={product.producer}
                reviewsCount={product.reviewsCount}/>
            </Grid>
          ))
        }
      </Grid>

    </>
  );
};

export default Main;