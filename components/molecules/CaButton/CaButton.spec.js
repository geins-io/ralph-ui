import { shallowMount } from '@vue/test-utils';
import CaButton from './CaButton.vue';

describe('CaButton.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaButton);
    expect(component.contains('.ca-button')).toBe(true);
  });
});
