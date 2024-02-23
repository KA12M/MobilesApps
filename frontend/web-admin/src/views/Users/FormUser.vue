<script setup>
import { defineProps, ref } from "vue";
import { FwbModal, FwbInput } from "flowbite-vue";
import { Form, Field, ErrorMessage, useForm } from "vee-validate";

const { isShowModal, closeModal, showModal } = defineProps({
  showModal: Function,
  closeModal: Function,
  isShowModal: Boolean,
});

const initialValues = {
  fistName: "",
  lastName: "",
};

const handleSubmit = (values) => {
  console.log(values);
};
</script>

<template>
  <Form @submit="handleSubmit" v-slot="{ values }" class="flex flex-col">
    <fwb-modal v-if="isShowModal" @close="closeModal">
      <template #header>
        <div class="flex items-center text-lg">Form User</div>
      </template>

      <template #body>
        <div class="flex gap-2 mb-2">
          <div class="flex-1">
            <label class="form-label">First name</label>
            <Field
              name="fistName"
              type="text"
              :value="initialValues.fistName"
              placeholder="enter your first fistName"
              label="First name"
              class="text-input"
            />
          </div>
          <div class="flex-1">
            <label class="form-label">Last name</label>
            <Field
              name="lastName"
              type="text"
              :value="initialValues.lastName"
              class="text-input"
              label="Last name"
              placeholder="enter your first lastName"
            />
          </div>
        </div>

        <h1>{{ values }}</h1>
      </template>

      <template #footer>
        <div class="flex justify-between">
          <button class="btn-submit">submit</button>
        </div>
      </template>
    </fwb-modal>
  </Form>
</template>

<style scoped>
.form-label {
  @apply block mb-2 text-sm font-medium text-gray-900 dark:text-white;
}
.btn-submit {
  @apply focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800;
}
.text-input {
  @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
}
</style>
