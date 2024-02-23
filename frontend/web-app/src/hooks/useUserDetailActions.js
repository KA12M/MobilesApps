import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "./api/agent";
import { store } from "../utils/store"; 

export default class useUserDetailActions {
  userId = null;
  loading = false;
  user = null;
  hearings = [];

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.userId,
      (userId) => {
        if (userId) this.loadHearing(userId);
        else {
          this.hearings = [];
          this.user = null;
        }
      }
    );
  }
  setUserId = (id) => (this.userId = id);

  loadHearing = async (userId) => {
    this.loading = true;
    try {
      var response = await agent.hearing.list(userId);
      var user = await store.useUserActions.loadById(userId);
      runInAction(() => { 
        this.user = user;
        this.hearings = response; 
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };
}
