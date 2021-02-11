import { shallowMount } from '@vue/test-utils';
import CaAccountSettingsBlock from './CaAccountSettingsBlock.vue';

describe('CaAccountSettingsBlock.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaAccountSettingsBlock);
    expect(component.contains('.ca-account-settings-block')).toBe(true);
  });
});
