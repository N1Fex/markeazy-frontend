import React from 'react';
import {Stack, Typography} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import {useNavigate} from "react-router-dom";

const SellerLegend = ({seller}) => {
  const navigate = useNavigate();
  return (
      <Stack direction="row" alignItems="center" spacing={0.5} sx={{cursor: "pointer"}}
             onClick={() => navigate(`/seller/${seller.id}`)}>
          <StoreIcon sx={{fill: "#112582", fontSize: 16}}/>
          <Typography variant="body2" sx={{ color: 'text.primary',
            textOverflow: 'ellipsis', whiteSpace: "nowrap", overflow: "hidden" }}>
            {seller.name}
          </Typography>
        </Stack>
  );
};

export default SellerLegend;