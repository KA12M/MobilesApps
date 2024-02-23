import { makeAutoObservable, runInAction } from "mobx";

import agent from "./api/agent";

export default class useUserActions {
  predicate = new Map();
  pagination = null;
  pagingParams = {
    currentPage: 1,
    pageSize: 10,
  };
  isLoading = false;
  data = [];

  constructor() {
    makeAutoObservable(this);
  }

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("currentPage", this.pagingParams.currentPage);
    params.append("pageSize", this.pagingParams.pageSize);
    this.predicate.forEach((value, key) => params.append(key, value));
    return params;
  }
  setPagination = (pagination) => (this.pagination = pagination);
  setPredicate = (obj) =>
    Object.entries(obj).map(([key, val]) => this.predicate.set(key, val));
  setPagingParams = (page, pageSize) => {
    this.pagingParams = { currentPage: page, pageSize };
    this.setPagination({
      ...this.pagination,
      currentPage: page,
    });
  };

  loadUsers = async () => {
    this.isLoading = true;
    try {
      var res = await agent.user.list(this.axiosParams);
      runInAction(() => {
        this.data = res.data;
        this.setPagination(res.pagination);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  };

  loadById = async (userId) => {
    this.isLoading = true;
    try {
      var response = await agent.user.one(userId);
      return runInAction(() => response);
    } catch (error) {
      throw error;
    } finally {
      this.isLoading = false;
    }
  };

  createUser = async (data) => {
    this.isLoading = true;
    try {
      var res = await agent.user.newUser(data);
      runInAction(() => this.loadUsers());
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  };
}
