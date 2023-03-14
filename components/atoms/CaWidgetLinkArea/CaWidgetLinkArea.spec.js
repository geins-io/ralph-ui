import { shallowMount } from '@vue/test-utils';
import CaWidgetLinkArea from './CaWidgetLinkArea.vue';

describe('CaWidgetLinkArea.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaWidgetLinkArea);
    expect(component.contains('.ca-widget-link-area')).toBe(true);
  });
});
