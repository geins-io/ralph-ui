import { shallowMount } from '@vue/test-utils';
import CaProductMeta from './CaProductMeta.vue';

describe('CaProductMeta.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaProductMeta);
    expect(component.contains('.ca-product-meta')).toBe(true);
  });
});
