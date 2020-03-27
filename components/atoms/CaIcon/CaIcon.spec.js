import { shallowMount } from '@vue/test-utils';
import CaIcon from './CaIcon.vue';

describe('CaIcon.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaIcon);
    expect(component.contains('.ca-icon')).toBe(true);
  });
});
