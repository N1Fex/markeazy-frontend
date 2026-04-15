import React from 'react';
import {Alert, Backdrop, Button, Card, CircularProgress, Divider, Snackbar, Stack, Typography} from "@mui/material";
import {postToUrl} from "../../axios_config";
import {useNavigate} from "react-router-dom";

const CartSidebar = ({cartProducts, sx, style}) => {

  const info = {
    prePrice: 0,
    resultPrice: 0,
    discountSum: 0,

    productsQuantity: 0,
  };

  const navigate = useNavigate();

  cartProducts.forEach((item) => {
    info.productsQuantity += item.quantity;
    const product = item.product;

    info.prePrice += item.quantity*product.price;
    info.discountSum += item.quantity*Math.round(product.price * product.discount/100);
    info.resultPrice += item.quantity*Math.round(product.price - product.price * product.discount/100);
  })

  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarParams, setSnackbarParams] = React.useState({
    message: "",
    severity: "success"
  });

  const handleCloseSnackbar = (e, reason) => {
    setOpenSnackbar(false);
  }

  const handleOrderPlacing = (e) => {
    e.preventDefault();
    setOpenBackdrop(true);

    const productsToOrder = [...new Set(cartProducts.map(item => {
      return {
        productId: item.product.id,
        quantity: item.quantity,
      }
    })
    )];

    postToUrl("/order", productsToOrder).then(res => {
      setOpenBackdrop(false);
      navigate("/orders")
      setSnackbarParams({
        severity: "success",
        message: "Заказ успешно оформлен!"
      })
      setOpenSnackbar(true);
    }).catch(err => {
      if (err.status === 401) {
        navigate("/login");
        setOpenBackdrop(false);
      } else {
        setOpenBackdrop(false);
        setSnackbarParams({
          severity: "error",
          message: err.message === "Network Error" ?"Сервер сейчас не доступен, попробуйте позже" : err.message
        })
        setOpenSnackbar(true);
      }

    });
  }

  return (
      <>
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={openBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}
                  anchorOrigin={{vertical: "top", horizontal: "center" }}>
          <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarParams.severity}
              variant="filled"
              sx={{ width: '100%' }}
          >
            {snackbarParams.message}
          </Alert>
        </Snackbar>
        <Stack
            direction="column"
            spacing={2}
            sx={{
              position: "sticky",
              top: 16,
              height: "max-content",
              borderColor: "lightgray",
              border: "1px solid lightgray",
              borderStyle: "outset",
              borderRadius: 2,
              padding: 2,
              ...sx}}
            style={{...style}}>
          <Typography variant="h5" align="center">
            Оформление заказа
          </Typography>
          <Divider variant="horizontal" />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">
              Товары, {info.productsQuantity} шт.
            </Typography>
            <Typography variant="h6">
              {info.prePrice} &#8381;
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">
              Моя скидка
            </Typography>
            <Typography variant="h6" color="#C72C41">
              -{info.discountSum} &#8381;
            </Typography>
          </Stack>
          <Divider variant="horizontal" />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4" fontWeight={600}>
              Итого:
            </Typography>
            <Typography variant="h4" fontWeight={600} color="#287233">
              {info.resultPrice} &#8381;
            </Typography>
          </Stack>

          <Button variant={"contained"} sx={{padding: 2, borderRadius: 2,
            textTransform: "none", fontWeight: 600, fontSize: 18}}
                  onClick={handleOrderPlacing}>
            Оформить заказ
          </Button>
        </Stack>
      </>
  );
};

export default CartSidebar;