export default ({ req, store }) => {
  const headers = req && req.headers ? Object.assign({}, req.headers) : {};
  console.log(req.headers, headers);
  store.commit('setChannelId', JSON.stringify({ headers }));
};
