import { shallowMount } from '@vue/test-utils';
import CaCampaigns from './CaCampaigns.vue';

describe('CaCampaigns.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaCampaigns);
    expect(component.contains('.ca-campaigns')).toBe(true);
  });
});
