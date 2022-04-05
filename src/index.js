import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {store} from "./store";
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import {theme} from './themes'
import {Header} from "./app/header/header";
const suspenseMarkup = ( <p>loading...</p> )

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <ThemeProvider theme={theme}>
              <Suspense fallback={suspenseMarkup}>
                  <BrowserRouter>
                      <Header/>
                      <App />
                  </BrowserRouter>
              </Suspense>

          </ThemeProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
