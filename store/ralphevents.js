class RalphEvent {
  constructor(type, data, state) {
    this.type = type;
    this.data = data;
    this.state = state;
    this.timestamp = new Date();
  }

  static createEvent(type, data, state) {
    return new RalphEvent(type, data, state);
  }
}

export const state = () => ({
  events: []
});

export const mutations = {
  pushEvent(state, event) {
    state.events.push(event);
  }
};

export const actions = {
  push({ commit, rootState }, { type, data = {} }) {
    // Select parts of state to push with event, to not bloat it
    const {
      auth,
      cart,
      channel,
      checkout,
      currentRouteName,
      customerType,
      favorites,
      vatIncluded
    } = rootState;

    const state = {
      auth,
      cart,
      channel,
      checkout,
      currentRouteName,
      customerType,
      favorites,
      vatIncluded
    };

    // Create event and push it to the store
    const event = RalphEvent.createEvent(type, data, state);
    commit('pushEvent', event);

    // Log event to console
    this.app.$ralphLog(event.type, event);
  }
};

export const getters = {};
