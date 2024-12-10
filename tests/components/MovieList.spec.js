import { shallowMount } from '@vue/test-utils';
import MovieList from '@/components/MovieList.vue';
import ImageWithFallback from '@/components/ImageWithFallback.vue';

describe('Movies.vue', () => {
    it('renders a list of movies', () => {
        const movies = [
            { id: 1, title: 'Inception', poster_path: '/inception.jpg', vote_average: 8.8 },
            { id: 2, title: 'The Matrix', poster_path: '/matrix.jpg', vote_average: 8.7 },
        ];
        const wrapper = shallowMount(MovieList, {
            propsData: { movies },
        });

        const movieElements = wrapper.findAll('.movie');
        expect(movieElements.length).toBe(2);

        expect(movieElements.at(0).text()).toContain('Inception');
        expect(movieElements.at(0).text()).toContain('8.8');
        expect(movieElements.at(1).text()).toContain('The Matrix');
        expect(movieElements.at(1).text()).toContain('8.7');
    });

    it('renders ImageWithFallback with the correct src and alt attributes', () => {
        const movies = [
            { id: 1, title: 'Inception', poster_path: '/inception.jpg', vote_average: 8.8 },
        ];
        const wrapper = shallowMount(MovieList, {
            propsData: { movies },
        });

        const imageComponent = wrapper.findComponent(ImageWithFallback);
        expect(imageComponent.props('src')).toBe('https://image.tmdb.org/t/p/w200/inception.jpg');
        expect(imageComponent.props('alt')).toBe('Inception');
    });

    it('handles movies without a poster_path', () => {
        const movies = [
            { id: 1, title: 'Unknown Movie', poster_path: null, vote_average: 5.0 },
        ];
        const wrapper = shallowMount(MovieList, {
            propsData: { movies },
        });

        const imageComponent = wrapper.findComponent(ImageWithFallback);
        expect(imageComponent.props('src')).toBe('');
        expect(imageComponent.props('alt')).toBe('Unknown Movie');
    });

    it('renders an empty list without errors when no movies are provided', () => {
        const wrapper = shallowMount(MovieList, {
            propsData: { movies: [] },
        });

        const movieElements = wrapper.findAll('.movie');
        expect(movieElements.length).toBe(0);
    });
});
