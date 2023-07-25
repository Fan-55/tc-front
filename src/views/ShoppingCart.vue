<template>
  <div class="shopping-cart">
    <h1>Shopping Cart</h1>
    <div v-if="cartItems.length === 0" class="empty-cart-message">
      Your cart is empty.
    </div>
    <div v-else>
      <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
        <div class="item-image">
          <img :src="item.image" :alt="item.name" />
        </div>
        <div class="item-info">
          <span class="item-name">{{ item.name }}</span>
          <span class="item-price">${{ item.price }}</span>
        </div>
        <div class="item-quantity">
          <button @click="decrementItem(index)" class="quantity-button minus">
            -
          </button>
          <span class="quantity">{{ item.quantity }}</span>
          <button @click="incrementItem(index)" class="quantity-button plus">
            +
          </button>
        </div>
        <button @click="removeItem(index)" class="remove-button">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
      <div class="total">
        <h2>total: {{ getTotal }}</h2>
        <button type="button" class="btn btn-primary" @click="onCheckout">
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import router from "../router";
import checkout from "../composables/checkout";
import "@fortawesome/fontawesome-free/css/all.css";

const cartItems = ref(JSON.parse(localStorage.getItem("cartItems")) || []);

const getTotal = computed(() => {
  let total = 0;
  cartItems.value.forEach((item) => (total += item.price * item.quantity));
  return total;
});

const incrementItem = (index) => {
  cartItems.value[index].quantity++;
};

const decrementItem = (index) => {
  if (cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity--;
  }
};

const removeItem = (index) => {
  cartItems.value.splice(index, 1);
};

const onCheckout = async () => {
  localStorage.setItem("cartItems", JSON.stringify([]));
  await checkout(cartItems.value);
  router.push("/");
  return;
};
</script>

<style lang="scss">
// SASS variables
$primary-color: black;
$error-color: #ff4d4f;
$success-color: #52c41a;
$gray-color: #999;

/* Main container */
.shopping-cart {
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

.remove-button {
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
.empty-cart-message {
  text-align: center;
  font-size: 18px;
  margin-top: 50px;
  color: $gray-color;
}

.total {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>
