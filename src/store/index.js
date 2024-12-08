import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movies: [],
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
  },
  actions: {
    fetchMovies({ commit }, movies) {
      commit('SET_MOVIES', movies);
    },
  },
  getters: {
    allMovies: (state) => state.movies,
  },
});
