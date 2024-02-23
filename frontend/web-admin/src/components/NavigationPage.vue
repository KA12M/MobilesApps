<script setup>
import { defineProps } from "vue";

const { pagination, updatePage } = defineProps({
  pagination: Object,
  updatePage: Function,
  pagingList: Array,
});
</script>

<template>
  <nav class="nav-container">
    <!-- page label -->
    <span v-if="pagination" class="page-label">
      หน้าที่ {{ pagination.currentPage }} จาก
      {{ pagination.totalPages }} (ทั้งหมด {{ pagination.totalItems }} ข้อมูล)
    </span>

    <!-- paging -->
    <ul class="paging">
      <li>
        <button
          :onclick="() => updatePage(pagination.currentPage - 1)"
          class="btn-back"
        >
          กลับ
        </button>
      </li>
      <li v-if="pagination" v-for="(item, index) in pagingList" :key="index">
        <button
          :onclick="() => updatePage(item)"
          :class="
            item == pagination.currentPage ? 'click-item-active' : 'click-item'
          "
        >
          {{ item }}
        </button>
      </li>
      <li>
        <button
          :onclick="() => updatePage(pagination.currentPage + 1)"
          class="btn-next"
        >
          ต่อไป
        </button>
      </li>
    </ul>

    <!-- more -->
    <div></div>
  </nav>
</template>

<style scoped>
.nav-container {
  @apply py-4 flex justify-between;
}
.paging {
  @apply flex items-center -space-x-px h-8 text-sm;
}
.btn-back {
  @apply flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white;
}
.btn-next {
  @apply flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white;
}
.click-item {
  @apply flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white;
}
.click-item-active {
  @apply z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-500 border border-blue-300 bg-blue-200 hover:bg-blue-300 hover:text-blue-800 dark:border-gray-700 dark:bg-gray-700 dark:text-white;
}
</style>
