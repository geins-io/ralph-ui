import { shallowMount } from '@vue/test-utils';
import CaIconAndText from './CaIconAndText.vue';

describe('CaIconAndText.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaIconAndText);
    expect(component.contains('.ca-icon-and-text')).toBe(true);
  });
});
