<script setup>
import { useUserActions } from "../../hooks/useUserActions";
import EmptyPage from "../../components/EmptyPage.vue";
import TableRow from "./TableRow.vue";

const userStore = useUserActions();

const columns = [
  "จัดการ",
  "รหัส",
  "ชื่อ - นามสกุล",
  "เบอร์มือถือ",
  "วันเกิด",
  "อายุ",
  "หมายเหตุ",
];
</script>

<template>
  <div class="container">
    <table class="table">
      <thead class="t-head">
        <tr>
          <th v-for="text in columns" scope="col" class="px-6 py-3">
            {{ text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <TableRow v-for="user in userStore.users" :user="user" />
        
        <EmptyPage v-if="userStore.users.length == 0" />
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container {
  @apply w-full rounded-md relative overflow-x-auto shadow-md sm:rounded-lg;
}

.table {
  @apply w-full text-sm text-left text-gray-500 dark:text-gray-400;
}

.t-head {
  @apply text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400;
}

.row-item {
  @apply bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600;
}
</style>
