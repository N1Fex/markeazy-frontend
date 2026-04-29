import DiscountRoundedIcon from '@mui/icons-material/DiscountRounded';
import React from 'react';
import {Box, Typography} from "@mui/material";

const DiscountIcon = ({value, style, sx}) => {
  return (
      <Box style={{position: "relative", ...style, ...sx}}>
        <DiscountRoundedIcon fontSize={"small"} sx={{fill: "#C72C41"}}/>
        <Typography variant="body2" color="red" sx={{position: 'absolute', top: -2, left: 20}} style={{textShadow: "black 1px 1px 0.5px"}}>
          -{value}%
        </Typography>
      </Box>
  );
};

export default DiscountIcon;