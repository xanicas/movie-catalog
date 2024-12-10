import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import MoviesList from '@/views/MoviesList.vue';
import { fetchMovies, fetchGenres } from '@/services/api';

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock('@/services/api', () => ({
    fetchMovies: jest.fn(),
    fetchGenres: jest.fn()
}));

describe('MoviesList.vue', () => {
    let store;
    let getters;
    let wrapper;

    beforeEach(() => {
        getters = {
            genres: () => []
        };
        store = new Vuex.Store({
            getters,
            actions: {
                setGenres: jest.fn()
            }
        });

        fetchGenres.mockResolvedValue({ data: [] });
        fetchMovies.mockResolvedValue({ results: [], total_pages: 1 });

        wrapper = mount(MoviesList, {
            localVue,
            store
        });
    });

    it('renders the component properly', () => {
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('.movie-list').exists()).toBe(true);
    });

    it('calls fetchGenres and fetchMovies on mount', () => {
        expect(fetchGenres).toHaveBeenCalled();
        expect(fetchMovies).toHaveBeenCalled();
    });

    it('handles genre change and updates movies', async () => {
        await wrapper.setData({ selectedGenre: 'Action' });
        await wrapper.vm.handleGenreChange('Action');

        expect(wrapper.vm.selectedGenre).toBe('Action');
        expect(fetchMovies).toHaveBeenCalledWith(1, 'Action');
    });

    it('updates movies on handleUpdateMovies call', () => {
        const payload = {
            results: [
                { id: 1, title: 'New Movie' }
            ],
            total_pages: 2
        };

        wrapper.vm.handleUpdateMovies(payload);

        expect(wrapper.vm.movies).toEqual(payload.results);
        expect(wrapper.vm.totalPages).toBe(payload.total_pages);
    });

    it('changes pages correctly with changePage', async () => {
        await wrapper.vm.changePage(2);
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.currentFrontendPage).toBe(2);
    });

    it('handles page size change and resets the current page', async () => {
        await wrapper.vm.handlePageSizeChange(20);

        expect(wrapper.vm.moviesPerPage).toBe(20);
        expect(wrapper.vm.currentFrontendPage).toBe(1);
    });

    it('logs an error when fetching genres fails', async () => {
        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });
        fetchGenres.mockRejectedValue(new Error('Failed to fetch genres'));

        await wrapper.vm.fetchGenres();

        expect(consoleErrorMock).toHaveBeenCalledWith('Error fetching genres:', expect.any(Error));
        consoleErrorMock.mockRestore();
    });

    it('logs an error when fetching movies fails', async () => {
        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });
        fetchMovies.mockRejectedValue(new Error('Failed to fetch movies'));

        await wrapper.vm.fetchMovies();

        expect(consoleErrorMock).toHaveBeenCalledWith('Error fetching movies:', expect.any(Error));
        consoleErrorMock.mockRestore();
    });
});
