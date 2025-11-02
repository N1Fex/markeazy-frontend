import React, {useEffect} from 'react';
import LoadingPage from "../common/LoadingPage";
import {getToUrl} from "../axios_config";
import OrdersListContent from "./component/OrdersListContent";
import {Button, Card, Container, Typography} from "@mui/material";
import ErrorMessage from "../common/ErrorMessage";
import NeedToBeLoggedIn from "../common/NeedToBeLoggedIn";

const OrdersPage = () => {

  const [isLoading, setIsLoading] = React.useState(false);
  const [response, setResponse] = React.useState({
    isError: false,
    message: "",
  });
  const [page, setPage] = React.useState(0);
  const [isEndOfPage, setEndOfPage] = React.useState(false);
  const [orders, setOrders] = React.useState([]);

  const loadMoreOrders = () => {
    setIsLoading(true);
    getToUrl(`order?page=${page+1}`).then(res => {
      setOrders([...orders, ...res.data]);
      if (res.data.length !== 5) setEndOfPage(true);
      setIsLoading(false);
    }).catch(err => {
      console.log(err);
    });
    setPage(page + 1);
  }

  useEffect(() => {
    setIsLoading(true);
    getToUrl("/order?page=0").then((res) => {
      setOrders(res.data);

      setResponse({
        isError: false,
        status: 200,
        message: "",
      });
      setIsLoading(false);
    }).catch((err) => {
      setResponse({
        isError: true,
        status: err.status,
        message: err.message,
      })
      setIsLoading(false);
    });
  }, [setOrders]);

  return (
      <>

        <Card sx={{maxWidth: "md", marginX: "auto", marginTop: 2, padding: 2, boxSizing: "border-box"}}>
          <Typography variant="h4" component="div" sx={{ textAlign: "center" }}>
            Мои заказы
          </Typography>
        </Card>
        {response.status === 200 && <OrdersListContent orders={orders} />}
        {response.status === 401 && <NeedToBeLoggedIn /> }
        {response.status !== 401 && response.status !== 200 && <ErrorMessage messages={response.message} /> }
        {
          !isEndOfPage && !isLoading && response.status === 200 &&
            <Container sx={{display: "flex", justifyContent: "center", marginBottom: 2}}>
              <Button variant="outlined" sx={{textTransform: 'none'}}
                      onClick={loadMoreOrders}>
                Загрузить еще
              </Button>
            </Container>
        }
        <LoadingPage isLoading={isLoading} />
      </>
  );
};

export default OrdersPage;