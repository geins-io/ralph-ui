import { shallowMount } from '@vue/test-utils';
import CaIconButton from './CaIconButton.vue';

describe('CaIconButton.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaIconButton);
    expect(component.contains('.ca-icon-button')).toBe(true);
  });
});
