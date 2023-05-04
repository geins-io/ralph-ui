class RalphEvent {
  constructor(type, data) {
    this.data = data;
    this.timestamp = new Date();
    this.type = type;
  }

  static createEvent(type, data) {
    return new RalphEvent(type, data);
  }
}
export const state = () => ({
  events: []
});

export const mutations = {
  push(state, event) {
    state.events.push(event);
  }
};

export const actions = {
  push({ commit }, { type, data = {} }) {
    // Clone data to avoid mutation
    const clonedData = JSON.parse(JSON.stringify(data));

    // Create event and push it to the store
    const event = RalphEvent.createEvent(type, clonedData);
    commit('push', event);

    let logEvent = Object.assign({}, event);
    logEvent = JSON.parse(JSON.stringify(logEvent));

    // Log event to console
    this.app.$ralphLog(event.type, logEvent);
  }
};

export const getters = {};
