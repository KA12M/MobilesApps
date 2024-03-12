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
import EyesCreate from "../app/UserDetail/EyesCreate";
import HearringCreate from "../app/UserDetail/HearringCreate";
import Check1000Hz from "../app/HearingCheck/Check1000Hz";
import Check2000Hz from "../app/HearingCheck/Check2000Hz";
import Check4000Hz from "../app/HearingCheck/Check4000Hz";
import Check6000Hz from "../app/HearingCheck/Check6000Hz";
import EarSelect from "../app/UserDetail/EarSelect";
import Check250Hz from "../app/HearingCheck/Check250Hz";
import Check500Hz from "../app/HearingCheck/Check500Hz";
import Check8000Hz from "../app/HearingCheck/Check8000Hz";
import PauseCheck from "../app/HearingCheck/PauseCheck";
import Assessmentform from "../app/AssessmentForm/Assessmentform";
import Login from "../app/Authen/Login";

export const Routes = (
  <Route path={RoutePath.home} element={<App />}>
    <Route path="*" element={<div>Page Not Found </div>} />

    <Route path="/" element={<UserPage />} />
    <Route path="/EyesCreate" element={<EyesCreate />} />
    <Route path="/EarSelect" element={<EarSelect />} />

    <Route path="/Check250Hz" element={<Check250Hz />} />
    <Route path="/Check500Hz" element={<Check500Hz />} />
    <Route path="/Check1000Hz" element={<Check1000Hz />} />
    <Route path="/Check2000Hz" element={<Check2000Hz />} />
    <Route path="/Check4000Hz" element={<Check4000Hz />} />
    <Route path="/Check6000Hz" element={<Check6000Hz />} />
    <Route path="/Check8000Hz" element={<Check8000Hz />} />
    <Route path="/PauseCheck" element={<PauseCheck />} />
    <Route path="/HearringCreate" element={<HearringCreate />} />

    <Route path="/Assessmentform" element={<Assessmentform />} />

    <Route path="/Login" element={<Login />} />


    <Route path="/user/:userId" element={<UserDetailPage />} />
  </Route>
);

export const router = createBrowserRouter(createRoutesFromElements(Routes));
