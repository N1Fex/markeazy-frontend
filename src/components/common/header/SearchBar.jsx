import React from 'react';
import {FormControl, InputAdornment, TextField} from "@mui/material";
import {Clear, SearchOutlined} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";

const SearchBar = ({sx, style}) => {

  const [text, setText] = React.useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${text}`, {});
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?query=${text}`, {});
    }
  }

  return (
    <FormControl onSubmit={handleSubmit} onKeyDown={handleKeyPress}
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