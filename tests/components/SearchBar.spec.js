import { shallowMount } from '@vue/test-utils';
import SearchBar from '@/components/SearchBar.vue';
import { searchMovies } from '@/services/api';

jest.mock('@/services/api', () => ({
    searchMovies: jest.fn(),
}));

describe('SearchBar.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(SearchBar, {
            propsData: {
                placeholder: 'Search movie',
            },
        });
    });

    it('renders the search bar with an input and search icon', () => {
        expect(wrapper.find('input').exists()).toBe(true);
        expect(wrapper.find('i.fa-search').exists()).toBe(true);
    });

    it('has the correct placeholder text', () => {
        const input = wrapper.find('input');
        expect(input.attributes('placeholder')).toBe('Search movie');
    });

    it('initializes the query data correctly', () => {
        expect(wrapper.vm.query).toBe('');
    });

    it('calls onSearch when input is triggered', async () => {
        searchMovies.mockResolvedValue({ data: ['movie1', 'movie2'] });
    
        await wrapper.find('input').setValue('test');
        await wrapper.vm.$nextTick();
        
        expect(searchMovies).toHaveBeenCalledWith('test');
        expect(wrapper.emitted().updateMovies).toBeTruthy();
        expect(wrapper.emitted().updateMovies[0]).toEqual([['movie1', 'movie2']]);
    });

    it('emits "resetMovies" event when the query is cleared', async () => {
        await wrapper.find('input').setValue('');
        await wrapper.vm.onSearch();

        expect(wrapper.emitted().resetMovies).toBeTruthy();
    });
});
