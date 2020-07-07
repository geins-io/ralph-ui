import { shallowMount } from '@vue/test-utils';
import CaWidgetArea from './CaWidgetArea.vue';

describe('CaWidgetArea.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaWidgetArea);
    expect(component.contains('.ca-widget-area')).toBe(true);
  });
});
