<template>
  <div class="product-details">
    <form @submit.prevent="saveChanges" class="mt-4">
      <div class="mb-3">
        <label for="name" class="form-label">Name:</label>
        <input
          v-model="product.name"
          type="text"
          class="form-control"
          id="name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Price:</label>
        <input
          v-model="product.price"
          type="number"
          class="form-control"
          id="price"
          required
        />
      </div>
      <div class="mb-3">
        <label for="stock" class="form-label">Stock:</label>
        <input
          v-model="product.stock"
          type="number"
          class="form-control"
          id="stock"
          required
        />
      </div>
      <div class="form-check mb-3">
        <input
          v-model="product.available"
          type="checkbox"
          class="form-check-input"
          id="available"
        />
        <label for="available" class="form-check-label">Available</label>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description:</label>
        <textarea
          v-model="product.description"
          class="form-control"
          id="description"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary" @click="onFormSubmit">
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import addProduct from "../composables/addProduct";
import { useLoginStore } from "../store";

const router = useRouter();
const loginStore = useLoginStore();
const product = ref({ sellerId: loginStore.userId });

const onFormSubmit = async () => {
  await addProduct(product.value);
  router.push("/seller-center");
};
</script>

<style lang="scss">
.product-details {
  max-width: 900px;
  margin: 0 auto;
}
</style>
