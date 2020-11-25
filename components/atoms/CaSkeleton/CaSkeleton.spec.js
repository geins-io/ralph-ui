import { shallowMount } from '@vue/test-utils';
import CaSkeleton from './CaSkeleton.vue';

describe('CaSkeleton.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaSkeleton);
    expect(component.contains('.ca-skeleton')).toBe(true);
  });
});
