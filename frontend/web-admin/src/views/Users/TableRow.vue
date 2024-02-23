<script setup>
import { defineProps } from "vue";
import { formatISODateToThaiDate } from "../../utils/dateFormat"; 
const { user } = defineProps({
  user: Object,
});
</script>

<template>
  <tr class="row-item">
    <td class="px-6 py-4 gap-1 flex">
      <a href="#" class="btn-edit">แก้ไข</a> |
      <a href="#" class="btn-delete">ลบ</a>
    </td>
    <td class="px-6 py-4">{{ user.id }}</td>
    <th scope="row" class="t-head">
      <router-link :to="'/user/' + user.id">
        {{ user.firstName }} {{ user.lastName }}
      </router-link>
    </th>
    <td class="px-6 py-4">{{ user.phone }}</td>
    <td class="px-6 py-4">
      {{ formatISODateToThaiDate(user.birthday) }}
    </td>
    <td class="px-6 py-4">{{ user.age }}</td>
    <td class="px-6 py-4">{{ user.note }}</td>
  </tr>
</template>

<style scoped>
.t-head {
  @apply px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white;
}
.t-head:hover {
  @apply underline text-blue-600;
}

.btn-edit {
  @apply font-medium text-blue-600 dark:text-blue-500 hover:underline;
}

.btn-delete {
  @apply font-medium text-red-600 dark:text-red-500 hover:underline;
}
</style>
