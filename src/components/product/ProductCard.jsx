import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Stack, Typography} from "@mui/material";
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {useNavigate} from "react-router-dom";
import SellerLegend from "../common/SellerLegend";
import CounterAmount from "../cart/component/CounterAmount";

const ProductCard = ({
  id,
  title,
  discount,
  price,
  url,
  seller,
  rating,
  reviewsCount,
  handleSpinClick,
  cart,
  addToCart,
  canUseCart = true,
  showOwnerActions = false,
  onEdit,
  onDelete,
  deleted = false,
}) => {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const discountedPrice = Math.round(price * (100 - discount) / 100).toLocaleString('ru-RU');
  const formattedPrice = Number(price).toLocaleString('ru-RU');
  const canManageProduct = showOwnerActions && !deleted;
  const canAddToCart = canUseCart && !deleted;

  useEffect(() => {
    const finded = cart.find((e) => e.id === id);
    if (finded) {
      setAmount(finded.amount);
    } else {
      setAmount(0);
    }
  }, [cart, id]);

  return (
      <Card
          variant="elevation"
          sx={{
            width: {sm: 280, xs: "100%"},
            borderRadius: 4,
            position: "relative",
            opacity: deleted ? 0.82 : 1,
            border: deleted ? "1px solid rgba(211,47,47,0.24)" : undefined,
            background: deleted ? "linear-gradient(180deg, #fff 0%, #fff8f8 100%)" : undefined,
          }}
      >
        <CardMedia
            title={title}
            onClick={() => navigate(`/product/${id}`)}
            sx={{
              height: {xs: 180, md: 250},
              display: "flex",
              bgcolor: "white",
              justifyContent: "center",
              alignItems: "center"
            }}
        >
          <Box
              component="img"
              sx={{
                aspectRatio: "auto",
                objectFit: "contain",
                height: "100%",
                width: "100%"
              }}
              alt={title}
              src={url}
          />
        </CardMedia>

        {deleted ? (
            <Chip
                label="Удален"
                color="error"
                size="small"
                sx={{position: "absolute", left: 10, top: 10, fontWeight: 600, zIndex: 1}}
            />
        ) : null}

        {canManageProduct ? (
            <Stack
                direction="row"
                spacing={0.5}
                sx={{position: "absolute", right: 8, top: 8, zIndex: 1}}
            >
              <IconButton
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    onEdit?.();
                  }}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.95)",
                    border: "1px solid rgba(25,118,210,0.2)",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                    "&:hover": {bgcolor: "rgba(255,255,255,1)"},
                  }}
              >
                <EditOutlinedIcon sx={{fontSize: 18, color: "#1976d2"}} />
              </IconButton>
              <IconButton
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete?.();
                  }}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.95)",
                    border: "1px solid rgba(211,47,47,0.18)",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                    "&:hover": {bgcolor: "rgba(255,255,255,1)"},
                  }}
              >
                <DeleteOutlineRoundedIcon sx={{fontSize: 18, color: "#d32f2f"}} />
              </IconButton>
            </Stack>
        ) : null}

        <CardContent
            sx={{paddingY: 0, paddingX: {md: 2, sm: 1, xs: 0.5}, ":hover": {cursor: "pointer"}}}
            onClick={() => navigate(`/product/${id}`)}
        >
          <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              style={{
                textOverflow: 'ellipsis',
                whiteSpace: "nowrap",
                overflow: "hidden",
                WebkitMaskImage: "linear-gradient(90deg, #000 80%, transparent)"
              }}
          >
            <Typography variant="h6" color={deleted ? "#6c757d" : "#287233"} fontWeight={600}>
              {discountedPrice} &#8381;
            </Typography>
            {discount !== 0 ? (
                <Typography fontSize={16} color="text.secondary" sx={{textDecoration: "line-through"}}>
                  {formattedPrice} &#8381;
                </Typography>
            ) : ""}
          </Stack>

          <Typography
              variant="body1"
              sx={{color: 'text.secondary'}}
              style={{textOverflow: 'ellipsis', whiteSpace: "nowrap", overflow: "hidden"}}
          >
            {title}
          </Typography>

          <SellerLegend seller={seller} />

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <GradeRoundedIcon fontSize="small" style={{fill: "#f9c54e"}}/>
            <Typography variant="body1" sx={{color: 'text.primary'}}>
              {rating}
            </Typography>
            <Typography sx={{color: 'text.secondary'}}>-</Typography>
            <RateReviewRoundedIcon sx={{fontSize: 17, fill: "#606060", alignSelf: "end"}}/>
            <Typography
                variant="body2"
                sx={{color: 'text.secondary'}}
                style={{alignSelf: 'last baseline', textOverflow: 'ellipsis', whiteSpace: "nowrap", overflow: "hidden"}}
            >
              {reviewsCount} оценок
            </Typography>
          </Stack>
        </CardContent>

        <CardActions>
          {canAddToCart && amount !== 0 ? (
              <CounterAmount
                  id={id}
                  value={amount}
                  setValue={setAmount}
                  handleSpinClick={handleSpinClick}
                  sx={{height: 36}}
              />
          ) : (
              <Button
                  variant="contained"
                  fullWidth
                  color={deleted ? "inherit" : "primary"}
                  sx={{borderRadius: 2}}
                  disabled={!canAddToCart}
                  onClick={() => {
                    if (canAddToCart) {
                      addToCart(id, 1);
                    }
                  }}
              >
                <AddShoppingCartRoundedIcon sx={{fontSize: 20, marginRight: 1}}/>
                {deleted ? "Удален" : "В корзину"}
              </Button>
          )}
        </CardActions>
      </Card>
  );
};

export default ProductCard;
