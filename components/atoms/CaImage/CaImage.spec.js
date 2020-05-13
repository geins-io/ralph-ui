import { shallowMount } from '@vue/test-utils';
import CaImage from './CaImage.vue';

describe('CaImage.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaImage);
    expect(component.contains('.ca-image')).toBe(true);
  });
});
