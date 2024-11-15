import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store.js";
import { Provider } from "react-redux";

import "./assets/css/vendors.css";
import "./assets/css/style.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css";

// 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
