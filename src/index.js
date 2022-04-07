import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import "./style/index.scss";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes";
import { Header } from "./views/home/components/header/header";
import CssBaseline from "@mui/material/CssBaseline";
const suspenseMarkup = <p>loading...</p>;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={suspenseMarkup}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Suspense>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
