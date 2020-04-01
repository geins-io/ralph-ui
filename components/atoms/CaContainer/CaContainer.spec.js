import { shallowMount } from '@vue/test-utils';
import CaContainer from './CaContainer.vue';

describe('CaContainer.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaContainer);
    expect(component.contains('.ca-container')).toBe(true);
  });
});
