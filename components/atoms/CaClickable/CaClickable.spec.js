import { shallowMount } from '@vue/test-utils';
import CaClickable from './CaClickable.vue';

describe('CaClickable.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaClickable);
    expect(component.contains('.ca-clickable')).toBe(true);
  });
});
