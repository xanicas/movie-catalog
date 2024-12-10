import { mount } from '@vue/test-utils';
import MoviePagination from '@/components/MoviePagination.vue';

describe('MoviePagination.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(MoviePagination, {
            propsData: {
                currentPage: 1,
                totalPages: 5,
                moviesPerPage: 20,
                pageSizeOptions: [10, 20]
            }
        });
    });

    it('renders the pagination buttons correctly', () => {
        expect(wrapper.find('button:first-of-type').text()).toBe('Previous');
        expect(wrapper.find('button:last-of-type').text()).toBe('Next');
        expect(wrapper.find('span').text()).toBe('Page 1 of 5');
    });

    it('disables the "Previous" button when currentPage is 1', async () => {
        expect(wrapper.find('button:first-of-type').attributes('disabled')).toBeTruthy();
        await wrapper.setProps({ currentPage: 2 });
        expect(wrapper.find('button:first-of-type').attributes('disabled')).toBeFalsy();
    });

    it('disables the "Next" button when currentPage is equal to totalPages', async () => {
        expect(wrapper.find('button:last-of-type').attributes('disabled')).toBeFalsy();
        await wrapper.setProps({ currentPage: 5 });
        expect(wrapper.find('button:last-of-type').attributes('disabled')).toBeTruthy();
    });

    it('emits the "changePage" event when the "Previous" button is clicked', async () => {
        await wrapper.setProps({ currentPage: 2 });
        await wrapper.find('button:first-of-type').trigger('click');
        expect(wrapper.emitted().changePage[0]).toEqual([1]);
    });

    it('emits the "changePage" event when the "Next" button is clicked', async () => {
        await wrapper.find('button:last-of-type').trigger('click');
        expect(wrapper.emitted().changePage[0]).toEqual([2]);
    });

    it('renders the page size options dynamically', () => {
        const options = wrapper.findAll('option');
        expect(options).toHaveLength(2);
        expect(options.at(0).text()).toBe('10');
        expect(options.at(1).text()).toBe('20');
    });

    it('emits "changePageSize" when a new option is selected', async () => {
        await wrapper.find('select').setValue('20');
        expect(wrapper.emitted().changePageSize[0]).toEqual([20]);
    });

    it('updates localMoviesPerPage when the prop moviesPerPage changes', async () => {
        await wrapper.setProps({ moviesPerPage: 20 });
        expect(wrapper.vm.localMoviesPerPage).toBe(20);
    });
});
