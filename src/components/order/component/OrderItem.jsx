import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Stack,
  Typography
} from "@mui/material";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import OrderProductInfo from "./OrderProductInfo";
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import {getToUrl} from "../../axios_config";

const orderStatusEnum = {
  "UNPAID": {
    bgcolor: "#FF9800",
    textColor: "white",
    icon: <AccessTimeOutlinedIcon />
  },
  "PAID": {
    bgcolor: "#4CAF50",
    textColor: "white",
    icon: <CheckCircleOutlinedIcon />
  },
  "FAILED": {
    bgcolor: "#F44336",
    textColor: "white",
    icon: <ErrorOutlineOutlinedIcon />
  },
  "REFUNDING": {
    bgcolor: "#2196F3",
    textColor: "white",
    icon: <HourglassTopOutlinedIcon />
  },
  "REFUNDED": {
    bgcolor: "#9E9E9E",
    textColor: "black",
    icon: <PriceCheckOutlinedIcon />
  },
  "REJECTED": {
    bgcolor: "#607D8B",
    textColor: "white",
    icon: <BlockOutlinedIcon />

  },
  "CANCELLED": {
    bgcolor: "#9C27B0",
    textColor: "white",
    icon: <CancelOutlinedIcon />
  }
}

const getOrderStatusLabel = (status) => {

  const params = orderStatusEnum[status.name];

  return <Stack
      direction="row"
      spacing={2}
      sx={{bgcolor: params.bgcolor, textColor: params.textColor, borderRadius: 2, paddingX: 2, paddingY: 1}}>
    <Typography>
      {status.description}
    </Typography>
    {params.icon}
  </Stack>

}

const OrderItem = ({id, date, amount, totalSum, status}) => {

  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpened, setIsOpened] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [response, setResponse] = React.useState({status: 0, message: ""});

  const handleExpandButton = (e) => {

    if (!isOpened) {
      if (products.length === 0) {
        setIsLoading(true);
        loadProducts();
      }
    }
    setIsOpened(!isOpened)
  }

  const loadProducts = () => {
    getToUrl(`/order/${id}/products`, {}).then((res) => {
      setProducts(res.data);
      setIsLoading(false);
      setResponse({status: 200, message: ""});
    }).catch((err) => {
      setResponse({status: err.status, message: err.response.message});
      setIsLoading(false);
    })
  }

  return (
      <Card>
        <CardContent>
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" >
            <Stack direction="column">
              <Typography variant="h6">Номер заказа: {id}</Typography>
              <Typography variant="h6">Товаров: {amount}</Typography>
              <Typography variant="h6" sx={{marginTop: 1}}>от: {date.toLocaleDateString("ru")}</Typography>
            </Stack>
            {
              getOrderStatusLabel(status)
            }
            <Typography variant="h5" color="#287233" sx={{fontWeight: 600}}>{totalSum} &#8381;</Typography>
          </Stack>
        </CardContent>
        <CardActions sx={{paddingTop: 0}}>
          <Stack direction="row" justifyContent="end" alignItems="center" width={"100%"}>
            <Button variant="text" sx={{textTransform: 'none'}} onClick={handleExpandButton}>
              Подробности
              {
                isOpened ?
                    <ExpandLessRoundedIcon /> :
                    <ExpandMoreRoundedIcon />
              }
            </Button>
          </Stack>
        </CardActions>
        {
          isOpened &&
              <CardContent>
              <Divider variant="middle" sx={{marginBottom: 2}} />
                {isLoading && <CircularProgress sx={{display: 'block', marginX: "auto"}}/>}
                {response.status === 200 &&
                  <Stack direction="column" spacing={2} width="100%">
                  {
                    products.map((pr, index) => (
                        <OrderProductInfo
                            key={`${index}-${pr.product.id}`}
                            id={pr.product.id}
                            title={pr.product.title}
                            price={pr.price}
                            seller={pr.product.seller}
                            amount={pr.quantity}/>
                    ))
                  }
                  </Stack>
                }
            </CardContent>
        }
      </Card>
  );
};

export default OrderItem;