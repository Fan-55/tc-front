<template>
  <div class="main">
    <!-- #region search bar -->
    <div class="search-bar">
      <div class="input-wrap" :class="{ 'input-err': search.isInvalid }">
        <input type="text" v-model="search.productName" />
        <button @click="onSearch()">
          <slot name="button-content"> Search </slot>
        </button>
      </div>
      <p class="err-msg" v-if="search.isInvalid">{{ search.errMsg }}</p>
    </div>
    <!-- #endregion -->

    <!-- #region range slider -->
    <div class="range">
      <span>Price range</span>
      <input type="text" class="price-input" v-model="minPrice" />
      <span> ~ </span>
      <input type="text" class="price-input" v-model="maxPrice" />
      <button @click="onSearchByPrice" class="btn btn-primary m-1">Apply</button>
    </div>
    <!-- #endregion -->

    <!-- #region product list -->
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" alt="Product Image" class="product-image" />
        <h3 class="product-title">{{ product.name }}</h3>
        <p class="product-price">${{ product.price }}</p>
        <button @click="addToCart(product)" class="add-to-cart-btn">
          Add to Cart
        </button>
      </div>
    </div>
    <!-- endregion -->
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";

import getDataServices from "../DataServices/DataServices";

const dataServices = getDataServices();
const products = ref([]);
const search = reactive({
  productName: "",
  isInvalid: false,
  errMsg: "",
});
const minPrice = ref(50);
const maxPrice = ref(500);

const addToCart = (product) => {
  const currentCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const itemIndex = currentCartItems.findIndex((item) => {
    return item.id === product.id;
  });
  const itemExists = itemIndex != -1;
  if (itemExists) {
    currentCartItems[itemIndex].quantity += 1;
  } else {
    currentCartItems.push({
      id: product.id,
      name: product.name,
      quantity: 1,
      image: product.image,
      price: product.price,
    });
  }
  localStorage.setItem("cartItems", JSON.stringify(currentCartItems));
};

const onSearchByPrice = async () => {
  const searchedProducts = await dataServices.getProducts({
    productName: search.productName,
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
  });
  products.value = searchedProducts;
};

const onSearch = async () => {
  if (!search.productName?.trim()) {
    search.isInvalid = true;
    search.errMsg = "Please enter product name";
    search.productName = "";
    return;
  }
  search.isInvalid = false;
  search.errMsg = "";
  const searchedProducts = await dataServices.getProducts({
    productName: search.productName,
  });
  products.value = searchedProducts;
};

onMounted(async () => {
  const browsedProducts = await dataServices.getProducts();
  products.value = browsedProducts;
});
</script>

<style lang="scss" scoped>
.range {
  display: flex;
  align-items: center;
}
.price-input {
  border-radius: 5px;
  border: 1px solid #acacac;
}

// region search bar
.search-bar {
  margin: 20px 0;

  .input-wrap {
    display: flex;
    transition: 250ms ease;
    border: 2px solid #41b080;

    &.input-err {
      border-color: red;
    }

    &:focus-within {
      box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1),
        0 -2px 4px -2px rgb(0 0 0 / 0.1);
    }

    input {
      width: 100%;
      padding: 8px 6px;
      border: none;

      &:focus {
        outline: none;
      }
    }

    button {
      padding: 8px 16px;
      border: none;
    }
  }

  .err-msg {
    margin-top: 6px;
    font-size: 12px;
    text-align: center;
    color: red;
  }
}
// endregion

// region range slider
.range {
  display: flex;
  justify-content: flex-start;
}
// endregion

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
}

.product-card {
  width: 200px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}

.product-title {
  margin: 10px 0;
}

.product-price {
  font-weight: bold;
  color: #007bff;
}

.add-to-cart-btn {
  display: block;
  margin: 10px auto;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart-btn:hover {
  background-color: #0056b3;
}
</style>
