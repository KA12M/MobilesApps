import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "../app/App";
import { RoutePath } from "../utils/RoutePath";
import UserPage from "./../app/UserManage/UserPage";
import UserDetailPage from "../app/UserDetail/UserDetailPage";

export const Routes = (
  <Route path={RoutePath.home} element={<App />}>
    <Route path="*" element={<div>Page Not Found </div>} />

    <Route path="" element={<UserPage />} />
    <Route path="/user/:userId" element={<UserDetailPage />} />
  </Route>
);

export const router = createBrowserRouter(createRoutesFromElements(Routes));
