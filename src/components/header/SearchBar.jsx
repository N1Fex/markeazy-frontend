import React from 'react';
import {Container, FormControl, IconButton, InputAdornment, TextField} from "@mui/material";
import {
  Cancel,
  CancelOutlined,
  CancelPresentationOutlined,
  CancelRounded,
  CancelSharp, CancelTwoTone, Clear,
  SearchOutlined
} from '@mui/icons-material';

const SearchBar = ({sx, style}) => {

  const [text, setText] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit", text);
  }

  return (
    <FormControl onSubmit={handleSubmit}
                 sx={{ display: 'flex', justifyContent:"center", width: {md: "40%", sm: "60%", xs: "85%"},
                   minWidth: {md: 400, sm: 300}, marginX: 0.5, ...sx}}
                 style={{...style}}>

      <TextField
        id="search-bar"
        label="Поиск"
        variant="filled"
        placeholder="Искать..."
        size="small"
        fullWidth
        InputProps={{
          disableUnderline: true,
          endAdornment: (
              <InputAdornment position="end">
                {text !== "" ? <Clear sx={{marginRight: 1, ":hover": {cursor: "pointer"}}}
                       onClick={() => setText("")}/> : ""}
                <SearchOutlined onClick={handleSubmit} sx={{":hover": {cursor: "pointer"}}}/>
              </InputAdornment>
          ),
          style: {
            borderRadius: "10px",
          }
        }}
        onChange={(e) => setText(e.target.value)}
        value={text}
      />

    </FormControl>
  );
};

export default SearchBar;