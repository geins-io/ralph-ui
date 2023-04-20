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
  pushEvent({ commit, rootState }, { type, data = {} }) {
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

    const event = RalphEvent.createEvent(type, data, state);
    commit('pushEvent', event);
    this.app.$ralphLog(event.type, event);
  }
};

export const getters = {};
