<template>
  <header>
    <nav class="container">
      <div class="branding">
        <img src="@/assets/corgi.png" alt="" />
        <router-link :to="{ name: 'Main' }"><h1>e-commerce</h1></router-link>
      </div>
      <ul class="nav-routes">
        <router-link
          :to="{ name: 'SellerCenter' }"
          v-if="loginStore.role === 'seller'"
          >Seller Center</router-link
        >
        <router-link :to="{ name: 'Cart' }" v-if="loginStore.role === 'buyer' || !loginStore.isLoggedIn"
          ><i class="fa-solid fa-cart-shopping fa-2x"></i></router-link
        >
        <router-link :to="{ name: 'Login' }" v-if="!loginStore.isLoggedIn"
          >Login</router-link
        >
        <span v-if="loginStore.isLoggedIn" @click="logout" class="logout-btn"
          >Logout</span
        >
        <span v-if="loginStore.isLoggedIn">Hi, {{loginStore.role}} {{ loginStore.userId }}</span>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { inject, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useLoginStore } from "../store";
const router = useRouter();
const loginStore = useLoginStore();

onMounted(() => {
  loginStore.setLoggedIn(!!localStorage.getItem("token"));
  loginStore.setUserId(localStorage.getItem("userId"));
  loginStore.setRole(localStorage.getItem("role"));
});

const logout = () => {
  localStorage.setItem("token", "");
  localStorage.setItem("userId", "");
  localStorage.setItem("role", "buyer");
  loginStore.setLoggedIn(false);
  loginStore.setUserId(null);
  loginStore.setToken("");
  loginStore.setRole("buyer");
  router.push("/");
};
</script>

<style lang="scss" scoped>
.logout-btn {
  &:hover {
    cursor: pointer;
  }
}
.container {
  max-width: 1100px;
  margin: 0 auto;
}

header {
  background-color: #f1f1f1;
  nav {
    display: flex;
    align-items: center;
    padding: 25px 16px;

    .branding {
      display: flex;
      align-items: center;
      gap: 8px;
      img {
        max-width: 60px;
      }

      h1 {
        font-size: 20px;
      }

      a {
        text-decoration: none;
        color: black;

        &:visited {
          color: black;
        }
      }
    }

    .nav-routes {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      gap: 12px;
      list-style: none;

      a {
        text-decoration: none;
        color: inherit;
      }
    }
  }
}
</style>
