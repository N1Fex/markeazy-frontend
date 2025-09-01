import React, {useEffect} from 'react';
import CatalogContent from "../common/CatalogContent";
import {getToUrl} from "../axios_config";
import LoadingPage from "../common/LoadingPage";
import SomethingWentWrong from "../common/SomethingWentWrong";
import {useSearchParams} from "react-router-dom";
import NoMoreProductFound from "./NoMoreProductFound";
import {Container, Typography} from "@mui/material";

const SearchPage = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const [query, setQuery] = React.useState(searchParams.get("query"));
  const [needNewProducts, setNeedNewProducts] = React.useState(false);
  const [areProductsOut, setAreProductsOut] = React.useState(false);


  const handleScroll = (event) => {
    if (document.body.scrollHeight - document.documentElement.clientHeight - window.scrollY < 300) {
      setNeedNewProducts(!needNewProducts);
      window.removeEventListener('scroll', handleScroll);
    }
  }

  const getSpacing = (pageWidth) => {
    if (pageWidth >= 900) return 24;
    if (pageWidth >= 600) return 10;
    return 6;
  }

  const getRowCapacity = () => {
    const pageWidth = document.documentElement.clientWidth;
    return Math.max(Math.ceil((pageWidth - 876 + getSpacing(pageWidth)) / (280+getSpacing(pageWidth))) + 2, 2);
  }

  useEffect(() => {

    setIsLoading(true);
    setIsError(false);
    const text = searchParams.get("query");

    let queryParam = query;
    let offsetParam = offset;
    if (text !== query) {
      setQuery(text);
      setOffset(0);
      queryParam = text;
      offsetParam = 0;
      setAreProductsOut(false);
      setProducts([]);
    }

    const rowCap = 3 * getRowCapacity();
    const apiUrl = `/product/search?query=${queryParam}&offset=${offsetParam}&limit=${rowCap}`;
    getToUrl(apiUrl, {}).then((resp) => {
      const allProducts = resp.data;
      if (allProducts.length === 0) {
        setAreProductsOut(true);
      } else {
        setProducts(text !== query ? allProducts : products.concat([...allProducts]));
        setOffset(offset+1);
        window.addEventListener("scroll", handleScroll);
      }
      setIsLoading(false);
    }).catch((err) => {
      console.error(err);
      setIsError(true);
      setIsLoading(false);
    });
  }, [setProducts, setIsLoading, searchParams, needNewProducts]);

  return (
    <>
      <Container sx={{display: isLoading ? "none" : "flex", marginTop: 2, width:"auto",
        justifyContent: "center"}}>
        <Typography variant="h6" textAlign="center" sx={{boxShadow: "1px 1px 2px #808080",
          borderRadius: 2, paddingX: 3, paddingY: 1}}>
          Показаны результаты по запросу: {query}
        </Typography>
      </Container>
      <CatalogContent products={products}/>
      <LoadingPage isLoading={isLoading} />
      <SomethingWentWrong isError={isError} />
      {areProductsOut ? <NoMoreProductFound /> : null}
    </>
  );
};

export default SearchPage;