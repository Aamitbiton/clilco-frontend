import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./wdyr";
import { Provider } from "react-redux";
import { store } from "./store";
import "./style/index.scss";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes";
import CssBaseline from "@mui/material/CssBaseline";
const suspenseMarkup = <p>loading...</p>;

ReactDOM.render(
  <>
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
  </>,
  document.getElementById("root")
);

reportWebVitals();
