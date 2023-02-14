import { shallowMount } from '@vue/test-utils';
import CaReviewsList from './CaReviewsList.vue';

describe('CaReviewsList.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaReviewsList);
    expect(component.contains('.ca-reviews-list')).toBe(true);
  });
});
