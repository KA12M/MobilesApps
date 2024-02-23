import { makeAutoObservable, runInAction } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

import API from "./api/agent";

export default class CommonStore {
  loading = false;
  dataResponse = null;
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

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
}
