import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {deleteToUrl, getToUrl, patchToUrl, postToUrl} from "../axios_config";
import SellerLegend from "../common/SellerLegend";
import DiscountIcon from "../common/DiscountIcon";
import {addProductToCart, getLocalCart} from "../cart/CartManager";
import CounterAmount from "../cart/component/CounterAmount";
import {useAuthState} from "../utils/JwtUtils";

const ProductPage = () => {
  const {id} = useParams();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const [error, setError] = useState(null);
  const [reviewsError, setReviewsError] = useState(null);

  const [cart, setCart] = React.useState([]);
  const [inCartAmount, setInCartAmount] = useState(0);

  const [myReview, setMyReview] = useState(null);
  const [checkingMyReview, setCheckingMyReview] = useState(true);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);
  const {isAuthorized, isSeller} = useAuthState();

  const fetchMyReview = async () => {
    if (!isAuthorized || isSeller) {
      setMyReview(null);
      setCheckingMyReview(false);
      return;
    }

    try {
      setCheckingMyReview(true);
      const res = await getToUrl(`/review/${id}/my`);
      setMyReview(res.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setMyReview(null);
      } else {
        console.error(err);
      }
    } finally {
      setCheckingMyReview(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await getToUrl(`/product/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          setError('Для просмотра этой страницы нужно авторизоваться');
        } else if (err.response?.status === 404) {
          setError('Товар не найден');
        } else {
          setError('Не удалось загрузить товар. Попробуйте позже');
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        setReviewsLoading(true);
        setReviewsError(null);

        const reviewsRes = await getToUrl(`/review/${id}?offset=0`);
        setReviews(Array.isArray(reviewsRes.data) ? reviewsRes.data : []);
      } catch (err) {
        console.error(err);
        setReviewsError('Не удалось загрузить отзывы');
      } finally {
        setReviewsLoading(false);
      }
    };

    const loadData = async () => {
      try {
        if (isSeller) {
          setCart([]);
          setInCartAmount(0);
        } else if (isAuthorized) {
          const res = await getToUrl("/cart");
          const currentCart = Array.isArray(res.data)
              ? res.data.map((item) => ({
                id: item.product.id,
                amount: item.quantity
              }))
              : [];

          const found = currentCart.find((e) => e.id === Number(id) || e.id === id);
          if (found) {
            setInCartAmount(found.amount);
          } else {
            setInCartAmount(0);
          }

          setCart(currentCart);
        } else {
          const localCart = getLocalCart();
          setCart(localCart);

          const found = localCart.find((e) => e.id === id || e.id === Number(id));
          if (found) {
            setInCartAmount(found.amount);
          } else {
            setInCartAmount(0);
          }
        }

        await fetchProduct();
        await fetchReviews();
        await fetchMyReview();
      } catch (err) {
        console.error("Ошибка загрузки:", err);
      }
    };

    loadData();
  }, [id, isAuthorized, isSeller]);

  const discountPrice = product
      ? Math.round(product.price * (1 - product.discount / 100))
      : 0;
  const isDeletedProduct = Boolean(product?.deleted);
  const isCartActionBlocked = isSeller || isDeletedProduct || product?.amount === 0;

  const handleAddToCart = () => {
    if (isSeller || isDeletedProduct) {
      return;
    }

    addProductToCart(id);
    const newCart = [...cart, {id: id, amount: 1}];
    setCart(newCart);
    setInCartAmount(1);
  };

  const handleSpinClick = (productId, type) => {
    const newCart = cart.map((el) => {
      if (el.id === productId) {
        return {...el, amount: el.amount + (type === "add" ? 1 : -1)};
      }
      return el;
    });
    setCart(newCart);
  };

  const formatReviewDate = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleSubmitReview = async () => {
    try {
      setSubmittingReview(true);

      if (myReview) {
        await patchToUrl(`/review`, {
          id: myReview.id,
          content: reviewText,
          mark: reviewRating
        });
      } else {
        await postToUrl(`/review`, {
          product: {
            id: id
          },
          content: reviewText,
          mark: reviewRating
        });
      }

      setShowReviewForm(false);
      setReviewText('');
      setReviewRating(5);

      await fetchMyReview();

      const res = await getToUrl(`/review/${id}?offset=0`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDeleteReview = async () => {
    try {
      await deleteToUrl(`/review?product_id=${myReview.id}`);
      setMyReview(null);

      const res = await getToUrl(`/review/${id}?offset=0`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditReview = () => {
    setReviewText(myReview.content);
    setReviewRating(myReview.mark);
    setShowReviewForm(true);
  };

  if (loading) {
    return (
        <Container sx={{py: 8, display: 'flex', justifyContent: 'center'}}>
          <CircularProgress size={60} />
        </Container>
    );
  }

  if (error) {
    return (
        <Stack sx={{justifyContent: "center", alignItems: "center", width: "100%", paddingY: 3, height: {md: "50vh", xs: "20vh"}}}>
          <Alert severity="error" sx={{maxWidth: 600, mx: 'auto', px: 2}}>
            {error}
          </Alert>
        </Stack>
    );
  }

  return (
      <Container maxWidth="lg" sx={{py: 4}}>
        <Grid container spacing={4}>
          <Grid item size={{xs: 12, md: 6}}>
            <Paper elevation={2} sx={{p: 2}}>
              <Box
                  component="img"
                  src={product.url !== "" ? product.url : "https://www.cassidybros.ie/wp-content/uploads/2020/11/product-placeholder.jpg"}
                  alt="картинка товара"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '500px',
                    display: 'block',
                    mx: 'auto',
                    opacity: isDeletedProduct ? 0.8 : 1,
                  }}
              />
            </Paper>
          </Grid>

          <Grid item size={{xs: 12, md: 6}}>
            <Stack spacing={3}>
              <Typography variant="h4" component="h1" fontWeight="bold">
                {product.title}
              </Typography>

              <Stack direction="row" gap={1}>
                <Typography variant="subtitle1" color="text.secondary">
                  Продавец:
                </Typography>
                <SellerLegend seller={product.seller} />
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <Rating value={product.rating} precision={0.1} readOnly size="medium" />
                <Typography variant="body1">
                  {product.rating?.toFixed(1)} ({product.reviewsCount} отзывов)
                </Typography>
              </Stack>

              <Divider />

              {isDeletedProduct ? (
                  <Alert severity="warning" sx={{borderRadius: 3}}>
                    Товар удален. Он недоступен для добавления в корзину.
                  </Alert>
              ) : null}

              <Box>
                {product.discount > 0 ? (
                    <Stack direction="row" spacing={2} alignItems="baseline">
                      <Typography variant="h3" color={isDeletedProduct ? "#6c757d" : "#287233"} fontWeight="bold">
                        {discountPrice.toLocaleString('ru-RU')} ₽
                      </Typography>
                      <Typography variant="h5" color="text.secondary" sx={{textDecoration: 'line-through'}}>
                        {Number(product.price).toLocaleString('ru-RU')} ₽
                      </Typography>
                      <DiscountIcon value={product.discount} sx={{alignSelf: "start", marginTop: 10}}/>
                    </Stack>
                ) : (
                    <Typography variant="h3" fontWeight="bold" color={isDeletedProduct ? "#6c757d" : "inherit"}>
                      {Number(product.price).toLocaleString('ru-RU')} ₽
                    </Typography>
                )}
              </Box>

              <Typography variant="body1">
                В наличии:{' '}
                <Typography component="span" fontWeight="bold">
                  {product.amount > 0 ? `${product.amount} шт.` : 'Нет в наличии'}
                </Typography>
              </Typography>

              <Stack direction="row" spacing={2} sx={{mt: 3}}>
                {!isSeller && !isDeletedProduct && inCartAmount !== 0 ? (
                    <CounterAmount
                        id={id}
                        value={inCartAmount}
                        setValue={setInCartAmount}
                        handleSpinClick={handleSpinClick}
                        sx={{height: 36}}
                    />
                ) : (
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<AddShoppingCartIcon />}
                        onClick={handleAddToCart}
                        disabled={isCartActionBlocked}
                        color={isDeletedProduct ? "inherit" : "primary"}
                        sx={{flex: 1, py: 1.5}}
                    >
                      {isDeletedProduct
                          ? 'Товар удален'
                          : isSeller
                              ? 'Недоступно продавцу'
                              : product.amount > 0
                                  ? 'В корзину'
                                  : 'Нет в наличии'}
                    </Button>
                )}
              </Stack>

              <Box sx={{mt: 4}}>
                <Typography variant="h6" gutterBottom>
                  О товаре
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {product.description}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{mt: 8}}>
          <Stack direction="row" justifyContent="space-between" width="100%">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Отзывы
            </Typography>
            {(!checkingMyReview && isAuthorized && !isSeller) ? (
                <Box sx={{mb: 3}}>
                  {!myReview && !showReviewForm && (
                      <Button variant="contained" onClick={() => setShowReviewForm(true)}>
                        Оставить отзыв
                      </Button>
                  )}
                </Box>
            ) : null}
          </Stack>
          <Divider sx={{mb: 3}} />

          {checkingMyReview ? (
              <CircularProgress size={24} />
          ) : isAuthorized && !isSeller ? (
              <Box sx={{mb: 3}}>
                {myReview && !showReviewForm && (
                    <Paper elevation={4} sx={{p: 3, outline: '1px solid', outlineColor: 'primary.main'}}>
                      <Stack spacing={1}>
                        <Typography fontWeight="bold" variant="caption" sx={{fontSize: 16, color: 'primary.main', fontWeight: 600}}>
                          Ваш отзыв (от {formatReviewDate(myReview.date)})
                        </Typography>

                        <Rating value={myReview.mark} readOnly />

                        <Typography>
                          {myReview.content}
                        </Typography>

                        <Stack direction="row" spacing={2}>
                          <Button variant="outlined" onClick={handleEditReview}>
                            Редактировать
                          </Button>

                          <Button variant="outlined" color="error" onClick={handleDeleteReview}>
                            Удалить
                          </Button>
                        </Stack>
                      </Stack>
                    </Paper>
                )}

                {showReviewForm && (
                    <Paper sx={{p: 3}}>
                      <Stack spacing={2}>
                        <Typography variant="h6">
                          {myReview ? "Редактировать отзыв" : "Новый отзыв"}
                        </Typography>

                        <Rating value={reviewRating} onChange={(e, newValue) => setReviewRating(newValue)} />

                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            style={{width: '100%', minHeight: 100, fontSize: 16}}
                        />

                        <Stack direction="row" spacing={2}>
                          <Button variant="contained" onClick={handleSubmitReview} disabled={!reviewText || submittingReview}>
                            {myReview ? "Сохранить" : "Отправить"}
                          </Button>

                          <Button onClick={() => setShowReviewForm(false)}>
                            Отмена
                          </Button>
                        </Stack>
                      </Stack>
                    </Paper>
                )}
              </Box>
          ) : null}

          {reviewsLoading ? (
              <Box sx={{display: 'flex', justifyContent: 'center', py: 4}}>
                <CircularProgress />
              </Box>
          ) : reviewsError ? (
              <Alert severity="warning">
                {reviewsError}
              </Alert>
          ) : reviews.length === 0 ? (
              <Typography variant="body1" color="text.secondary">
                Пока отзывов нет
              </Typography>
          ) : (
              <Stack spacing={2}>
                {reviews.map((review) => (
                    <Paper key={review.id} elevation={1} sx={{p: 3}}>
                      <Stack
                          direction={{xs: 'column', sm: 'row'}}
                          justifyContent="space-between"
                          alignItems={{xs: 'flex-start', sm: 'center'}}
                          spacing={1}
                          sx={{mb: 1}}
                      >
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {review.authorName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatReviewDate(review.date)}
                          </Typography>
                        </Box>

                        <Rating value={review.mark} readOnly />
                      </Stack>

                      <Typography variant="body1">
                        {review.content}
                      </Typography>
                    </Paper>
                ))}
              </Stack>
          )}
        </Box>
      </Container>
  );
};

export default ProductPage;
