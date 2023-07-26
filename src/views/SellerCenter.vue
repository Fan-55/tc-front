<template>
  <div class="seller-center">
    <h1>Seller Center</h1>
    <router-link :to="{ name: 'AddProduct' }">
      <button type="button" class="btn btn-primary mb-1">
        Add New Product
      </button>
    </router-link>
    <div v-if="products.length === 0" class="empty-listing-message">
      Your listing is empty.
    </div>
    <div v-else>
      <div v-for="(product, index) in products" :key="index" class="cart-item">
        <div class="item-image">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="item-info">
          <span class="item-name">{{ product.name }}</span>
          <span class="item-description">{{
            product.description?.slice(0, 50) + "..."
          }}</span>
          <span class="item-price">${{ product.price }}</span>
        </div>
        <div class="item-quantity">
          <span class="quantity">stock: {{ product.stock }}</span>
        </div>
        <router-link
          :to="{ name: 'ProductDetails', params: { id: product.id } }"
        >
          <button class="edit-button">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </router-link>
        <button class="available-button" v-if="product.available">
          <i class="fa-solid fa-circle-check"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import "@fortawesome/fontawesome-free/css/all.css";

import getDataServices from "../DataServices/DataServices";
import router from "../router";
import { useLoginStore } from "../store";

const dataServices = getDataServices();
const products = ref([]);

onMounted(async () => {
  const loginStore = useLoginStore();
  const browsedProducts = await dataServices.getProducts({ userId: loginStore.userId });
  products.value = browsedProducts;
});
</script>

<style lang="scss">
$primary-color: black;
$error-color: #ff4d4f;
$success-color: #52c41a;
$gray-color: #999;

/* Main container */
.seller-center {
  padding: 20px;
}

/* Cart item container */
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border: 1px solid #f1f1f1;
  border-radius: 10px;
  padding: 15px;
}

/* Item image */
.item-image {
  width: 80px;
  height: 80px;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

/* Item info */
.item-info {
  flex: 1;
  display: flex;
  justify-content: space-around;

  .item-name {
    font-size: 20px;
    font-weight: bold;
    color: $primary-color;
  }

  .item-price {
    font-size: 16px;
    color: $gray-color;
  }
}

/* Shopee-style quantity buttons */
.item-quantity {
  display: flex;
  align-items: center;
}

.quantity-button {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
}

.minus {
  background-color: $error-color;
}

.plus {
  background-color: $success-color;
}

/* Quantity number */
.quantity {
  margin: 0 10px;
  font-size: 18px;
  font-weight: bold;
}

.edit-button {
  margin-left: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 16px;
  color: $success-color;
  cursor: pointer;
  background: none;
  border: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #53c41a39;
  }

  &:focus {
    outline: none;
  }
}

.available-button {
  margin-left: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 16px;
  color: $error-color;
  cursor: pointer;
  background: none;
  border: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 77, 79, 0.1);
  }

  &:focus {
    outline: none;
  }
}

/* Empty cart message */
.empty-listing-message {
  text-align: center;
  font-size: 18px;
  margin-top: 50px;
  color: $gray-color;
}
</style>
