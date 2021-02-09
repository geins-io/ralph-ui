import { shallowMount } from '@vue/test-utils';
import CaStatusLabel from './CaStatusLabel.vue';

describe('CaStatusLabel.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaStatusLabel);
    expect(component.contains('.ca-status-label')).toBe(true);
  });
});
