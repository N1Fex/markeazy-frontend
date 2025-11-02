import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Stack, Typography} from "@mui/material";
import {getToUrl} from "../axios_config";
import NeedToBeLoggedIn from "../common/NeedToBeLoggedIn";

const ProductPage = () => {

  const {id} = useParams();
  const [info, setInfo] = useState({});
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  useEffect(() => {
    getToUrl(`/product/${id}`).then((res) => {
      console.log(res);
      setInfo(res.data);
    }).catch(err => {
      if (err.response.status === 401) {
        setError({isError: true, message: "Нужно авторизоваться, чтобы увидеть эту страницу!"});
      } else {
        setInfo({isError: true, message: "Непредвиденная ошибка"});
      }
      console.log(err);
    })
  }, [setInfo])

  return (
    <>
      {
        error.isError ?
          <NeedToBeLoggedIn />
            :
          <Stack direction="column"
                 sx={{height: 400, width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Typography variant="h4">{info.title}</Typography>
            <Typography variant="h4">{info.description}</Typography>
          </Stack>
      }
    </>
  );
};

export default ProductPage;