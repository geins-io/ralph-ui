import { shallowMount } from '@vue/test-utils';
import CaNshift from './CaNshift.vue';

describe('CaNshift.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaNshift);
    expect(component.contains('.ca-nshift')).toBe(true);
  });
});
