import { shallowMount } from '@vue/test-utils';
import CaWidgetRichText from './CaWidgetRichText.vue';

describe('CaWidgetRichText.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaWidgetRichText);
    expect(component.contains('.ca-widget-rich-text')).toBe(true);
  });
});
