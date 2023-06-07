import { shallowMount } from '@vue/test-utils';
import CaProductPackageList from './CaProductPackageList.vue';

describe('CaProductPackageList.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaProductPackageList);
    expect(component.contains('.ca-product-package-list')).toBe(true);
  });
});
