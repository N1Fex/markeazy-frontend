import React from 'react';
import {Card, Skeleton, Stack, Typography} from "@mui/material";
import SellerLegend from "../../common/SellerLegend";
import {useNavigate} from "react-router-dom";

const OrderProductInfo = ({key, id, image, title, seller, amount, price}) => {

  const navigate = useNavigate();

  const handleClickToProduct = () => {
    navigate("/product/" + id);
  }

  return (
      <Card key={key} sx={{paddingRight: 1}}>
        <Stack direction="row" spacing={2} alignItems="center">

          <Skeleton height={160} width={130} variant="rounded"
                    sx={{cursor: 'pointer'}}
                    onClick={handleClickToProduct}/>

          <Stack direction="column" spacing={2} justifyContent="space-between"
                 sx={{ flexGrow: 4, flexShrink: 1, flexBasis: 0, alignSelf: "stretch", paddingY: 1}}>
            <Typography variant="h6" sx={{flexGrow: 1, cursor: "pointer"}}
                        onClick={handleClickToProduct}>
              {title}
            </Typography>
            <SellerLegend seller={seller} />
          </Stack>

          <Typography variant="h6" align="center" sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 0}}>
            {price} &#8381;
          </Typography>
          <Typography align="center" sx={{flexGrow: 0.5, flexShrink: 1, flexBasis: 0}}>
            &#215;{amount}
          </Typography>
          <Typography variant="h5" align="center" sx={{ flexGrow: 0.5, flexShrink: 1, flexBasis: 0}}>
            =
          </Typography>
          <Typography variant="h6" fontWeight={600} color={"#287233"} sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 0}}>
            {amount*price} &#8381;
          </Typography>
        </Stack>
      </Card>
  );
};

export default OrderProductInfo;