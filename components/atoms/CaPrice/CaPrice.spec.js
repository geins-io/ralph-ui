import { shallowMount } from '@vue/test-utils';
import CaPrice from './CaPrice.vue';

describe('CaPrice.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaPrice);
    expect(component.contains('.ca-price')).toBe(true);
  });
});
