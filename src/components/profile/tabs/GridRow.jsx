import React from "react";
import {Grid, TextField, Typography} from "@mui/material";

const GridRow = ({id, label, value, editable, editing, type = "text"}) => {

  const [inputValue, setInputValue] = React.useState(value);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  return (
      <>
        <Grid size={6}>
          <Typography>{label}</Typography>
        </Grid>
        <Grid size={10}>{
          editing && editable ? <TextField id={id} value={inputValue} onChange={handleChange} size="small" type={type}></TextField>
              : <Typography>{inputValue}</Typography>
        }
        </Grid>
      </>
  )
}

export default GridRow;