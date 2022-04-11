import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthenticatedLayout } from "./authenticatedLayout/AuthenticatedLayout";
import { Login } from "../views/login/Login";
import React, { useEffect } from "react";
import { init_app } from "../store/app/appFunctions";
import { useSelector } from "react-redux";
import AppRoutes from "./AppRoutes";
import { RTL } from "../themes";
import ConditionalWrapper from "../components/ConditionalWrapper";
import SimpleSnackbar from "../components/snackBar/SnackBar";

function App() {
  const appState = useSelector((state) => state.app);
  const navigator = useNavigate();
  useEffect(() => init_app({ navigator }), []);
  return (
    <>
      {appState.app_ready && (
        <ConditionalWrapper
          condition={appState.lng === "he"}
          wrapper={(children) => <RTL>{children}</RTL>}
        >
          <Routes>
            <Route path={AppRoutes.LOGIN} element={<Login />} />
            <Route path="/*" element={<AuthenticatedLayout />} />
          </Routes>
        </ConditionalWrapper>
      )}
      <SimpleSnackbar />
    </>
  );
}

export default App;
