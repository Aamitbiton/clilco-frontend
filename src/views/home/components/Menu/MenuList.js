import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
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
        <MenuListItem itemText={"הגדרות"} onClick={() => alert("הגדרות")}>
          <SettingsIcon />
        </MenuListItem>
        <Divider />{" "}
        <MenuListItem itemText={"פרופיל אישי"} onClick={() => alert("profile")}>
          <AccountBoxIcon />
        </MenuListItem>
        <Divider />
        <MenuListItem itemText={"צור קשר"} onClick={() => alert("contact")}>
          <ContactSupportIcon />
        </MenuListItem>
        <Divider />
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
