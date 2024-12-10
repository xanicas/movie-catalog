import store from '@/store';

const mockGenres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Comedy' },
];

describe('Vuex Store', () => {
    it('should set genres when setGenres action is dispatched', () => {
        store.dispatch('setGenres', mockGenres);
        expect(store.state.genres).toEqual(mockGenres);
    });

    it('should set selected movie ID when setSelectedMovieId action is dispatched', () => {
        store.dispatch('setSelectedMovieId', 123);
        expect(store.state.selectedMovieId).toBe(123);
    });

    it('should return genres from the getter', () => {
        store.state.genres = mockGenres;
        expect(store.getters.genres).toEqual(mockGenres);
    });

    it('should return the selected movie ID from the getter', () => {
        store.state.selectedMovieId = 123;
        expect(store.getters.selectedMovieId).toBe(123);
    });
});
