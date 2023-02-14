import { shallowMount } from '@vue/test-utils';
import CaStarRating from './CaStarRating.vue';

describe('CaStarRating.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaStarRating);
    expect(component.contains('.ca-star-rating')).toBe(true);
  });
});
