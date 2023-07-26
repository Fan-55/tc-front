<template>
  <header>
    <nav class="container">
      <div class="branding">
        <img src="@/assets/corgi.png" alt="" />
        <router-link :to="{ name: 'Main' }"><h1>Happy Dog</h1></router-link>
      </div>
      <ul class="nav-routes">
        <router-link
          :to="{ name: 'SellerCenter' }"
          v-if="loginStore.role === 'seller'"
          >Seller Center</router-link
        >
        <router-link :to="{ name: 'Cart' }" v-if="loginStore.role === 'buyer'"
          >Cart</router-link
        >
        <router-link :to="{ name: 'Login' }" v-if="!loginStore.isLoggedIn"
          >Login</router-link
        >
        <button v-if="loginStore.isLoggedIn" @click="logout" class="btn btn-link">Logout</button>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { inject } from "vue";

import { useLoginStore } from "../store";
const loginStore = useLoginStore();

const logout = () => {
  localStorage.setItem("token", "");
  loginStore.setLoggedIn(false);
  loginStore.setUserId(null);
  loginStore.setToken("");
};
</script>

<style lang="scss" scoped>
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
