import { shallowMount } from '@vue/test-utils';
import CaProductPackageSelectedOptionsList from './CaProductPackageSelectedOptionsList.vue';

describe('CaProductPackageSelectedOptionsList.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaProductPackageSelectedOptionsList);
    expect(
      component.contains('.ca-product-package-selected-options-list')
    ).toBe(true);
  });
});
