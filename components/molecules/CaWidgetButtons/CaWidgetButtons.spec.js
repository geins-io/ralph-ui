import { shallowMount } from '@vue/test-utils';
import CaWidgetButtons from './CaWidgetButtons.vue';

describe('CaWidgetButtons.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaWidgetButtons);
    expect(component.contains('.ca-widget-buttons')).toBe(true);
  });
});
