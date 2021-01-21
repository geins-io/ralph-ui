import { shallowMount } from '@vue/test-utils';
import CaWidgetBanner from './CaWidgetBanner.vue';

describe('CaWidgetBanner.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaWidgetBanner);
    expect(component.contains('.ca-widget-banner')).toBe(true);
  });
});
