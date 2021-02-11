import { shallowMount } from '@vue/test-utils';
import CaAccountSettings from './CaAccountSettings.vue';

describe('CaAccountSettings.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaAccountSettings);
    expect(component.contains('.ca-account-settings')).toBe(true);
  });
});
