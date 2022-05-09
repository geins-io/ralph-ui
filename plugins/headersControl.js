export default ({ req, store }) => {
  const headers = req && req.headers ? Object.assign({}, req.headers) : {};
  store.commit('setChannelId', headers['X-channelId'] || 'MockId');
};
