import React from 'react';
import {IconButton, Stack, TextField} from "@mui/material";
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import "./CounterAmount.css";
import {changeProductAmountInCart} from "../CartManager";

const CounterAmount = ({id, value, setValue, handleSpinClick, sx}) => {
  return (
      <Stack direction="row" spacing={1} sx={sx} alignItems="center">

        <IconButton
            disabled={value===1}
            sx={{borderRadius: 2, bgcolor: "#E8E8E8"}}
            onClick={() => {
              const val = Math.max(+value-1, 1);
              setValue(val);
              handleSpinClick(id, "remove");
              changeProductAmountInCart(id, val);
            }}>
          <RemoveRoundedIcon />
        </IconButton>

        <TextField type="number" value={+value}
                   inputProps={{min: 0, style: { textAlign: 'center', height: "100%"}}}
                   onChange={(e) => setValue(+e.target.value)}
                   onBlur={() => changeProductAmountInCart(id, value)}
                   className={"no-spinners"}
                   style={{height: "100%", width: "auto"}}
                   size="small"/>

        <IconButton
            sx={{borderRadius: 2, bgcolor: "#E8E8E8"}}
            onClick={() => {
              setValue(+value+1);
              handleSpinClick(id, "add");
              changeProductAmountInCart(id, +value+1);
            }}>
          <AddRoundedIcon />
        </IconButton>

      </Stack>
  );
};

export default CounterAmount;