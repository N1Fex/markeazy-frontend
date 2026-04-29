import React from 'react';
import {Stack, Typography} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import {useNavigate} from "react-router-dom";

const SellerLegend = ({
  seller,
  hideName = false,
  iconSize = 16,
  iconColor = "#112582",
  clickable = true,
  sx = {},
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (clickable) {
      navigate(`/seller/${seller.id}`);
    }
  };

  return (
      <Stack
          direction="row"
          alignItems="center"
          spacing={hideName ? 0 : 0.5}
          sx={{cursor: clickable ? "pointer" : "default", ...sx}}
          onClick={handleClick}
      >
        <StoreIcon sx={{fill: iconColor, fontSize: iconSize}}/>
        {!hideName ? (
            <Typography
                variant="body2"
                sx={{
                  color: 'text.primary',
                  textOverflow: 'ellipsis',
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
            >
              {seller.name}
            </Typography>
        ) : null}
      </Stack>
  );
};

export default SellerLegend;
