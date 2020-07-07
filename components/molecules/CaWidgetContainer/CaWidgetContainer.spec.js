import { shallowMount } from '@vue/test-utils';
import CaWidgetContainer from './CaWidgetContainer.vue';

describe('CaWidgetContainer.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaWidgetContainer);
    expect(component.contains('.ca-widget-container')).toBe(true);
  });
});
