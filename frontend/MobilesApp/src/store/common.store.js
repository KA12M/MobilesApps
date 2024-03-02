import { makeAutoObservable, runInAction } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

import API from "./api/agent";
import { HttpStatusCode } from "axios";

export default class CommonStore {
  loading = false;
  dataResponse = null;
  user = null;
  diabete = [];

  constructor() {
    makeAutoObservable(this);
  }

  setLoading = (state) => (this.loading = state);

  getDiabete = async (userId) => {
    this.setLoading(true);
    try {
      var res = await API.diabete.hearingWithDiabeteList(userId);
      runInAction(() => {
        this.diabete = res?.diabetes?.value;
      });
      this.setLoading(false);
    } catch (error) {
      this.setLoading(false);
      throw error;
    }
  };

  handleCalculate = async (img) => {
    this.loading = true;
    try {
      const res = await API.imgCalDiabetes(img);
      return runInAction(() => {
        console.log(res);
        this.dataResponse = res;
        return res;
      });
    } catch (err) {
      throw err;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  clearResponse = () => (this.dataResponse = null);

  initialUser = async () => {
    try {
      var json = await AsyncStorage.getItem("user");
      if (json) this.user = JSON.parse(json);
      else return false;
    } catch (error) {
      throw error;
    }
  };

  loginByPhone = async (data, navigation, toast) => {
    this.loading = true;
    try {
      var response = await API.user.loginByPhone(data);
      console.log("response login", response.statusCode);
      console.log("HttpStatusCode.NotFound", HttpStatusCode.NotFound);
      if (response?.statusCode === HttpStatusCode.NotFound) {
        toast();
      } else {
        runInAction(async () => {
          var user = {
            id: response.id,
            firstName: response.firstName,
            lastName: response.lastName,
            phone: response.phone,
          };
          console.log("user login", user);
          await AsyncStorage.setItem("user", JSON.stringify(user));
          this.user = user;
        }).then(() => {
          navigation.replace("home");
        });
      }
    } catch (error) {
      throw error;
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  newByName = async (data) => {
    this.loading = true;
    try {
      var response = await API.user.newByName(data);
      runInAction(async () => {
        var user = {
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          phone: response.phone,
        };
        await AsyncStorage.setItem("user", JSON.stringify(user));
        this.user = user;
      });
    } catch (error) {
      throw error;
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  register = async (data) => {
    this.loading = true;
    try {
      var response = await API.user.register(data);
      console.log("response register", response);
      runInAction(async () => {
        console.log("response register runInAction", response);
        var user = {
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          phone: response.phone,
          birthday: response.birthday,
        };
        console.log("user register", user);
        await AsyncStorage.setItem("user", JSON.stringify(user));
        this.user = user;
      });
    } catch (error) {
      throw error;
    } finally {
      runInAction(() => (this.loading = false));
    }
  };
}
