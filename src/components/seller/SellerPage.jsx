import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Snackbar,
  Stack,
  Typography
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {deleteToUrl, getToUrl, patchToUrl, postToUrl} from "../axios_config";
import LoadingPage from "../common/LoadingPage";
import SomethingWentWrong from "../common/SomethingWentWrong";
import CatalogContent from "../common/CatalogContent";
import {convertDateToString} from "../utils/DateUtils";
import {useAuthState} from "../utils/JwtUtils";
import SellerLegend from "../common/SellerLegend";
import ProductFormDialog from "./ProductFormDialog";

const MAX_PRODUCTS_LIMIT = 20;

const SellerPage = ({self = false}) => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const loaderRef = useRef(null);

  const [seller, setSeller] = useState(null);
  const [currentSellerId, setCurrentSellerId] = useState(null);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [isSellerLoading, setIsSellerLoading] = useState(true);
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [errorCode, setErrorCode] = useState(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [productDialogMode, setProductDialogMode] = useState("create");
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false);
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [productsReloadKey, setProductsReloadKey] = useState(0);

  const {accountType, isAuthorized} = useAuthState();
  const shouldRedirectToLogin = self && !isAuthorized;
  const shouldBlockByRole = self && isAuthorized && accountType !== "SELLER";
  const isLoading = isSellerLoading || isProductsLoading;
  const isOwnSellerPage = Boolean(self || (seller?.id && currentSellerId && seller.id === currentSellerId));

  const getSpacing = useCallback((pageWidth) => {
    if (pageWidth >= 900) return 16;
    if (pageWidth >= 600) return 10;
    return 6;
  }, []);

  const getRowCapacity = useCallback(() => {
    const pageWidth = document.documentElement.clientWidth;
    return Math.max(Math.ceil((pageWidth - 876 + getSpacing(pageWidth)) / (280 + getSpacing(pageWidth))) + 2, 2);
  }, [getSpacing]);

  const getProductsLimit = useCallback(() => {
    return Math.min(3 * getRowCapacity(), MAX_PRODUCTS_LIMIT);
  }, [getRowCapacity]);

  const reloadProducts = () => {
    setProducts([]);
    setPage(0);
    setHasMoreProducts(true);
    setIsProductsLoading(false);
    setErrorCode(null);
    setProductsReloadKey((prevState) => prevState + 1);
  };

  const buildProductFormData = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("discount", values.discount);
    formData.append("amount", values.amount);
    if (values.image) {
      formData.append("image", values.image);
    }
    return formData;
  };

  useEffect(() => {
    if (shouldRedirectToLogin) {
      navigate("/login");
    }
  }, [navigate, shouldRedirectToLogin]);

  useEffect(() => {
    if (!isAuthorized || accountType !== "SELLER") {
      setCurrentSellerId(null);
      return;
    }

    getToUrl("/seller/me")
        .then((res) => {
          setCurrentSellerId(res.data.id);
        })
        .catch(() => {
          setCurrentSellerId(null);
        });
  }, [accountType, isAuthorized]);

  useEffect(() => {
    if (shouldRedirectToLogin || shouldBlockByRole) {
      setIsSellerLoading(false);
      return;
    }

    const sellerPath = self ? "/seller/me" : "/seller/" + id;
    setIsSellerLoading(true);
    setIsProductsLoading(false);
    setErrorCode(null);
    setSeller(null);
    setProducts([]);
    setPage(0);
    setHasMoreProducts(true);

    getToUrl(sellerPath)
        .then((res) => {
          setSeller(res.data);
          setIsSellerLoading(false);
        })
        .catch((error) => {
          setErrorCode(error?.response?.status ?? error?.status);
          setIsSellerLoading(false);
        });
  }, [id, self, shouldBlockByRole, shouldRedirectToLogin]);

  useEffect(() => {
    if (!seller?.id || shouldRedirectToLogin || shouldBlockByRole || !hasMoreProducts) {
      return;
    }

    const productsLimit = getProductsLimit();
    setIsProductsLoading(true);
    getToUrl("/seller/" + seller.id + "/products?offset=" + page + "&limit=" + productsLimit)
        .then((res) => {
          const newProducts = res.data ?? [];
          setProducts((prevProducts) => page === 0 ? newProducts : prevProducts.concat(newProducts));
          setHasMoreProducts(newProducts.length === productsLimit);
          setIsProductsLoading(false);
        })
        .catch((error) => {
          setErrorCode(error?.response?.status ?? error?.status);
          setIsProductsLoading(false);
        });
  }, [seller, page, hasMoreProducts, shouldBlockByRole, shouldRedirectToLogin, productsReloadKey, getProductsLimit]);

  useEffect(() => {
    if (!seller || !hasMoreProducts || shouldBlockByRole || shouldRedirectToLogin) {
      return;
    }

    const currentLoader = loaderRef.current;
    if (!currentLoader) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && !isProductsLoading && products.length > 0) {
        setPage((prevPage) => prevPage + 1);
      }
    }, {
      rootMargin: "250px",
    });

    observer.observe(currentLoader);

    return () => {
      observer.unobserve(currentLoader);
      observer.disconnect();
    };
  }, [seller, hasMoreProducts, isProductsLoading, products.length, shouldBlockByRole, shouldRedirectToLogin]);

  const handleOpenCreateDialog = () => {
    setProductDialogMode("create");
    setEditingProduct(null);
    setIsProductDialogOpen(true);
  };

  const handleOpenEditDialog = (product) => {
    setProductDialogMode("edit");
    setEditingProduct(product);
    setIsProductDialogOpen(true);
  };

  const handleCloseProductDialog = () => {
    if (isSubmittingProduct) {
      return;
    }
    setIsProductDialogOpen(false);
    setEditingProduct(null);
  };

  const handleSubmitProduct = async (values) => {
    try {
      setIsSubmittingProduct(true);
      const formData = buildProductFormData(values);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      if (productDialogMode === "edit" && editingProduct?.id) {
        await patchToUrl(`/product/${editingProduct.id}`, formData, config);
        setSnackbarMessage("Товар успешно обновлен.");
      } else {
        await postToUrl("/product/", formData, config);
        setSnackbarMessage("Товар успешно добавлен.");
      }

      setIsProductDialogOpen(false);
      setEditingProduct(null);
      reloadProducts();
    } catch (error) {
      const message = error?.response?.status === 413
          ? "Изображение слишком большое."
          : "Не удалось сохранить товар. Попробуйте позже.";
      setSnackbarMessage(message);
    } finally {
      setIsSubmittingProduct(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!deletingProduct?.id) {
      return;
    }

    try {
      setIsDeletingProduct(true);
      await deleteToUrl(`/product/${deletingProduct.id}`);
      setDeletingProduct(null);
      setSnackbarMessage("Товар удален.");
      reloadProducts();
    } catch (error) {
      setSnackbarMessage("Не удалось удалить товар. Попробуйте позже.");
    } finally {
      setIsDeletingProduct(false);
    }
  };

  if (shouldRedirectToLogin) {
    return <LoadingPage isLoading={true} />;
  }

  if (shouldBlockByRole) {
    return (
        <Container sx={{py: 6}}>
          <Alert severity="warning">Вы не являетесь продавцом</Alert>
        </Container>
    );
  }

  if (errorCode === 404) {
    return (
        <Container sx={{py: 6}}>
          <Alert severity="info">Продавец не найден</Alert>
        </Container>
    );
  }

  return (
      <>
        {seller && !errorCode ? (
            <Container sx={{py: 3}}>
              <Paper
                  elevation={0}
                  sx={{
                    p: {md: 4, xs: 2.5},
                    borderRadius: 6,
                    border: "1px solid #d9e3f0",
                    background: "linear-gradient(135deg, #f7fbff 0%, #eef5ff 55%, #fdfefe 100%)",
                    boxShadow: "0 18px 50px rgba(17,37,130,0.08)",
                  }}
              >
                <Stack spacing={3}>
                  <Stack
                      direction={{md: "row", xs: "column"}}
                      justifyContent="space-between"
                      alignItems={{md: "center", xs: "flex-start"}}
                      spacing={2}
                  >
                    <Stack spacing={1.25}>
                      <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
                        <Typography
                            variant="h3"
                            sx={{
                              fontSize: {md: "2.4rem", xs: "1.9rem"},
                              fontWeight: 700,
                              color: "#16213d",
                            }}
                        >
                          {seller.name}
                        </Typography>
                        <SellerLegend
                            seller={seller}
                            hideName={true}
                            clickable={false}
                            iconSize={26}
                            iconColor={"#1d4f91"}
                            sx={{
                              width: 38,
                              height: 38,
                              justifyContent: "center",
                              borderRadius: "50%",
                              bgcolor: "rgba(29,79,145,0.10)",
                              border: "1px solid rgba(29,79,145,0.18)",
                            }}
                        />
                        {isOwnSellerPage ? <Chip label="Это вы" color="primary" variant="outlined"/> : null}
                      </Stack>

                      <Typography color="#52607a" sx={{maxWidth: 620}}>
                        {isOwnSellerPage
                            ? "Здесь собраны ваши товары, которые видят покупатели."
                            : "Витрина магазина с товарами продавца и актуальной информацией о нем."}
                      </Typography>
                    </Stack>

                    <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          minWidth: {md: 240, xs: "100%"},
                          borderRadius: 4,
                          bgcolor: "rgba(255,255,255,0.7)",
                          border: "1px solid rgba(17,37,130,0.10)",
                        }}
                    >
                      <Stack spacing={0.75}>
                        <Typography variant="overline" color="#5f6f8a">
                          Магазин
                        </Typography>
                        <Typography fontWeight={600}>
                          Дата регистрации: {convertDateToString(new Date(seller.registration_date ?? seller.registrationDate))}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Stack>
                </Stack>
              </Paper>
            </Container>
        ) : null}

        {seller && !errorCode ? (
            <Container sx={{pt: 1, pb: products.length ? 0 : 2}}>
              <Stack
                  direction={{sm: "row", xs: "column"}}
                  justifyContent="space-between"
                  alignItems={{sm: "center", xs: "flex-start"}}
                  spacing={1.5}
              >
                <Typography variant="h5" fontWeight={700} color="#1b2742">
                  Товары магазина
                </Typography>
                {self ? (
                    <Button variant="contained" onClick={handleOpenCreateDialog} sx={{textTransform: "none"}}>
                      Добавить товар
                    </Button>
                ) : null}
              </Stack>
            </Container>
        ) : null}

        <Container maxWidth={false} sx={{px: {xl: 14, lg: 10, md: 7, sm: 4, xs: 1.5}}}>
          <CatalogContent
              products={products}
              showOwnerActions={self}
              onEditProduct={handleOpenEditDialog}
              onDeleteProduct={setDeletingProduct}
          />
        </Container>

        {seller && !products.length && !hasMoreProducts && !isLoading && !errorCode ? (
            <Container sx={{pb: 5}}>
              <Paper
                  elevation={0}
                  sx={{
                    py: 4,
                    px: 3,
                    textAlign: "center",
                    borderRadius: 5,
                    border: "1px dashed #bfd0e7",
                    bgcolor: "#f9fbfe",
                  }}
              >
                <Typography variant="h6" color="#43516c">
                  {isOwnSellerPage ? "У вас пока нет товаров." : "У этого продавца пока нет товаров."}
                </Typography>
              </Paper>
            </Container>
        ) : null}

        {hasMoreProducts && !errorCode ? <Box ref={loaderRef} sx={{height: 1}}/> : null}
        <ProductFormDialog
            open={isProductDialogOpen}
            mode={productDialogMode}
            product={editingProduct}
            isSubmitting={isSubmittingProduct}
            onClose={handleCloseProductDialog}
            onSubmit={handleSubmitProduct}
        />
        <Dialog open={Boolean(deletingProduct)} onClose={() => !isDeletingProduct && setDeletingProduct(null)}>
          <DialogTitle>Удалить товар?</DialogTitle>
          <DialogContent>
            <Typography>
              {deletingProduct ? `Товар "${deletingProduct.title}" будет удален без возможности восстановления.` : ""}
            </Typography>
          </DialogContent>
          <DialogActions sx={{px: 3, pb: 2}}>
            <Button onClick={() => setDeletingProduct(null)} disabled={isDeletingProduct}>
              Отмена
            </Button>
            <Button color="error" variant="contained" onClick={handleDeleteProduct} disabled={isDeletingProduct}>
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
            open={Boolean(snackbarMessage)}
            autoHideDuration={4000}
            onClose={() => setSnackbarMessage("")}
            anchorOrigin={{vertical: "top", horizontal: "center"}}
        >
          <Alert onClose={() => setSnackbarMessage("")} severity="info" variant="filled" sx={{width: "100%"}}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <LoadingPage isLoading={isLoading}/>
        <SomethingWentWrong isError={Math.floor((errorCode ?? 0) / 100) === 5 || errorCode === undefined} />
      </>
  );
};

export default SellerPage;
