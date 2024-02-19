import getOrdersQuery from 'user/orders.graphql';
import MixFetch from 'MixFetch';
// @group Mixins
// @vuese
// The functionality of the account orders page<br><br>
// **Data:**<br>
// fetchPolicy: `'no-cache'`<br>
// orders: `null`<br>
// inProgressStatuses: `['received', 'processing']`<br>
// historyStatuses: `['cancelled', 'completed']`
export default {
  name: 'MixAccountOrders',
  middleware: 'ralph-authenticated',
  mixins: [MixFetch],
  transition: 'no-transition',
  async fetch() {
    this.orders = await this.fetchData(
      getOrdersQuery,
      this.variables,
      (result) => {
        return result?.data?.getOrders || null;
      },
    );
  },
  data: () => ({
    fetchPolicy: 'no-cache',
    orders: null,
    inProgressStatuses: ['received', 'processing'],
    historyStatuses: ['cancelled', 'completed'],
  }),
  computed: {
    ordersInProgress() {
      return this.splitOrders(this.inProgressStatuses);
    },
    orderHistory() {
      return this.splitOrders(this.historyStatuses);
    },
  },
  created() {},
  methods: {
    // @vuese
    // Map status to match the status of the order
    // @arg status (String)
    mapStatus(status) {
      switch (status) {
        case 'pending':
        case 'pending-payment':
        case 'backorder':
          return 'received';
        case 'partial':
        case 'inactive':
        case 'on-hold':
          return 'processing';
        case 'cancelled':
        case 'out-of-stock':
          return 'cancelled';
        case 'completed':
        case 'refunded':
          return 'completed';
        default:
          return status;
      }
    },
    // @vuese
    // Split orders into arrays based on status
    // @arg statusArray (Array)
    splitOrders(statusArray) {
      const arr = this.orders
        ? this.orders.map((i) => {
            i.status = this.mapStatus(i.status);
            return i;
          })
        : [];
      return arr.filter((i) => statusArray.includes(i.status));
    },
  },
};
