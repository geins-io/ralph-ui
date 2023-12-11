import { shallowMount } from '@vue/test-utils';
import CaProductTabs from './CaProductTabs.vue';

describe('CaProductTabs.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaProductTabs);
    expect(component.contains('.ca-product-tabs')).toBe(true);
  });
});
