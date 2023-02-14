import { shallowMount } from '@vue/test-utils';
import CaWidgetFlowbox from './CaWidgetFlowbox.vue';

describe('CaWidgetFlowbox.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaWidgetFlowbox);
    expect(component.contains('.ca-widget-flowbox')).toBe(true);
  });
});
