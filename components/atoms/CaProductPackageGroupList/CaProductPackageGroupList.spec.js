import { shallowMount } from '@vue/test-utils';
import CaProductPackageGroupList from './CaProductPackageGroupList.vue';

describe('CaProductPackageGroupList.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaProductPackageGroupList);
    expect(component.contains('.ca-product-package-group-list')).toBe(true);
  });
});
