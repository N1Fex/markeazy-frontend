import React from 'react';
import {Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Stack, Typography} from "@mui/material";
import CounterAmount from "./CounterAmount";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DiscountIcon from "../../common/DiscountIcon";
import SellerLegend from "../../common/SellerLegend";
import {useNavigate} from "react-router-dom";

const CartProductCard = ({id, title, image, price, discount, cartAmount, amount, liked, setLiked, seller, handleSpinClick, handleDeleting}) => {

  const [currentAmount, setCurrentAmount] = React.useState(cartAmount);

  const navigate = useNavigate();

  const handleClickToProduct = () => {
    navigate("/product/" + id);
  }

  return (
      <Card variant="outlined" sx={{display: "flex", borderRadius: 2}}>
        <CardMedia sx={{
          bgcolor: "lightgray",
          flex: "1 1 0",
          height: {xs: 180, md: 180},
          objectFit: "contain",
          cursor: "pointer"
        }}
                   component="img"
                   alt={title}
                   image={image}
                   onClick={handleClickToProduct}/>

        <CardContent sx={{flex: "5 1 0"}} style={{paddingBottom: 16}}>
          <Stack direction="row" spacing={2}>

            <Stack direction="column"
                   justifyContent="space-between"
                   spacing={2}
                   sx={{flex: "3 1 0"}}>
              <Typography variant="h6" color="textPrimary"
                          sx={{cursor: "pointer", flexGrow: 1}}
                          onClick={handleClickToProduct}>
                {title}
              </Typography>
              <SellerLegend seller={seller} />
            </Stack>

            <Stack direction="column" sx={{flex: "1 1 0"}}>
              <Typography variant="h6" color={"#287233"} fontWeight={600}>
                {Math.round(price - price*discount/100)} &#8381;
              </Typography>
              {
                discount > 0 &&
                  <>
                    <DiscountIcon value={discount}/>
                    <Typography variant="body1" color="textSecondary" sx={{textDecoration: "line-through"}}>
                      {price} &#8381;
                    </Typography>
                  </>
            }
            </Stack>

            <CardActions sx={{flex: "1.2 1 0", margin: 0, padding: 0}}>
              <Stack direction="column" justifyContent="space-between" spacing={3}>
                <CounterAmount id={id} value={currentAmount} setValue={setCurrentAmount} handleSpinClick={handleSpinClick} />
                <Box>
                  <Stack direction="row" justifyContent="center" spacing={1}>
                    <IconButton sx={{borderRadius: 2}} onClick={() => setLiked(!liked)}>
                      {
                        liked ?
                          <FavoriteOutlinedIcon sx={{fill: "#E31B23"}} /> :
                          <FavoriteTwoToneIcon sx={{fill: "#606060"}} />
                      }
                    </IconButton>
                    <IconButton sx={{borderRadius: 2}} onClick={() => {
                      handleDeleting(id);
                    }}>
                      <DeleteRoundedIcon sx={{fill: "#B00"}}/>
                    </IconButton>
                  </Stack>
                  <Button
                      sx={{marginTop: 1}}
                      variant="contained"
                      fullWidth>
                    Купить
                  </Button>
                </Box>
              </Stack>
            </CardActions>

          </Stack>
        </CardContent>
      </Card>
  );
};

export default CartProductCard;