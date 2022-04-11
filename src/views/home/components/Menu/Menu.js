import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import "./Menu.scss";
import AppIconButton from "../../../../components/Buttons/AppIconButton";
import MenuList from "./MenuList";
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
          <MenuList
            onClick={toggleDrawer(DrawerDirection, false)}
            onKeyDown={toggleDrawer(DrawerDirection, false)}
          />
        }
      </SwipeableDrawer>
    </div>
  );
}
