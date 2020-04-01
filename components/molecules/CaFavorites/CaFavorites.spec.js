import { shallowMount } from '@vue/test-utils';
import CaFavorites from './CaFavorites.vue';

describe('CaFavorites.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaFavorites);
    expect(component.contains('.ca-favorites')).toBe(true);
  });
});
