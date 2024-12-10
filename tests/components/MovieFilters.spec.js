import { shallowMount } from '@vue/test-utils';
import MovieFilters from '@/components/MovieFilters.vue';
import SearchBar from '@/components/SearchBar.vue';

describe('MovieFilters.vue', () => {
    let wrapper;
    const genres = [
        { id: '1', name: 'Action' },
        { id: '2', name: 'Comedy' },
        { id: '3', name: 'Drama' },
    ];

    beforeEach(() => {
        wrapper = shallowMount(MovieFilters, {
            propsData: {
                genres,
                selectedGenre: '2',
            },
            stubs: {
                SearchBar,
            },
        });
    });

    it('emits updateMovies event when the SearchBar emits updateMovies', async () => {
        const searchBar = wrapper.findComponent(SearchBar);
        searchBar.vm.$emit('updateMovies', ['movie1', 'movie2']);

        await wrapper.vm.$nextTick();
        expect(wrapper.emitted().updateMovies).toBeTruthy();
        expect(wrapper.emitted().updateMovies[0]).toEqual([['movie1', 'movie2']]);
    });

    it('emits resetMovies event when the SearchBar emits resetMovies', async () => {
        const searchBar = wrapper.findComponent(SearchBar);
        searchBar.vm.$emit('resetMovies');

        await wrapper.vm.$nextTick();
        expect(wrapper.emitted().resetMovies).toBeTruthy();
        expect(wrapper.emitted().resetMovies.length).toBe(1);
    });

    it('emits changeGenre event with the correct genre when the genre filter changes', async () => {
        const selectElement = wrapper.find('select');
        
        await selectElement.setValue('1');

        await wrapper.vm.$nextTick();
        expect(wrapper.emitted().changeGenre).toBeTruthy();
        expect(wrapper.emitted().changeGenre[0]).toEqual(['1']);
    });

    it('renders the correct genre options in the select dropdown', () => {
        const options = wrapper.findAll('select option');
        
        expect(options).toHaveLength(genres.length + 1);

        expect(options.at(0).text()).toBe('All Movies');
        expect(options.at(1).text()).toBe('Action');
        expect(options.at(2).text()).toBe('Comedy');
        expect(options.at(3).text()).toBe('Drama');
    });

    it('selects the default genre from props', () => {
        const selectElement = wrapper.find('select');
        
        expect(selectElement.element.value).toBe('2');
    });
});
