<template>
  <div class="login-container">
    <h2>Login</h2>
    <select
      class="form-select"
      aria-label="Default select example"
      v-model="role"
    >
      <option value="buyer">Buyer</option>
      <option value="seller">Seller</option>
    </select>
    <form method="post" @submit.prevent="onSubmit">
      <input
        v-model="username"
        type="text"
        class="login-input"
        name="username"
        placeholder="Username"
        required
      />
      <input
        v-model="password"
        type="password"
        class="login-input"
        name="password"
        placeholder="Password"
        required
      />
      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

import getDataServices from "../DataServices/DataServices";
import router from "../router";
import { useLoginStore } from "../store";

const dataServices = getDataServices();
const loginStore = useLoginStore();
const role = ref("buyer");
const username = ref("");
const password = ref("");

const onSubmit = async () => {
  const loginResult = await dataServices.login(username.value, password.value, role.value);
  if (loginResult.token) {
    localStorage.setItem("token", loginResult.token);
    loginStore.setLoggedIn(true);
    loginStore.setUserId(loginResult.userId);
    loginStore.setToken(loginResult.token);
    loginStore.setRole(role.value);
    router.push("/");
    return;
  }
};
</script>

<style>
.form-select {
  margin-bottom: 20px;
}

.login-container {
  margin: 20px auto;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 350px;
  text-align: center;
}

.login-container h2 {
  margin-bottom: 20px;
  color: #333;
}

.login-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 16px;
}

.login-button {
  width: 100%;
  background-color: #007bff;
  color: #fff;
  padding: 14px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.login-button:hover {
  background-color: #0056b3;
}

.login-footer {
  margin-top: 20px;
  color: #888;
}
</style>
