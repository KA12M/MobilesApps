import { ref } from "vue";
import { defineStore } from "pinia";
import agent from "./api/agent";
import { axiosParams } from "./../utils/axiosParams";
import { generatePagination } from "./../utils/generatePaging";

export const useUserActions = defineStore("userStore", () => {
  // state
  const predicate = ref(new Map().set("search", ""));
  const isLoading = ref(false);
  const pagingParams = ref({
    currentPage: 1,
    pageSize: 10,
  });
  const pagination = ref(null);
  const pagingList = ref([]);

  // data state
  const users = ref([]);

  // actions
  async function loadUsers() {
    try {
      const response = await agent.user.list(
        axiosParams(pagingParams.value, predicate.value)
      );
      users.value = response.data;
      pagination.value = response.pagination;
      pagingList.value = generatePagination(
        response.pagination.currentPage,
        response.pagination.totalPages
      );
    } catch (error) {
      console.log(error);
    }
  }
  async function UpdateCurrentPage(currentPage) {
    let canUpdate =
      currentPage <= pagination.value.totalPages && currentPage != 0;

    if (canUpdate) {
      pagingParams.value.currentPage = currentPage;
      loadUsers();
    }
  }
  async function searchUsers(text) {
    pagingParams.value.currentPage = 1;
    predicate.value.set("search", text);
    loadUsers();
  }

  return {
    users,
    loadUsers,
    predicate,
    isLoading,
    pagination,
    pagingParams,
    pagingList,
    UpdateCurrentPage,
    searchUsers,
  };
});
