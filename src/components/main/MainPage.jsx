import React, {useEffect, useState} from 'react';
import {getToUrl} from "../axios_config";
import LoadingPage from "../common/LoadingPage";
import SomethingWentWrong from "../common/SomethingWentWrong";
import CatalogContent from "../common/CatalogContent";

const MainPage = () => {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [needNewProducts, setNeedNewProducts] = useState(false);

  const handleScroll = (event) => {
    if (document.body.scrollHeight - document.documentElement.clientHeight - window.scrollY < 300) {
      setNeedNewProducts(!needNewProducts);
      window.removeEventListener('scroll', handleScroll);
    }

  }

  const getRowCapacity = () => {
    const pageWidth = document.documentElement.clientWidth;
    return Math.max(Math.ceil((pageWidth - 876 + getSpacing(pageWidth)) / (280+getSpacing(pageWidth))) + 2, 2);
  }

  const getSpacing = (pageWidth) => {
    if (pageWidth >= 900) return 16;
    if (pageWidth >= 600) return 10;
    return 6;
  }

  useEffect(() => {

    setIsLoading(true);
    setIsError(false);
    //console.log("Use effect worked")
    const rowCap = 3 * getRowCapacity();
    const apiUrl = `/product?limit=${rowCap}`;
    getToUrl(apiUrl).then((resp) => {
      const allProducts = resp.data;
      setProducts(products.concat([...allProducts]));
      setIsLoading(false);

      window.addEventListener("scroll", handleScroll);

    }).catch((err) => {
      console.error(err);
      setIsError(true);
      setIsLoading(false);
    });
  }, [setProducts, setIsLoading, needNewProducts]);

  return (
    <>
      <CatalogContent products={products}/>
      <LoadingPage isLoading={isLoading} />
      <SomethingWentWrong isError={isError} />
    </>
  );
};

export default MainPage;