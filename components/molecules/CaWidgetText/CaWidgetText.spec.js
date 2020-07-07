import { shallowMount } from '@vue/test-utils';
import CaHej from './CaHej.vue';

describe('CaHej.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaHej);
    expect(component.contains('.ca-hej')).toBe(true);
  });
});
