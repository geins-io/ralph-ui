import { shallowMount } from '@vue/test-utils';
import CaInfoPageMenu from './CaInfoPageMenu.vue';

describe('CaInfoPageMenu.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaInfoPageMenu);
    expect(component.contains('.ca-info-page-menu')).toBe(true);
  });
});
