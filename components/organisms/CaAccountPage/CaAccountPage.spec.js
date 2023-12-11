import { shallowMount } from '@vue/test-utils';
import CaAccountPage from './CaAccountPage.vue';

describe('CaAccountPage.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaAccountPage);
    expect(component.contains('.ca-account-page')).toBe(true);
  });
});
