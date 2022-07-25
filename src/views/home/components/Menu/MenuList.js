import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import CallIcon from "@mui/icons-material/Call";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AppRoutes from "../../../../app/AppRoutes";
import CustomLink from "./CustomLink";
import ConditionalWrapper from "../../../../components/ConditionalWrapper";
import AccordionItem from "./AccordionItem";
import { remove_account, signOut } from "../../../../store/auth/authFunctions";
import ConfirmItem from "../../../Settings/components/ConfirmItem";
import NoAccountsOutlinedIcon from "@mui/icons-material/NoAccountsOutlined";
import ConfirmModal from "../../../../components/ConfirmModal/ConfirmModal";
import { useSelector } from "react-redux";
import CallsBadge from "../../../callsHistory/components/CallsBadge";

function MenuList({ anchor, onClick, onKeyDown }) {
  const videoState = useSelector((state) => state.video);

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
        {videoState.speed_date_time.its_dating_time && (
          <MenuListItem
            to={AppRoutes.VIEW_USERS}
            icon={<PeopleIcon />}
            itemText={"צפה במשתמשים"}
          />
        )}
        <MenuListItem
          to={AppRoutes.CALLS}
          icon={<CallIcon />}
          itemText={"יומן שיחות"}
        >
          <CallsBadge style={{ position: "absolute", top: "30%" }} />
        </MenuListItem>
        <MenuListItem
          to={AppRoutes.PROFILE}
          icon={<AccountBoxIcon />}
          itemText={"פרופיל אישי"}
        />
        <AccordionItem icon={<MoreHorizIcon />}>
          <MenuListItem
            icon={<ContactSupportIcon />}
            itemText={"צור קשר"}
            to={AppRoutes.CONTACT}
          />
          <MenuListItem
            icon={<LogoutIcon />}
            is_route={false}
            itemText={"התנתק"}
            onClick={signOut}
          />
          <MenuConfirmItem
            icon={<NoAccountsOutlinedIcon />}
            itemText={"מחיקת משתמש"}
            onOk={remove_account}
          />
        </AccordionItem>
      </List>
    </Box>
  );
}

export const MenuListItem = ({
  onClick,
  itemText,
  icon,
  to,
  children,
  is_route = true,
}) => (
  <ConditionalWrapper
    condition={is_route}
    wrapper={(children) => <CustomLink to={to}>{children}</CustomLink>}
  >
    <ListItem button onClick={onClick}>
      {children}
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={itemText} />
    </ListItem>
    <Divider />
  </ConditionalWrapper>
);

const MenuConfirmItem = ({
  onOk = () => {},
  onReject = () => {},
  itemText,
  icon,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <ConfirmModal
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(false)}
        onOk={onOk}
        onReject={() => {
          setModalVisible(false);
          onReject();
        }}
        target={itemText}
      />
      <MenuListItem
        icon={icon}
        itemText={itemText}
        is_route={false}
        onClick={() => setModalVisible(true)}
      />
    </>
  );
};

export default MenuList;
