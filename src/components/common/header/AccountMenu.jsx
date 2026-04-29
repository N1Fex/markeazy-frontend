import React from 'react';
import {ListItemIcon, Menu, MenuItem} from "@mui/material";
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {logout, useAuthState} from "../../utils/JwtUtils";
import {useNavigate} from "react-router-dom";

const AccountMenu = ({anchorEl, setAnchorEl}) => {
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const {isSeller} = useAuthState();

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (id) => (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (id === "logout") {
      logout();
    } else {
      navigate("/" + id);
    }

    closeMenu();
  };

  return (
      <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={closeMenu}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          }}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'center', vertical: 'top' }}
          disableScrollLock
      >
        {!isSeller ? (
            <MenuItem id="orders" onClick={handleMenuAction("orders")}>
              <ListItemIcon>
                <ShoppingBasketIcon fontSize="small" />
              </ListItemIcon>
              Мои заказы
            </MenuItem>
        ) : null}
        <MenuItem id="settings" onClick={handleMenuAction("settings")}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Настройки
        </MenuItem>
        <MenuItem id="logout" onClick={handleMenuAction("logout")}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Выйти
        </MenuItem>
      </Menu>
  );
};

export default AccountMenu;
