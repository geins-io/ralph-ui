// @group Mixins
// @vuese
// Methods for queueing promises
export default {
  name: 'MixPromiseQueue',
  mixins: [],
  props: {},
  data: () => ({
    workingOnPromise: false,
    promiseQueue: []
  }),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // A function holding the promise that should be queued `() => Promise`
    // @arg promise (Function)
    enqueue(promise) {
      return new Promise((resolve, reject) => {
        this.promiseQueue.push({
          promise,
          resolve,
          reject
        });
        this.dequeue();
      });
    },
    // @vuese
    // Used internally to execute the queue of promises in order
    dequeue() {
      if (this.workingOnPromise) {
        return false;
      }
      const item = this.promiseQueue.shift();
      if (!item) {
        return false;
      }
      try {
        this.workingOnPromise = true;
        item
          .promise()
          .then(value => {
            this.workingOnPromise = false;
            item.resolve(value);
            this.dequeue();
          })
          .catch(err => {
            this.workingOnPromise = false;
            item.reject(err);
            this.dequeue();
          });
      } catch (err) {
        this.workingOnPromise = false;
        item.reject(err);
        this.dequeue();
      }
      return true;
    }
  }
};
