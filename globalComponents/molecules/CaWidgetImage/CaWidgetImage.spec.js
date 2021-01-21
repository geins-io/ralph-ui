import { shallowMount } from '@vue/test-utils';
import CaHejImage from './CaHejImage.vue';

describe('CaHejImage.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaHejImage);
    expect(component.contains('.ca-hej-image')).toBe(true);
  });
});
