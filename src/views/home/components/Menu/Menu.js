import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import "./Menu.scss";
import AppIconButton from "../../../../components/Buttons/AppIconButton";
import MenuList from "./MenuList";
import "./Menu.scss";
import CallsBadge from "../../../callsHistory/components/CallsBadge";
export default function Menu() {
  const DrawerDirection = "right";
  const [state, setState] = React.useState({
    [DrawerDirection]: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      <AppIconButton
        className={"drawer-button"}
        size={"large"}
        onClick={toggleDrawer(DrawerDirection, true)}
      >
        <MenuIcon />
      </AppIconButton>
      <SwipeableDrawer
        anchor={DrawerDirection}
        open={state[DrawerDirection]}
        onClose={toggleDrawer(DrawerDirection, false)}
        onOpen={toggleDrawer(DrawerDirection, true)}
      >
        {
          <>
            <MenuList
              // onClick={toggleDrawer(DrawerDirection, false)}
              onKeyDown={toggleDrawer(DrawerDirection, false)}
            />
            <img
              className={"menu-logo"}
              style={{ zIndex: -1 }}
              height={"30%"}
              src={require("../../../../assets/clilco_logo.png")}
            />
          </>
        }
      </SwipeableDrawer>
    </div>
  );
}
