import { shallowMount } from '@vue/test-utils';
import CaNewsletter from './CaNewsletter.vue';

describe('CaNewsletter.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaNewsletter);
    expect(component.contains('.ca-newsletter')).toBe(true);
  });
});
