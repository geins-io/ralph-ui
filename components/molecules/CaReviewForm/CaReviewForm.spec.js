import { shallowMount } from '@vue/test-utils';
import CaReviewForm from './CaReviewForm.vue';

describe('CaReviewForm.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaReviewForm);
    expect(component.contains('.ca-review-form')).toBe(true);
  });
});
