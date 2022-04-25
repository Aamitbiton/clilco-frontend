import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { signOut as StoreSignOut } from "../../../../store/auth/authFunctions";
import AppRoutes from "../../../../app/AppRoutes";
import CustomLink from "./CustomLink";
import { useNavigate } from "react-router-dom";

function MenuList({ anchor, onClick, onKeyDown }) {
  const signOut = async () => await StoreSignOut();
  const navigator = useNavigate();
  return (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <List>
        <CustomLink to={AppRoutes.ROOT}>
          <MenuListItem itemText={"בית"}>
            <HomeIcon />
          </MenuListItem>
        </CustomLink>
        <Divider />
        {/*todo: add this when the settings page ready...*/}
        {/*<CustomLink to={AppRoutes.SETTINGS}>*/}
        {/*  <MenuListItem itemText={"הגדרות"}>*/}
        {/*    <SettingsIcon />*/}
        {/*  </MenuListItem>*/}
        {/*</CustomLink>*/}
        {/*<Divider />*/}
        <CustomLink to={AppRoutes.PROFILE}>
          <MenuListItem itemText={"פרופיל אישי"}>
            <AccountBoxIcon />
          </MenuListItem>
        </CustomLink>
        <Divider />
        <CustomLink to={AppRoutes.CONTACT}>
          <MenuListItem itemText={"צור קשר"}>
            <ContactSupportIcon />
          </MenuListItem>
        </CustomLink>
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
