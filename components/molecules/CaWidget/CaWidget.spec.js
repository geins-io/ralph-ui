import { shallowMount } from '@vue/test-utils';
import CaWidget from './CaWidget.vue';

describe('CaWidget.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaWidget);
    expect(component.contains('.ca-widget')).toBe(true);
  });
});
