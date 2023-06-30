import { shallowMount } from '@vue/test-utils';
import CaWidgetJson from './CaWidgetJson.vue';

describe('CaWidgetJson.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaWidgetJson);
    expect(component.contains('.ca-widget-json')).toBe(true);
  });
});
