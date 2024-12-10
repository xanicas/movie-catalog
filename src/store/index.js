import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        genres: [],
        totalPages: 0,
        selectedMovieId: null,
    },
    mutations: {
        SET_GENRES(state, genres) {
            state.genres = genres;
        },
        SET_TOTAL_PAGES(state, totalPages) {
            state.totalPages = totalPages;
        },
        SET_SELECTED_MOVIE_ID(state, id) {
            state.selectedMovieId = id;
        },
    },
    actions: {
        setGenres({ commit }, payload) {
            commit('SET_GENRES', payload);
        },
        setTotalPages({ commit }, payload) {
            commit('SET_TOTAL_PAGES', payload);
        },
        setSelectedMovieId({ commit }, id) {
            commit('SET_SELECTED_MOVIE_ID', id);
        },
    },
    getters: {
        genres: (state) => state.genres,
        totalPages: (state) => state.totalPages,
        selectedMovieId: (state) => state.selectedMovieId,
    },
    plugins: [createPersistedState()],
});
