import React from "react";
import { ToastAndroid } from "react-native";

const MyToast = (name) => {
  ToastAndroid.showWithGravity(name, ToastAndroid.SHORT, ToastAndroid.CENTER);
};

export default MyToast;
