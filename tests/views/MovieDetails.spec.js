import { mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import MovieDetails from '@/views/MovieDetails.vue';
import { fetchMovieById } from '@/services/api';
import ImageWithFallback from '@/components/ImageWithFallback.vue';
import VueRouter from 'vue-router';
import store from '@/store';
import router from '@/router';

jest.mock('@/services/api', () => ({
    fetchMovieById: jest.fn()
}));

Vue.use(Vuex);

describe('MovieDetails.vue', () => {
    let wrapper;
    let localVue;
    const movieData = {
        id: 1,
        title: 'Sample Movie',
        poster_path: '/sample.jpg',
        vote_average: 8.5,
        release_date: '2024-01-01',
        overview: 'This is a sample movie.',
        genres: [{ id: 1, name: 'Drama' }, { id: 2, name: 'Action' }]
    };

    beforeEach(async () => {
        localVue = createLocalVue();
        localVue.use(Vuex);
        localVue.use(VueRouter);

        // Mock the API response
        fetchMovieById.mockResolvedValueOnce({ data: movieData });

        const testStore = new Vuex.Store({
            getters: {
                selectedMovieId: () => 1
            }
        });

        const testRouter = new VueRouter({
            routes: [
                { path: '/', name: 'Home' },
                { path: '/about', name: 'About' },
                { path: '/movies', name: 'MoviesList' }
            ]
        });

        wrapper = mount(MovieDetails, {
            localVue,
            store: testStore,
            router: testRouter,
            global: {
                components: { ImageWithFallback }
            }
        });

        await wrapper.vm.$nextTick();
    });

    it('renders the movie details correctly', async () => {
        await wrapper.vm.$nextTick();
        expect(wrapper.find('h2').text()).toBe(movieData.title);
        expect(wrapper.find('.movie-rating p').text()).toBe(`Rating: ${movieData.vote_average}`);
        expect(wrapper.find('.movie-info p').text()).toContain(`Release Date: ${movieData.release_date}`);
        expect(wrapper.find('.movie-info .movie-overview').text()).toContain(movieData.overview);
        expect(wrapper.find('.movie-genres span').text()).toBe(movieData.genres[0].name);
    });

    it('shows a loading message when the movie data is not yet available', () => {
        wrapper = mount(MovieDetails, {
            localVue,
            store,
            router,
            global: {
                components: { ImageWithFallback }
            }
        });

        expect(wrapper.text()).toContain('Loading movie details...');
    });

    it('navigates to the movies list when the back button is clicked', async () => {
        const pushMock = jest.fn();
        wrapper.vm.$router.push = pushMock;

        await wrapper.find('.back-button').trigger('click');

        expect(pushMock).toHaveBeenCalledWith({ name: 'MoviesList' });
    });

    it('displays the correct poster image when movie data is available', async () => {
        await wrapper.vm.$nextTick();
        const image = wrapper.find('img');
        expect(image.attributes('src')).toBe(`https://image.tmdb.org/t/p/w200${movieData.poster_path}`);
        expect(image.attributes('alt')).toBe(movieData.title);
    });
});
