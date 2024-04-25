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
import AssessmentformList from "../app/UserDetail/AssessmentformList";

export const Routes = (
  <Route path={RoutePath.home} element={<App />}>
    <Route path="*" element={<div>Page Not Found </div>} />
    <Route path={RoutePath.userPage} element={<UserPage />} />
    <Route path={RoutePath.eyesCreate} element={<EyesCreate />} />
    <Route path={RoutePath.earSelect} element={<EarSelect />} />
    <Route path={RoutePath.check250Hz} element={<Check250Hz />} />
    <Route path={RoutePath.check500Hz} element={<Check500Hz />} />
    <Route path={RoutePath.check1000Hz} element={<Check1000Hz />} />
    <Route path={RoutePath.check2000Hz} element={<Check2000Hz />} />
    <Route path={RoutePath.check4000Hz} element={<Check4000Hz />} />
    <Route path={RoutePath.check6000Hz} element={<Check6000Hz />} />
    <Route path={RoutePath.check8000Hz} element={<Check8000Hz />} />
    <Route path={RoutePath.pauseCheck} element={<PauseCheck />} />
    <Route path={RoutePath.hearringCreate} element={<HearringCreate />} />
    <Route path={RoutePath.assessmentform} element={<Assessmentform />} />
    <Route
      path={RoutePath.assessmentformList}
      element={<AssessmentformList />}
    />
    <Route path={RoutePath.home} element={<Login />} />
    <Route path={RoutePath.userDetailPath} element={<UserDetailPage />} />
  </Route>
);

export const router = createBrowserRouter(createRoutesFromElements(Routes));
