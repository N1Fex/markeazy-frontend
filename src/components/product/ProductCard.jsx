import React, {useState} from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, IconButton, Stack, Typography} from "@mui/material";
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import StoreIcon from '@mui/icons-material/Store';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import {useNavigate} from "react-router-dom";

const ProductCard = ({id, title, image, price, producer, rating, reviewsCount}) => {

  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <Card variant="elevation" sx={{width: {sm: 280, xs: "100%"}, borderRadius: 4}}>

      <CardMedia image={image} title={title}
                 sx={{position: "relative", height: 250, display:"flex",
                   justifyContent: "end", alignItems:"start", bgcolor: "lightgray"}}>
        <IconButton onClick={() => setLiked(!liked)}>
          {
            liked ?
            <FavoriteOutlinedIcon sx={{fill: "#E31B23"}}/> :
            <FavoriteTwoToneIcon sx={{fill: "#606060"}} />
          }
        </IconButton>
      </CardMedia>

      <CardContent sx={{paddingY: 0, paddingX: {md: 2, sm: 1, xs: 0.5}, ":hover":{cursor:"pointer"}}}
                   onClick={() => navigate(`/products/${id}`)}>
        <Stack direction="row" alignItems="center" spacing={1}
               style={{ textOverflow: 'ellipsis', whiteSpace: "nowrap", overflow: "hidden",
                 "-webkit-mask-image": "linear-gradient(90deg, #000 80%, transparent)"}}>
          <Typography variant="h6" color={"#287233"} fontWeight={600}>
            {price} &#8381;
          </Typography>
          <Typography fontSize={16} color="text.secondary" sx={{textDecoration: "line-through"}}>
            {Math.round(price * 1.4 * 100)/100} &#8381;
          </Typography>
        </Stack>
        <Typography variant="body1" sx={{ color: 'text.secondary'}}
                    style={{ textOverflow: 'ellipsis', whiteSpace: "nowrap", overflow: "hidden"}}>
          {title}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <StoreIcon sx={{fill: "#112582", fontSize: 16}}/>
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            {producer}
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