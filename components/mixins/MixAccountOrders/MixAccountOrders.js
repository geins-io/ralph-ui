import getOrdersQuery from 'user/orders.graphql';
// @group Mixins
// @vuese
// The functionality of the account orders page<br><br>
// **Data:**<br>
// orders: `null`<br>
// inProgressStatuses: `['received', 'processing']`<br>
// historyStatuses: `['cancelled', 'completed']`
export default {
  name: 'MixAccountOrders',
  middleware: 'authenticated',
  transition: 'no-transition',
  apollo: {
    getOrders: {
      query: getOrdersQuery,
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      result(result) {
        if (result.data) {
          this.orders = result.data.getOrders;
        }
      },
      error(error) {
        this.$nuxt.error({ statusCode: 500, message: error });
      },
    },
  },
  data: () => ({
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
