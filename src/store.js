import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', {
  state: () => ({
    _isLoggedIn: false,
    _userId: null,
    _token: "",
    _role: "buyer",
  }),
  getters: {
    // Getter to access the login state
    isLoggedIn: state => state._isLoggedIn,
    role: state => state._role,
    userId: state => state._userId,
  },
  actions: {
    // Action to update the login state
    setLoggedIn(value) {
      this._isLoggedIn = value;
    },
    setUserId(value) {
      this._userId = value;
    },
    setToken(value) {
      this._token = value;
    },
    setRole(value) {
      this._role = value;
    }
  },
});
