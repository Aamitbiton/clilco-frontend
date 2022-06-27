import React from "react";
import AppButton from "./Buttons/AppButton";
import { signOut } from "../store/auth/authFunctions";
import LogoutIcon from "@mui/icons-material/Logout";
function LogoutButton() {
  return (
    <LogoutIcon className={"pointer"} onClick={signOut}>
      logout
    </LogoutIcon>
  );
}

export default LogoutButton;
