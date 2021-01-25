import { shallowMount } from '@vue/test-utils';
import CaWidgetBannerButton from './CaWidgetBannerButton.vue';

describe('CaWidgetBannerButton.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaWidgetBannerButton);
    expect(component.contains('.ca-widget-banner-button')).toBe(true);
  });
});
