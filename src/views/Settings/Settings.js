import React from "react";
import { Header } from "../home/components/header/header";
import CenterLayout from "../../components/CenterLayout";
import ConfirmItem from "./components/ConfirmItem";
import NoAccountsOutlinedIcon from "@mui/icons-material/NoAccountsOutlined";
import { remove_account } from "../../store/auth/authFunctions";
function Settings(props) {
  return (
    <>
      <Header />
      <CenterLayout>
        <ConfirmItem label={"מחיקת משתמש"} onOk={remove_account}>
          <NoAccountsOutlinedIcon fontSize={"inherit"} />
        </ConfirmItem>
      </CenterLayout>
    </>
  );
}

export default Settings;
