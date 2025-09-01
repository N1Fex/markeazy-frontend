import React, {useState} from 'react';
import {Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Stack, Typography} from "@mui/material";
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import StoreIcon from '@mui/icons-material/Store';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import {useNavigate} from "react-router-dom";

const ProductCard = ({id, title, discount, image, price, seller, rating, reviewsCount}) => {

  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <Card variant="elevation" sx={{width: {sm: 280, xs: "100%"}, borderRadius: 4, position: "relative"}}>

      <CardMedia title={title} onClick={() => navigate(`/product/${id}`)}
                 sx={{height: {xs: 180, md: 250}, display:"flex",
                      bgcolor: "white", justifyContent: "center", alignItems: "center"}}>
        <Box
          component="img"
          sx={{
            aspectRatio: "auto",
            objectFit: "contain",
            height: "100%",
            width: "100%"
          }}
          alt={title}
          src={"data:image/png;base64,"+image}
        />

      </CardMedia>
      <IconButton onClick={() => setLiked(!liked)} sx={{position: "absolute", right: 2, top: 2}}>
        {
          liked ?
            <FavoriteOutlinedIcon sx={{fill: "#E31B23"}} /> :
            <FavoriteTwoToneIcon sx={{fill: "#606060"}} />
        }
      </IconButton>
      <CardContent sx={{paddingY: 0, paddingX: {md: 2, sm: 1, xs: 0.5}, ":hover":{cursor:"pointer"}}}
                   onClick={() => navigate(`/product/${id}`)}>
        <Stack direction="row" alignItems="center" spacing={1}
               style={{ textOverflow: 'ellipsis', whiteSpace: "nowrap", overflow: "hidden",
                 "WebkitMaskImage": "linear-gradient(90deg, #000 80%, transparent)"}}>
          <Typography variant="h6" color={"#287233"} fontWeight={600}>
            {Math.round(price * (100 - discount)/100)} &#8381;
          </Typography>
          {discount !== 0 ?
            (<Typography fontSize={16} color="text.secondary" sx={{textDecoration: "line-through"}}>
              {price} &#8381;
            </Typography>) : ""}
        </Stack>
        <Typography variant="body1" sx={{ color: 'text.secondary'}}
                    style={{ textOverflow: 'ellipsis', whiteSpace: "nowrap", overflow: "hidden"}}>
          {title}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <StoreIcon sx={{fill: "#112582", fontSize: 16}}/>
          <Typography variant="body2" sx={{ color: 'text.primary',
            textOverflow: 'ellipsis', whiteSpace: "nowrap", overflow: "hidden" }}>
            {seller}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <GradeRoundedIcon fontSize="small" style={{fill: "#f9c54e"}}/>
          <Typography variant="body1" sx={{ color: 'text.primary' }}>
            {rating}
          </Typography>
          <Typography sx={{color: 'text.secondary'}}>-</Typography>
          <RateReviewRoundedIcon sx={{fontSize: 17, fill: "#606060", alignSelf: "end"}}/>
          <Typography variant="body2" sx={{color: 'text.secondary'}}
                      style={{alignSelf: 'last baseline', textOverflow: 'ellipsis', whiteSpace: "nowrap", overflow: "hidden"}}>
            {reviewsCount} оценок
          </Typography>
        </Stack>

      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth sx={{borderRadius: 2}}>
          <AddShoppingCartRoundedIcon sx={{fontSize: 20, marginRight: 1}}/>В корзину
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;