import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    theme: 'theme_black_white',
  },
  getters: {
    getTheme: state => state.theme,
  },
  mutations: {
    setTheme(state, themeName) {
      state.theme = themeName;
    },
  },
});

export default store;
