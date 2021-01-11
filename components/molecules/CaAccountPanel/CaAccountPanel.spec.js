import { shallowMount } from '@vue/test-utils';
import CaAccountPanel from './CaAccountPanel.vue';

describe('CaAccountPanel.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaAccountPanel);
    expect(component.contains('.ca-account-panel')).toBe(true);
  });
});
