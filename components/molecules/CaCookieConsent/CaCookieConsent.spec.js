import { shallowMount } from '@vue/test-utils';
import CaCookieConsent from './CaCookieConsent.vue';

describe('CaCookieConsent.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaCookieConsent);
    expect(component.contains('.ca-cookie-consent')).toBe(true);
  });
});
