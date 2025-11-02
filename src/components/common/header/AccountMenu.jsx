import React from 'react';
import {ListItemIcon, Menu, MenuItem} from "@mui/material";
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {logout} from "../../utils/JwtUtils";
import {useNavigate} from "react-router-dom";

const AccountMenu = ({anchorEl, setAnchorEl}) => {

  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.currentTarget.id;
    if (id === "logout") {
      logout();
    } else {
      navigate("/" + id);
    }
    setAnchorEl(null);
  };
  return (
      <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          disableScrollLock
      >
        <MenuItem id="orders" onClick={handleClose}>
          <ListItemIcon>
            <ShoppingBasketIcon fontSize="small" />
          </ListItemIcon>
          Мои заказы
        </MenuItem>
        <MenuItem id="settings" onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Настройки
        </MenuItem>
        <MenuItem id="logout" onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Выйти
        </MenuItem>
      </Menu>
  );
}

export default AccountMenu;