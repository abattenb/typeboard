import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// TODO: Update strict and handle Vuex + v-model

const store = new Vuex.Store({
  strict: false,
  state: {
    settings: {
      selectedType: ['Arial', 'Times New Roman', 'Courier'],
      theme: 'theme_gold_teal',
      fontSize: '2',
      fontWeight: '400',
      letterSpacing: '0',
      italics: 'normal',
      sampleText: 'Sphinx of black quartz, judge my vow.',
    },
  },
  getters: {
    getSettings: state => state.settings,
  },
  actions: {
    setSettings(context, settings) {
      context.commit('SET_SETTINGS', settings);
    },
  },
  mutations: {
    SET_SETTINGS(state, settings) {
      state.settings = settings;
    },
  },
});

export default store;
