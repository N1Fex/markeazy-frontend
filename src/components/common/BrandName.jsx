import React from 'react';
import {Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const BrandName = ({fontSize, fontColor, sx, style}) => {
  return (
    <NavLink to={"/"} style={{textDecoration: "none", ...style}}>
      <Typography fontFamily="Gaoel" fontSize={fontSize} color={fontColor} sx={{...sx}}>MARKEAZY</Typography>
    </NavLink>
  );
};

export default BrandName;