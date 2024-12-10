import { shallowMount, createLocalVue } from '@vue/test-utils';
import HeaderComponent from '@/components/Header.vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('HeaderComponent.vue', () => {
    let router;
    let wrapper;

    beforeEach(() => {
        router = new VueRouter({
            routes: [
                { path: '/', name: 'Home' },
                { path: '/about', name: 'About' },
                { path: '/movies', name: 'MoviesList' }
            ]
        });

        wrapper = shallowMount(HeaderComponent, {
            localVue,
            router
        });
    });

    it('renders the header with the correct title and navigation links', () => {
        expect(wrapper.find('h1').text()).toBe('Movie Catalog');

        const navLinks = wrapper.findAll('nav ul li a');
        expect(navLinks.at(0).text()).toBe('Home');
        expect(navLinks.at(1).text()).toBe('About');
        expect(navLinks.at(0).attributes('href')).toBe('/');
        expect(navLinks.at(1).attributes('href')).toBe('/about');
    });

    it('calls backHomePage when the title is clicked', async () => {
        const backHomePageSpy = jest.spyOn(wrapper.vm, 'backHomePage');

        await wrapper.find('h1').trigger('click');

        expect(backHomePageSpy).toHaveBeenCalled();
    });

    it('redirects to the "MoviesList" route when backHomePage is called and not already on the home page', async () => {
        router.push('/about');
        await wrapper.vm.$nextTick();

        const pushSpy = jest.spyOn(wrapper.vm.$router, 'push');

        wrapper.vm.backHomePage();

        expect(pushSpy).toHaveBeenCalledWith({ name: 'MoviesList' });
    });
});
