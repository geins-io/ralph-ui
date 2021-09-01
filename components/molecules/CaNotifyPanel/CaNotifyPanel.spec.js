import { shallowMount } from '@vue/test-utils';
import CaNotifyPanel from './CaNotifyPanel.vue';

describe('CaNotifyPanel.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaNotifyPanel);
    expect(component.contains('.ca-notify-panel')).toBe(true);
  });
});
