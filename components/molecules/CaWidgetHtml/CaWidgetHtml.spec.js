import { shallowMount } from '@vue/test-utils';
import CaWidgetHtml from './CaWidgetHtml.vue';

describe('CaWidgetHtml.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaWidgetHtml);
    expect(component.contains('.ca-widget-html')).toBe(true);
  });
});
