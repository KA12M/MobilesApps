<script setup>
import { onMounted, ref } from "vue";

import UserTable from "./UserTable.vue";
import Header from "../../components/Header.vue";
import PaginationPage from "../../components/NavigationPage.vue";
import SearchComponent from "../../components/SearchComponent.vue";
import FormUser from "./FormUser.vue";

import { useUserActions } from "../../hooks/useUserActions";

const userStore = useUserActions();

const isShow = ref(!false);

onMounted(() => {
  userStore.loadUsers();
});

const handleOpenForm = () => {
  isShow.value = !isShow.value;
  console.log(isShow.value);
};
</script>

<template>
  <div class="user-container">
    <Header title="ข้อมูลผู้ใช้งาน" />

    <div class="tab-bar">
      <SearchComponent
        :value="userStore.predicate.get('search')"
        :onSearch="userStore.searchUsers"
        placeholder="ค้นหา รหัสประจำ ชื่อ นามสกุล หรือ เบอร์มือถือ"
      />
      <div class="btn-container">
        <button :onclick="handleOpenForm" type="button" class="btn">
          + เพิ่มผู้ใช้งาน
        </button>
      </div>
    </div>

    <UserTable />

    <PaginationPage
      v-if="userStore.pagination"
      :pagination="userStore.pagination"
      :updatePage="userStore.UpdateCurrentPage"
      :pagingList="userStore.pagingList"
    />
  </div>

  <FormUser
    :isShowModal="isShow"
    :showModal="handleOpenForm"
    :closeModal="() => (isShow = false)"
  />

  <FormUser />
</template>

<style scoped>
.user-container {
  @apply shadow-md min-h-screen p-2 bg-slate-200 md:mx-[5rem] xl:mx-[20rem];
}
.tab-bar {
  @apply gap-2 flex flex-col lg:md:flex-row;
}
.btn-container {
  @apply flex align-middle py-1;
}
.btn {
  @apply w-32 py-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800;
}
</style>
