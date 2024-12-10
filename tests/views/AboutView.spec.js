import { shallowMount, createLocalVue } from '@vue/test-utils';
import AboutView from '@/views/AboutView.vue';

const localVue = createLocalVue();

describe('AboutView.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(AboutView, {
            localVue,
        });
    });

    it('renders the about page', () => {
        expect(wrapper.find('h1').text()).toBe('About');
    });
});
