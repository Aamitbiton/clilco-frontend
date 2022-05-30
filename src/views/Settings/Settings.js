import React from "react";
import { Header } from "../home/components/header/header";
import CenterLayout from "../../components/CenterLayout";
import ConfirmItem from "./components/ConfirmItem";
import NoAccountsOutlinedIcon from "@mui/icons-material/NoAccountsOutlined";
import { remove_account, signOut } from "../../store/auth/authFunctions";
import LogoutIcon from "@mui/icons-material/Logout";
import Settings_Item from "./components/Settings_Item";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import AppStack from "../../components/AppStack";
import AppRoutes from "../../app/AppRoutes";
import { useNavigate } from "react-router-dom";
function Settings(props) {
  const navigator = useNavigate();
  const route_to = (route) => navigator(route);
  return (
    <>
      <Header />
      <CenterLayout>
        <AppStack direction={"column"}>
          <Settings_Item
            label={"התנתק"}
            onClick={signOut}
            icon={<LogoutIcon fontSize={"inherit"} />}
          />
          <Settings_Item
            label={"צור קשר"}
            onClick={() => route_to(AppRoutes.CONTACT)}
            icon={<ContactSupportIcon fontSize={"inherit"} />}
          />
          <ConfirmItem
            icon={<NoAccountsOutlinedIcon fontSize={"large"} />}
            label={"מחיקת משתמש"}
            onOk={remove_account}
          />
        </AppStack>
      </CenterLayout>
    </>
  );
}

export default Settings;
