import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { signOut as StoreSignOut } from "../../../../store/auth/authFunctions";
function MenuList({ anchor, onClick, onKeyDown }) {
  const signOut = async () => await StoreSignOut();

  return (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <List>
        <MenuListItem onClick={signOut} itemText={"התנתק"}>
          <LogoutIcon />
        </MenuListItem>
      </List>
      <Divider />
    </Box>
  );
}

const MenuListItem = ({ onClick, itemText, children: icon }) => (
  <ListItem button onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={itemText} />
  </ListItem>
);

export default MenuList;
