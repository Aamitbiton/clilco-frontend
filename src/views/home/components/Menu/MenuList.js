import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CallIcon from "@mui/icons-material/Call";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AppRoutes from "../../../../app/AppRoutes";
import CustomLink from "./CustomLink";
import ConditionalWrapper from "../../../../components/ConditionalWrapper";

function MenuList({ anchor, onClick, onKeyDown }) {
  return (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <List>
        <MenuListItem
          to={AppRoutes.ROOT}
          icon={<HomeIcon />}
          itemText={"בית"}
        />
        <MenuListItem
          to={AppRoutes.VIEW_USERS}
          icon={<PeopleIcon />}
          itemText={"צפה במשתמשים"}
        />
        <MenuListItem
          to={AppRoutes.CALLS}
          icon={<CallIcon />}
          itemText={"יומן שיחות"}
        />
        <MenuListItem
          to={AppRoutes.PROFILE}
          icon={<AccountBoxIcon />}
          itemText={"פרופיל אישי"}
        />
        <MenuListItem
          to={AppRoutes.SETTINGS}
          icon={<MoreHorizIcon />}
          itemText={"אפשרויות נוספות"}
        />
      </List>
    </Box>
  );
}

const MenuListItem = ({ onClick, itemText, icon, to, is_route = true }) => (
  <ConditionalWrapper
    condition={is_route}
    wrapper={(children) => <CustomLink to={to}>{children}</CustomLink>}
  >
    <ListItem button onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={itemText} />
    </ListItem>
    <Divider />
  </ConditionalWrapper>
);

export default MenuList;
