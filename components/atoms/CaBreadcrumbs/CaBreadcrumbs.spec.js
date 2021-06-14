import { shallowMount } from '@vue/test-utils';
import CaBreadcrumbs from './CaBreadcrumbs.vue';

describe('CaBreadcrumbs.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaBreadcrumbs);
    expect(component.contains('.ca-breadcrumbs')).toBe(true);
  });
});
