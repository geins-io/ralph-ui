import { shallowMount } from '@vue/test-utils';
import CaFeedback from './CaFeedback.vue';

describe('CaFeedback.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaFeedback);
    expect(component.contains('.ca-feedback')).toBe(true);
  });
});
