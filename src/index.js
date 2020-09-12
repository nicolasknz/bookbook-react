import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

<<<<<<< HEAD
import "antd/dist/antd.css";
=======
import App from './App';
import store from './redux/store';

import 'semantic-ui-css/semantic.min.css'
import 'antd/dist/antd.css';
>>>>>>> feature/menu

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
