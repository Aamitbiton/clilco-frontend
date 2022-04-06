import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import "./style/index.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes";
import { Header } from "./app/header/header";
import CssBaseline from "@mui/material/CssBaseline";
import { RTL } from "./themes";
const suspenseMarkup = <p>loading...</p>;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RTL>
          <Suspense fallback={suspenseMarkup}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Suspense>
        </RTL>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
