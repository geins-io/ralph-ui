import { shallowMount } from '@vue/test-utils';
import CaColorIcon from './CaColorIcon.vue';

describe('CaColorIcon.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaColorIcon);
    expect(component.contains('.ca-color-icon')).toBe(true);
  });
});
