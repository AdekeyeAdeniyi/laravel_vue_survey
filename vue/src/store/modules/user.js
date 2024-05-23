import axiosClient from "../../axios";

const UserStore = {
  namespace: true,
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
  },
  getters: {},
  actions: {
    async register({ commit }, user) {
      const res = await axiosClient.post("/register", user);

      if (res.status !== 200) {
        throw new Error("Failed to register user");
      }

      const resData = await res.data;
      commit("setUser", resData);
      return resData;
    },

    async login({ commit }, user) {
      const res = await axiosClient.post("/login", user);

      if (res.status !== 200) {
        throw new Error("Failed to login");
      }

      const resData = await res.data;
      commit("setUser", resData);
      return resData;
    },

    async logout({ commit }) {
      const res = await axiosClient.post("/logout");

      if (res.data.success) {
        commit("logout");
      }
    },
  },
  mutations: {
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem("TOKEN");
    },

    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.date = userData.user;
      sessionStorage.setItem("TOKEN", userData.token);
    },
  },
};

export default UserStore;
