import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "react-datepicker/dist/react-datepicker.css";

import { StoreContext, store } from "./utils/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);
