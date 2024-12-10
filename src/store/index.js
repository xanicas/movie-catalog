import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        genres: [],
        selectedMovieId: null,
    },
    mutations: {
        SET_GENRES(state, genres) {
            state.genres = genres;
        },
        SET_SELECTED_MOVIE_ID(state, id) {
            state.selectedMovieId = id;
        },
    },
    actions: {
        setGenres({ commit }, payload) {
            commit('SET_GENRES', payload);
        },
        setSelectedMovieId({ commit }, id) {
            commit('SET_SELECTED_MOVIE_ID', id);
        },
    },
    getters: {
        genres: (state) => state.genres,
        selectedMovieId: (state) => state.selectedMovieId,
    },
    plugins: [createPersistedState()],
});
