import { shallowMount } from '@vue/test-utils';
import CaNotificationBadge from './CaNotificationBadge.vue';

describe('CaNotificationBadge.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaNotificationBadge);
    expect(component.contains('.ca-notification-badge')).toBe(true);
  });
});
