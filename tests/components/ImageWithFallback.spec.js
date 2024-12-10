import { shallowMount } from '@vue/test-utils';
import ImageWithFallback from '@/components/ImageWithFallback.vue'; // Update with the correct file path

describe('ImageWithFallback.vue', () => {
    it('renders with the correct src and alt attributes', () => {
        const src = 'test-image.jpg';
        const alt = 'Test Image';
        const wrapper = shallowMount(ImageWithFallback, {
            propsData: { src, alt },
        });

        const img = wrapper.find('img');
        expect(img.attributes('src')).toBe(src);
        expect(img.attributes('alt')).toBe(alt);
    });

    it('uses the placeholder image when the src is not provided', () => {
        const wrapper = shallowMount(ImageWithFallback, {
            propsData: { src: '' },
        });

        const img = wrapper.find('img');
        expect(img.attributes('src')).toBe('../assets/images/no_image_placeholder.svg');
    });

    it('updates src to placeholder on error', async () => {
        const src = 'test-image.jpg';
        const wrapper = shallowMount(ImageWithFallback, {
            propsData: { src },
        });

        const img = wrapper.find('img');
        await img.trigger('error');

        expect(wrapper.vm.resolvedSrc).toBe('../assets/images/no_image_placeholder.svg');
        expect(img.attributes('src')).toBe('../assets/images/no_image_placeholder.svg');
    });

    it('renders with a default alt attribute when not provided', () => {
        const src = 'test-image.jpg';
        const wrapper = shallowMount(ImageWithFallback, {
            propsData: { src },
        });

        const img = wrapper.find('img');
        expect(img.attributes('alt')).toBe('');
    });
});