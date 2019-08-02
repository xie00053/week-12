import Vue from "vue";
import Vuex from "vuex";
import axiosAuth from "./axios-auth";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    error: "",
  },


  mutations: {
    AUTH_USER(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    SET_ERROR(state, errorMessage) {
      state.error = errorMessage;
    }
  },


  actions: {
    signUp({commit}, authData ) {
      axiosAuth
        // Web API key
        // AIzaSyBlK0mKp9wuIXmtMfw9wAt22excikJZga8
        .post("accounts:signUp?key=AIzaSyBlK0mKp9wuIXmtMfw9wAt22excikJZga8", 
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res);
          commit("AUTH_USER", {
            token: res.data.idToken,
            userId: res.data.localId
          });
        })
        .catch(error => {
          console.log(error.response.data.error.message);
          commit("SET_ERROR", error.response.data.error.message);
        });
      },

      signIn({ commit }, authData) {
        axiosAuth
          .post(
            "accounts:signInWithPassword?key=AIzaSyBlK0mKp9wuIXmtMfw9wAt22excikJZga8",
            {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true
            }
          )
          .then(res => {
            console.log(res);
            commit("AUTH_USER", {
              token: res.data.idToken,
              userId: res.data.localId
            });
          })
          .catch(error => {
            console.log(error.response.data.error.message);
            commit("SET_ERROR", error.response.data.error.message);
          });
      }
  }
});



