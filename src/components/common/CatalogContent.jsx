import React from 'react';
import {Grid} from "@mui/material";
import ProductCard from "../product/ProductCard";

const CatalogContent = ({products}) => {
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
              reviewsCount={product.reviewsCount}/>
          </Grid>
        ))
      }
    </Grid>
  );
};

export default CatalogContent;