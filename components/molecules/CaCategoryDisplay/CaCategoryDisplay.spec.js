import { shallowMount } from '@vue/test-utils';
import CategoryDisplay from './CategoryDisplay.vue';

describe('CategoryDisplay.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CategoryDisplay);
    expect(component.contains('.ca-category-display')).toBe(true);
  });
});
